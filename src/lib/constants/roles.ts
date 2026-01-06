export const ROLE_TYPES = {
  OWNER: 'owner',
  MEMBER: 'member',
} as const

export type RoleType = (typeof ROLE_TYPES)[keyof typeof ROLE_TYPES]
// Result: 'owner' | 'member'

/**
 * Type guard to check if a string is a valid RoleType
 */
export function isValidRole(role: string): role is RoleType {
  return Object.values(ROLE_TYPES).includes(role as RoleType)
}
