export const ACTIVITY_ACTIONS = {
  SERVICE_CREATE: 'service.create',
  SERVICE_UPDATE: 'service.update',
  SERVICE_DELETE: 'service.delete',
  TOPIC_CREATE: 'topic.create',
  TOPIC_DELETE: 'topic.delete',
  TOPIC_RENAME: 'topic.rename',
  MEMBER_KICK: 'member.kick',
  GROUP_JOIN: 'group.join',
  GROUP_CREATE: 'group.create',
  GROUP_RENAME: 'group.rename',
} as const

export type ActivityAction = (typeof ACTIVITY_ACTIONS)[keyof typeof ACTIVITY_ACTIONS]
