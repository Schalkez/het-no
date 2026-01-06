import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['owner', 'member'])
export const splitModeEnum = pgEnum('split_mode', ['equal', 'quantity', 'percentage'])
