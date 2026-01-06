import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core'
import { groups } from './groups'
import { relations } from 'drizzle-orm'
import { services } from './services'

export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id')
    .references(() => groups.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  createdBy: uuid('created_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const topicsRelations = relations(topics, ({ one, many }) => ({
  group: one(groups, {
    fields: [topics.groupId],
    references: [groups.id],
  }),
  services: many(services),
}))
