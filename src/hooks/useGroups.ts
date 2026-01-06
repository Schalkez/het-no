import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createGroupAction, getGroupDetails, getGroups, joinGroupAction, createTopicAction, regenerateInviteCodeAction, kickMemberAction, deleteTopicAction, deleteGroupAction, renameGroupAction, renameTopicAction } from '@/server/groups'
import { queryKeys } from '@/lib/query-keys'
import { useNavigate } from '@tanstack/react-router'

/**
 * Hook to fetch all groups for the current user
 */
export function useGroups() {
  return useQuery({
    queryKey: queryKeys.groups.lists(),
    queryFn: () => getGroups(),
  })
}

/**
 * Hook to fetch detailed information about a group
 */
export function useGroupDetails(groupId: string) {
  return useQuery({
    queryKey: queryKeys.groups.detail(groupId),
    queryFn: () => getGroupDetails({ data: { groupId } }),
    enabled: !!groupId,
  })
}

/**
 * Hook to create a new group
 * Pure mutation wrapper - returns invalidateGroups helper
 */
export function useCreateGroup() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      // Call server function directly - TanStack Start handles it
      return createGroupAction({ data })
    },
  })

  return {
    ...mutation,
    queryClient,
    invalidateGroups: () => queryClient.invalidateQueries({ queryKey: queryKeys.groups.lists() }),
  }
}
export function useJoinGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { code: string }) => joinGroupAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.lists() })
    },
  })
}

export function useCreateTopic(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { groupId: string; name: string }) => createTopicAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
    },
  })
}

export function useRegenerateInviteCode(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params?: { expiryDays: number }) =>
      regenerateInviteCodeAction({
        data: params ? { groupId, expiryDays: params.expiryDays } : { groupId },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
    },
  })
}

export function useKickMember(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { memberId: string }) =>
      kickMemberAction({ data: { groupId, memberId: data.memberId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
    },
  })
}

export function useDeleteTopic(groupId: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: { topicId: string }) =>
      deleteTopicAction({ data: { groupId, topicId: data.topicId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
      navigate({ to: '/groups/$groupId', params: { groupId } })
    },
  })
}

export function useRenameTopic(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { topicId: string; name: string }) =>
      renameTopicAction({ data: { groupId, topicId: data.topicId, name: data.name } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
      // Invalidate specific topic detail as well if it exists in cache
      queryClient.invalidateQueries({
        queryKey: queryKeys.topics.detail(variables.topicId),
      })
    },
  })
}

export function useDeleteGroup() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: { groupId: string }) => deleteGroupAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.lists() })
      navigate({ to: '/dashboard' })
    },
  })
}

export function useRenameGroup(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { name: string }) =>
      renameGroupAction({ data: { groupId, name: data.name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.lists() })
    },
  })
}
