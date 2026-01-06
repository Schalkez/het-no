import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { groups, groupMembers, topics, editHistory } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getAuthUser } from '@/server/auth'
import { ROLE_TYPES } from '@/lib/constants/roles'
import { createGroupSchema, joinGroupSchema, createTopicSchema } from '@/lib/schemas/group'

import { inArray, sql } from 'drizzle-orm'
import { services } from '@/db/schema'

const generateInviteCode = () => Math.random().toString(36).substring(2, 12).toUpperCase()

export const getGroups = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getAuthUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  // 1. Fetch groups where user is a member
  const members = await db.query.groupMembers.findMany({
    where: eq(groupMembers.userId, user.id),
    with: {
      group: {
        columns: {
          id: true,
          name: true,
          createdAt: true,
          inviteCode: true,
        },
      },
    },
  })

  if (members.length === 0) {
    return []
  }

  const groupIds = members.map((m) => m.group.id)

  // 2. Bulk fetch member counts
  const memberCounts = await db
    .select({
      groupId: groupMembers.groupId,
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(groupMembers)
    .where(inArray(groupMembers.groupId, groupIds))
    .groupBy(groupMembers.groupId)

  // 3. Bulk fetch total amounts
  const totalAmounts = await db
    .select({
      groupId: services.groupId,
      total: sql<number>`coalesce(sum(${services.totalCost}), 0)`.mapWith(Number),
    })
    .from(services)
    .where(inArray(services.groupId, groupIds))
    .groupBy(services.groupId)

  // 4. Merge data
  const countMap = new Map(memberCounts.map((c) => [c.groupId, c.count]))
  const amountMap = new Map(totalAmounts.map((a) => [a.groupId, a.total]))

  // 5. Merge & Auto-Fix Invite Code (Lazy Migration)
  const results = await Promise.all(
    members.map(
      async (m: {
        group: { id: string; name: string; createdAt: Date; inviteCode: string | null }
        role: string
      }) => {
        let inviteCode = m.group.inviteCode

        // Auto-generate invite code if missing and user is owner
        if (!inviteCode && m.role === 'owner') {
          inviteCode = generateInviteCode()
          try {
            await db.update(groups).set({ inviteCode }).where(eq(groups.id, m.group.id))
          } catch (e) {
            console.error('Failed to auto-update invite code', e)
          }
        }

        return {
          id: m.group.id,
          name: m.group.name,
          role: m.role,
          createdAt: m.group.createdAt,
          inviteCode: inviteCode,
          memberCount: countMap.get(m.group.id) || 1, // At least 1 member (self)
          totalAmount: amountMap.get(m.group.id) || 0,
        }
      }
    )
  )

  console.log('DEBUG_GET_GROUPS', JSON.stringify(results, null, 2))

  return results
})

export const getGroupDetails = createServerFn({ method: 'GET' })
  .inputValidator((data: { groupId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Verify membership
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) {
      throw new Error('Group not found or access denied')
    }

    // Fetch group details, members, and topics
    const group = await db.query.groups.findFirst({
      where: eq(groups.id, data.groupId),
      with: {
        members: true,
      },
    })

    if (!group) {
      throw new Error('Group not found')
    }

    const groupTopics = await db.query.topics.findMany({
      where: eq(topics.groupId, data.groupId),
      orderBy: [desc(topics.createdAt)],
      with: {
        services: {
          columns: {
            totalCost: true,
          },
        },
      },
    })

    const topicsWithStats = groupTopics.map((topic) => ({
      ...topic,
      expensesCount: topic.services.length,
      totalAmount: topic.services.reduce((sum, s) => sum + s.totalCost, 0),
    }))

    return {
      ...group,
      currentUserRole: member.role,
      topics: topicsWithStats,
    }
  })


async function createGroupInternal(name: string, userId: string, userName: string) {
  // Generate a simple random invite code
  const inviteCode = generateInviteCode()

  // Create group
  const [newGroup] = await db
    .insert(groups)
    .values({
      name: name.trim(),
      ownerId: userId,
      inviteCode: inviteCode,
    })
    .returning()

  if (!newGroup) {
    throw new Error('Failed to create group')
  }

  // Add creator as owner member
  await db.insert(groupMembers).values({
    groupId: newGroup.id,
    userId: userId,
    role: ROLE_TYPES.OWNER,
    displayName: userName,
  })

  // Audit Log
  await db.insert(editHistory).values({
    groupId: newGroup.id,
    userId: userId,
    action: 'group.create',
    entityType: 'group',
    entityId: newGroup.id,
    newValue: { name: newGroup.name },
  })

  return { id: newGroup.id, name: newGroup.name }
}

/**
 * Client-callable action for creating a group
 * Server function that can be called from React components
 */
export const createGroupAction = createServerFn({ method: 'POST' })
  .inputValidator((data) => createGroupSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await getAuthUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    return createGroupInternal(
      data.name,
      user.id,
      user.user_metadata?.full_name || user.email || 'Owner'
    )
  })

export const joinGroupAction = createServerFn({ method: 'POST' })
  .inputValidator((data) => joinGroupSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await getAuthUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Find group by invite code
    const group = await db.query.groups.findFirst({
      where: eq(groups.inviteCode, data.code),
    })

    if (!group) {
      throw new Error('Invalid invite code')
    }

    // Check if invite code has expired
    if (group.inviteCodeExpiresAt && new Date(group.inviteCodeExpiresAt) < new Date()) {
      throw new Error('Invite link has expired. Please ask the group owner for a new link.')
    }

    // Check if already a member
    const existingMember = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, group.id), eq(groupMembers.userId, user.id)),
    })

    if (existingMember) {
      return { message: 'Already a member', groupId: group.id }
    }

    // Add user to group
    const displayName = user.user_metadata?.full_name || user.email || 'Member'
    await db.insert(groupMembers).values({
      groupId: group.id,
      userId: user.id,
      role: ROLE_TYPES.MEMBER,
      displayName,
    })

    // Audit Log
    await db.insert(editHistory).values({
      groupId: group.id,
      userId: user.id,
      action: 'group.join',
      entityType: 'group',
      entityId: group.id,
      newValue: { name: group.name, displayName },
    })

    return { message: 'Joined successfully', groupId: group.id }
  })

export const getGroupInfoByInviteCode = createServerFn({ method: 'GET' })
  .inputValidator((data) => joinGroupSchema.parse(data))
  .handler(async ({ data }) => {
    // Public access allowed for join page info
    // const user = await getAuthUser()

    const group = await db.query.groups.findFirst({
      where: eq(groups.inviteCode, data.code),
      columns: {
        id: true,
        name: true,
        createdAt: true,
        ownerId: true,
      },
    })

    if (!group) {
      throw new Error('Invalid invite code')
    }

    // Get member count
    const memberCount = await db.query.groupMembers.findMany({
      where: eq(groupMembers.groupId, group.id),
    })

    return { ...group, memberCount: memberCount.length }
  })

export const createTopicAction = createServerFn({ method: 'POST' })
  .inputValidator((data) => createTopicSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // Verify membership
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) throw new Error('You are not a member of this group')

    // Create topic
    const [topic] = await db
      .insert(topics)
      .values({
        groupId: data.groupId,
        name: data.name.trim(),
        createdBy: user.id,
      })
      .returning()

    // Audit Log
    if (topic) {
      await db.insert(editHistory).values({
        groupId: data.groupId,
        userId: user.id,
        action: 'topic.create',
        entityType: 'topic',
        entityId: topic.id,
        newValue: { name: topic.name },
      })
    }

    return topic
  })
export const regenerateInviteCodeAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string; expiryDays?: number }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // Verify ownership
    const group = await db.query.groups.findFirst({
      where: eq(groups.id, data.groupId),
    })

    if (!group || group.ownerId !== user.id) {
      throw new Error('Only the owner can regenerate the invite code')
    }

    const newInviteCode = generateInviteCode()

    // Calculate expiry date if specified
    let expiresAt: Date | null = null
    if (data.expiryDays && data.expiryDays > 0) {
      expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + data.expiryDays)
    }

    await db
      .update(groups)
      .set({
        inviteCode: newInviteCode,
        inviteCodeExpiresAt: expiresAt,
      })
      .where(eq(groups.id, data.groupId))

    return { inviteCode: newInviteCode, expiresAt: expiresAt?.toISOString() || null }
  })

export const getMemberRole = createServerFn({ method: 'GET' })
  .inputValidator((data: { groupId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) {
      throw new Error('Not a member of this group')
    }

    return {
      userId: user.id,
      groupId: data.groupId,
      role: member.role,
    }
  })

export const kickMemberAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string; memberId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Check if current user is owner
    const currentMember = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!currentMember || currentMember.role !== ROLE_TYPES.OWNER) {
      throw new Error('Only the owner can kick members')
    }

    // 2. Get target member
    const targetMember = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, data.memberId)),
    })

    if (!targetMember) {
      throw new Error('Member not found')
    }

    // 3. Cannot kick yourself
    if (data.memberId === user.id) {
      throw new Error('You cannot kick yourself')
    }

    // 4. Delete member
    await db
      .delete(groupMembers)
      .where(
        and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, data.memberId))
      )

    // 5. Audit log
    await db.insert(editHistory).values({
      groupId: data.groupId,
      userId: user.id,
      action: 'member.kick',
      entityType: 'member',
      entityId: data.memberId,
      newValue: { displayName: targetMember.displayName, kickedAt: new Date().toISOString() },
    })

    return { success: true }
  })

export const deleteTopicAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string; topicId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Check if current user is owner
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member || member.role !== ROLE_TYPES.OWNER) {
      throw new Error('Only the owner can delete topics')
    }

    // 2. Get topic
    const topic = await db.query.topics.findFirst({
      where: eq(topics.id, data.topicId),
    })

    if (!topic) {
      throw new Error('Topic not found')
    }

    if (topic.groupId !== data.groupId) {
      throw new Error('Topic does not belong to this group')
    }

    // 3. Delete topic (services/payers/beneficiaries will be cascade deleted if FK set)
    await db.delete(topics).where(eq(topics.id, data.topicId))

    // 4. Audit log
    await db.insert(editHistory).values({
      groupId: data.groupId,
      userId: user.id,
      action: 'topic.delete',
      entityType: 'topic',
      entityId: data.topicId,
      newValue: { name: topic.name, deletedAt: new Date().toISOString() },
    })

    return { success: true }
  })

export const renameTopicAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string; topicId: string; name: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Get topic
    const topic = await db.query.topics.findFirst({
      where: eq(topics.id, data.topicId),
    })

    if (!topic) {
      throw new Error('Topic not found')
    }

    if (topic.groupId !== data.groupId) {
      throw new Error('Topic does not belong to this group')
    }

    // 2. Check permissions: Owner OR Creator
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) {
      throw new Error('You are not a member of this group')
    }

    const isOwner = member.role === ROLE_TYPES.OWNER
    const isCreator = topic.createdBy === user.id

    if (!isOwner && !isCreator) {
      throw new Error('Only the group owner or topic creator can rename this topic')
    }

    // 3. Validate name
    const trimmedName = data.name.trim()
    if (!trimmedName || trimmedName.length < 2) {
      throw new Error('Topic name must be at least 2 characters')
    }

    // 4. Update topic
    await db
      .update(topics)
      .set({ name: trimmedName })
      .where(eq(topics.id, data.topicId))

    // 5. Audit log
    await db.insert(editHistory).values({
      groupId: data.groupId,
      userId: user.id,
      action: 'topic.rename',
      entityType: 'topic',
      entityId: data.topicId,
      newValue: { oldName: topic.name, newName: trimmedName },
    })

    return { success: true }
  })

export const deleteGroupAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Check if current user is owner
    const group = await db.query.groups.findFirst({
      where: eq(groups.id, data.groupId),
    })

    if (!group) {
      throw new Error('Group not found')
    }

    if (group.ownerId !== user.id) {
      throw new Error('Only the owner can delete the group')
    }

    // 2. Delete all related data (cascade)
    // Delete all topics first (which will cascade delete services, payers, beneficiaries)
    await db.delete(topics).where(eq(topics.groupId, data.groupId))

    // Delete all members
    await db.delete(groupMembers).where(eq(groupMembers.groupId, data.groupId))

    // Delete edit history
    await db.delete(editHistory).where(eq(editHistory.groupId, data.groupId))

    // Delete the group itself
    await db.delete(groups).where(eq(groups.id, data.groupId))

    return { success: true }
  })

export const renameGroupAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { groupId: string; name: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Check if current user is owner
    const group = await db.query.groups.findFirst({
      where: eq(groups.id, data.groupId),
    })

    if (!group) {
      throw new Error('Group not found')
    }

    if (group.ownerId !== user.id) {
      throw new Error('Only the owner can rename the group')
    }

    // 2. Validate name
    const trimmedName = data.name.trim()
    if (!trimmedName || trimmedName.length < 2) {
      throw new Error('Group name must be at least 2 characters')
    }

    // 3. Update group name
    const [updatedGroup] = await db
      .update(groups)
      .set({ name: trimmedName })
      .where(eq(groups.id, data.groupId))
      .returning()

    // 4. Audit log
    await db.insert(editHistory).values({
      groupId: data.groupId,
      userId: user.id,
      action: 'group.rename',
      entityType: 'group',
      entityId: data.groupId,
      newValue: { oldName: group.name, newName: trimmedName },
    })

    return updatedGroup
  })
