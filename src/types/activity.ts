export type ActivityAction =
  | 'service.create'
  | 'service.update'
  | 'service.delete'
  | 'person.create'
  | 'person.delete'
  | 'person.update'
  | 'group.create'
  | 'group.migrate'
  | 'group.join'
  | 'group.rename'
  | 'topic.create'
  | 'topic.delete'
  | 'topic.rename'
  | 'member.kick'

export interface ActivityLog {
  id: string
  userId: string // User ID
  action: ActivityAction
  entityType: 'service' | 'person' | 'group' | 'topic' | 'member'
  entityId: string
  details?:
    | {
        oldValue?: object
        newValue?: object
        name?: string | undefined // Display name of the entity for quick reference
        displayName?: string | undefined // For member kick
        oldName?: string | undefined // For group rename
        newName?: string | undefined // For group rename
      }
    | undefined
  createdAt: string // ISO string
}
