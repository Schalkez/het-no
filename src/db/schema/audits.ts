import { pgTable, text, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core'
import { groups } from './groups'

export const editHistory = pgTable('edit_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id')
    .references(() => groups.id)
    .notNull(),
  userId: uuid('user_id').notNull(),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: uuid('entity_id').notNull(),
  oldValue: jsonb('old_value'),
  newValue: jsonb('new_value'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})
