import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { roleEnum } from './enums'

export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  ownerId: uuid('owner_id').notNull(),
  inviteCode: text('invite_code').notNull().unique(),
  inviteCodeExpiresAt: timestamp('invite_code_expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const groupsRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers),
}))

export const groupMembers = pgTable('group_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id')
    .references(() => groups.id)
    .notNull(),
  userId: uuid('user_id').notNull(),
  role: roleEnum('role').default('member').notNull(),
  displayName: text('display_name').notNull(),
  createdAt: timestamp('joined_at', { withTimezone: true }).defaultNow().notNull(),
})

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}))
