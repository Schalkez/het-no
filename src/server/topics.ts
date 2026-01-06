import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { topics, services, payers, beneficiaries, editHistory } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getAuthUser } from './auth'
import { groupMembers } from '@/db/schema/groups'
import { createExpenseServerSchema, updateExpenseServerSchema } from '@/lib/schemas/expense'
import { getTopicDetailsSchema } from '@/lib/schemas/group'
import { ActivityLog } from '@/types/activity'

// Derive the transaction type from db.transaction
type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0]

export const getTopicDetails = createServerFn({ method: 'GET' })
  .inputValidator((data: z.infer<typeof getTopicDetailsSchema>) =>
    getTopicDetailsSchema.parse(data)
  )
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
      throw new Error('You are not a member of this group')
    }

    // Get Topic Info
    const topic = await db.query.topics.findFirst({
      where: eq(topics.id, data.topicId),
    })

    if (!topic) {
      throw new Error('Topic not found')
    }

    if (topic.groupId !== data.groupId) {
      throw new Error('Topic does not belong to this group')
    }

    // Get Expenses (Services)
    const expenses = await db.query.services.findMany({
      where: eq(services.topicId, data.topicId),
      with: {
        payers: true,
        beneficiaries: true,
      },
      orderBy: [desc(services.createdAt)],
    })

    // Also get group members for mapping (or client can fetch separately, but better here)
    const members = await db.query.groupMembers.findMany({
      where: eq(groupMembers.groupId, data.groupId),
      with: {
        user: true,
      },
    })

    // Get Activity Logs
    const activities = await db.query.editHistory.findMany({
      where: eq(editHistory.groupId, data.groupId),
      orderBy: [desc(editHistory.createdAt)],
      limit: 50,
    })

    return {
      topic,
      expenses,
      activities: activities as unknown as ActivityLog[],
      members: members.map(
        (m: { userId: string; displayName: string; user?: { avatarUrl: string | null } }) => ({
          id: m.userId,
          name: m.displayName,
          avatar: m.user?.avatarUrl || null,
        })
      ),
    }
  })

export const createExpenseAction = createServerFn({ method: 'POST' })
  .inputValidator((data: z.infer<typeof createExpenseServerSchema>) =>
    createExpenseServerSchema.parse(data)
  )
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // Transaction
    return await db.transaction(async (tx: Tx) => {
      // 1. Create Service
      const [newService] = await tx
        .insert(services)
        .values({
          groupId: data.groupId,
          topicId: data.topicId,
          name: data.name,
          totalCost: data.cost,
          splitMode: data.splitMode,
          totalQuantity: data.totalQuantity,
          createdBy: user.id,
        })
        .returning()

      if (!newService) throw new Error('Failed to create expense')

      // 2. Add Payers
      if (data.payers.length > 0) {
        await tx.insert(payers).values(
          data.payers.map((p: { personId: string; amount: number }) => ({
            serviceId: newService.id,
            personId: p.personId,
            paidAmount: p.amount,
          }))
        )
      }

      // 3. Add Beneficiaries
      if (data.beneficiaries.length > 0) {
        await tx.insert(beneficiaries).values(
          data.beneficiaries.map((b) => ({
            serviceId: newService.id,
            personId: b.personId,
            shouldPay: b.shouldPay,
            quantity: b.quantity,
            percentage: b.percentage,
            used: true,
          }))
        )
      }

      // 4. Audit Log
      await tx.insert(editHistory).values({
        groupId: data.groupId,
        userId: user.id,
        action: 'service.create',
        entityType: 'service',
        entityId: newService.id,
        newValue: newService,
      })

      return newService
    })
  })

export const updateExpenseAction = createServerFn({ method: 'POST' })
  .inputValidator((data: z.infer<typeof updateExpenseServerSchema>) =>
    updateExpenseServerSchema.parse(data)
  )
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Get the expense to check ownership
    const existingExpense = await db.query.services.findFirst({
      where: eq(services.id, data.expenseId),
    })

    if (!existingExpense) {
      throw new Error('Expense not found')
    }

    // 2. Check membership and get role
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) {
      throw new Error('Not a member of this group')
    }

    // 3. Permission check: Owner can update anything, Member can only update their own
    const isOwner = member.role === 'owner'
    const isCreator = existingExpense.createdBy === user.id

    if (!isOwner && !isCreator) {
      throw new Error('You do not have permission to update this expense')
    }

    return await db.transaction(async (tx: Tx) => {
      // 1. Update Service
      const [updatedService] = await tx
        .update(services)
        .set({
          name: data.name,
          totalCost: data.cost,
          splitMode: data.splitMode,
          totalQuantity: data.totalQuantity,
        })
        .where(eq(services.id, data.expenseId))
        .returning()

      if (!updatedService) throw new Error('Expense not found or update failed')

      // 2. Refresh Payers
      await tx.delete(payers).where(eq(payers.serviceId, data.expenseId))
      if (data.payers && data.payers.length > 0) {
        await tx.insert(payers).values(
          data.payers.map((p: { personId: string; amount: number }) => ({
            serviceId: data.expenseId,
            personId: p.personId,
            paidAmount: p.amount,
          }))
        )
      }

      // 3. Refresh Beneficiaries
      await tx.delete(beneficiaries).where(eq(beneficiaries.serviceId, data.expenseId))
      if (data.beneficiaries && data.beneficiaries.length > 0) {
        await tx.insert(beneficiaries).values(
          data.beneficiaries.map((b) => ({
            serviceId: data.expenseId,
            personId: b.personId,
            shouldPay: b.shouldPay,
            quantity: b.quantity,
            percentage: b.percentage,
            used: true,
          }))
        )
      }

      // 4. Audit Log
      await tx.insert(editHistory).values({
        groupId: updatedService.groupId,
        userId: user.id,
        action: 'service.update',
        entityType: 'service',
        entityId: updatedService.id,
        newValue: updatedService,
      })

      return updatedService
    })
  })

export const deleteExpenseAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { expenseId: string; groupId: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthUser()
    if (!user) throw new Error('Unauthorized')

    // 1. Get the expense to check ownership
    const expense = await db.query.services.findFirst({
      where: eq(services.id, data.expenseId),
    })

    if (!expense) {
      throw new Error('Expense not found')
    }

    // 2. Check membership and get role
    const member = await db.query.groupMembers.findFirst({
      where: and(eq(groupMembers.groupId, data.groupId), eq(groupMembers.userId, user.id)),
    })

    if (!member) {
      throw new Error('Not a member of this group')
    }

    // 3. Permission check: Owner can delete anything, Member can only delete their own
    const isOwner = member.role === 'owner'
    const isCreator = expense.createdBy === user.id

    if (!isOwner && !isCreator) {
      throw new Error('You do not have permission to delete this expense')
    }

    // 4. Delete with cascade
    return await db.transaction(async (tx: Tx) => {
      // Delete payers
      await tx.delete(payers).where(eq(payers.serviceId, data.expenseId))

      // Delete beneficiaries
      await tx.delete(beneficiaries).where(eq(beneficiaries.serviceId, data.expenseId))

      // Delete the expense
      await tx.delete(services).where(eq(services.id, data.expenseId))

      // Audit log
      await tx.insert(editHistory).values({
        groupId: data.groupId,
        userId: user.id,
        action: 'service.delete',
        entityType: 'service',
        entityId: data.expenseId,
        newValue: { name: expense.name, deletedAt: new Date().toISOString() },
      })

      return { success: true }
    })
  })
