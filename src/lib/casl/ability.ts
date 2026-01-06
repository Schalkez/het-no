import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { ROLE_TYPES } from '@/lib/constants'
import type { AppAbility, AbilityAction, AbilitySubject, UserContext, ExpenseSubject, GroupSubject, TopicSubject } from './ability.types'

function isExpenseSubject(subject: AbilitySubject): subject is ExpenseSubject {
  return (
    typeof subject === 'object' &&
    subject !== null &&
    '__typename' in subject &&
    subject.__typename === 'Expense'
  )
}

function isGroupSubject(subject: AbilitySubject): subject is GroupSubject {
  return (
    typeof subject === 'object' &&
    subject !== null &&
    '__typename' in subject &&
    subject.__typename === 'Group'
  )
}

function isTopicSubject(subject: AbilitySubject): subject is TopicSubject {
  return (
    typeof subject === 'object' &&
    subject !== null &&
    '__typename' in subject &&
    subject.__typename === 'Topic'
  )
}

export function defineAbilityFor(user: UserContext): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  // All authenticated members can read
  can('read', 'Expense')
  can('read', 'Topic')
  can('read', 'Group')
  can('read', 'Member')

  // All members can create expenses and topics
  can('create', 'Expense')
  can('create', 'Topic')

  // Members can update their own expenses
  can('update', 'Expense', { createdBy: user.userId })

  // Members can delete their own expenses
  can('delete', 'Expense', { createdBy: user.userId })

  // Owner-specific permissions
  if (user.role === ROLE_TYPES.OWNER) {
    // Owner can manage all expenses
    can('update', 'Expense')
    can('delete', 'Expense')

    // Owner can manage topics
    can('update', 'Topic')
    can('delete', 'Topic')

    // Owner can manage group settings
    can('update', 'Group')
    can('delete', 'Group')
    can('regenerate', 'Group') // Regenerate invite code

    // Owner can manage members
    can('kick', 'Member')
    can('update', 'Member') // Change role
  }

  return build()
}

export function checkAbility(
  ability: AppAbility,
  action: AbilityAction,
  subject: AbilitySubject
): boolean {
  // Type guards to check specific subject types
  if (isExpenseSubject(subject)) {
    return ability.can(action, subject)
  }
  if (isGroupSubject(subject)) {
    return ability.can(action, subject)
  }
  if (isTopicSubject(subject)) {
    return ability.can(action, subject)
  }

  // For string subjects like 'Expense', 'Group', etc.
  if (typeof subject === 'string') {
    return ability.can(action, subject)
  }

  return false
}
