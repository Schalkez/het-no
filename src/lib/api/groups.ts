import { createGroupAction } from '@/server/groups'

/**
 * Client wrapper for createGroup server function
 * Handles proper parameter passing to TanStack Start server function
 */
export async function createGroup(name: string) {
  // Call server function directly - TanStack Start handles serialization
  return createGroupAction({ data: { name } })
}
