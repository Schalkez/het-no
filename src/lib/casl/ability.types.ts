import type { MongoAbility, MongoQuery } from '@casl/ability'
import type { RoleType } from '@/lib/constants'

// Subject types for CASL
export interface ExpenseSubject {
  __typename: 'Expense'
  id: string
  createdBy: string
}

export interface TopicSubject {
  __typename: 'Topic'
  id: string
  createdBy: string
}

export interface GroupSubject {
  __typename: 'Group'
  id: string
  ownerId: string
}

export interface MemberSubject {
  __typename: 'Member'
  id: string
  userId: string
}

// All possible actions
export type AbilityAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'manage' // Super admin action
  | 'regenerate' // Regenerate invite code
  | 'kick' // Kick member

// All possible subjects
export type AbilitySubject =
  | 'Expense'
  | 'Topic'
  | 'Group'
  | 'Member'
  | ExpenseSubject
  | TopicSubject
  | GroupSubject
  | MemberSubject

// The main Ability type
export type AppAbility = MongoAbility<[AbilityAction, AbilitySubject], MongoQuery>

// User context for ability creation
export interface UserContext {
  userId: string
  role: RoleType
  groupId: string
}
