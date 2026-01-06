/**
 * Query keys for TanStack Query
 * Using factory pattern for type safety and reusability
 */
export const queryKeys = {
  groups: {
    all: ['groups'] as const,
    lists: () => [...queryKeys.groups.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.groups.lists(), { filters }] as const,
    details: () => [...queryKeys.groups.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.groups.details(), id] as const,
    role: (id: string) => [...queryKeys.groups.all, 'role', id] as const,
  },
  topics: {
    all: ['topics'] as const,
    lists: () => [...queryKeys.topics.all, 'list'] as const,
    list: (groupId: string) => [...queryKeys.topics.lists(), groupId] as const,
    detail: (id: string) => [...queryKeys.topics.all, 'detail', id] as const,
  },
  services: {
    all: ['services'] as const,
    lists: () => [...queryKeys.services.all, 'list'] as const,
    list: (topicId: string) => [...queryKeys.services.lists(), topicId] as const,
  },
} as const
