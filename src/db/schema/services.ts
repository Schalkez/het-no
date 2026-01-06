import { pgTable, text, uuid, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { groups } from './groups'
import { splitModeEnum } from './enums'

import { relations } from 'drizzle-orm'
import { topics } from './topics'

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id')
    .references(() => groups.id)
    .notNull(),
  topicId: uuid('topic_id').references(() => topics.id),
  name: text('name').notNull(),
  totalCost: integer('total_cost').notNull(),
  splitMode: splitModeEnum('split_mode').default('equal').notNull(),
  totalQuantity: integer('total_quantity'),
  createdBy: uuid('created_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const servicesRelations = relations(services, ({ one, many }) => ({
  group: one(groups, {
    fields: [services.groupId],
    references: [groups.id],
  }),
  topic: one(topics, {
    fields: [services.topicId],
    references: [topics.id],
  }),
  beneficiaries: many(beneficiaries),
  payers: many(payers),
}))

export const beneficiaries = pgTable('beneficiaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceId: uuid('service_id')
    .references(() => services.id)
    .notNull(),
  personId: uuid('person_id').notNull(),
  used: boolean('used').default(true).notNull(),
  quantity: integer('quantity'),
  percentage: integer('percentage'),
  shouldPay: integer('should_pay').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const beneficiariesRelations = relations(beneficiaries, ({ one }) => ({
  service: one(services, {
    fields: [beneficiaries.serviceId],
    references: [services.id],
  }),
}))

export const payers = pgTable('payers', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceId: uuid('service_id')
    .references(() => services.id)
    .notNull(),
  personId: uuid('person_id').notNull(),
  paidAmount: integer('paid_amount').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const payersRelations = relations(payers, ({ one }) => ({
  service: one(services, {
    fields: [payers.serviceId],
    references: [services.id],
  }),
}))
