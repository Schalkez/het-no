import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTopicDetails, createExpenseAction, updateExpenseAction, deleteExpenseAction } from '@/server/topics'
import { queryKeys } from '@/lib/query-keys'
import { topicActions } from '@/stores/local/topic/topic.store'
import type { z } from 'zod'
import type { createExpenseServerSchema, updateExpenseServerSchema } from '@/lib/schemas/expense'

export function useTopicDetails(groupId: string, topicId: string) {
  return useQuery({
    queryKey: queryKeys.topics.detail(topicId),
    queryFn: () => getTopicDetails({ data: { groupId, topicId } }),
    enabled: !!groupId && !!topicId,
  })
}

export function useCreateExpense(topicId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof createExpenseServerSchema>) => createExpenseAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.detail(topicId) })
      topicActions.closeAddExpenseModal()
    },
  })
}

export function useUpdateExpense(topicId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: z.infer<typeof updateExpenseServerSchema>) => updateExpenseAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.detail(topicId) })
      topicActions.closeEditModal()
    },
  })
}

export function useDeleteExpense(topicId: string, groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { expenseId: string }) =>
      deleteExpenseAction({ data: { expenseId: data.expenseId, groupId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.topics.detail(topicId) })
    },
  })
}
