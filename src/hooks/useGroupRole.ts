import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { getMemberRole } from '@/server/groups'

/**
 * Hook to get the current user's role in a specific group
 */
export function useGroupRole(groupId: string) {
  return useQuery({
    queryKey: queryKeys.groups.role(groupId),
    queryFn: () => getMemberRole({ data: { groupId } }),
    enabled: !!groupId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
