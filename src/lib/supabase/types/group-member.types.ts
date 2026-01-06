export type MemberRole = 'owner' | 'member'

export interface GroupMember {
  id: string
  group_id: string
  user_id: string
  role: MemberRole
  display_name: string
  created_at: string
}

export interface GroupMemberInsert {
  id?: string
  group_id: string
  user_id: string
  role?: MemberRole
  display_name: string
  created_at?: string
}

export interface GroupMemberUpdate {
  id?: string
  group_id?: string
  user_id?: string
  role?: MemberRole
  display_name?: string
  created_at?: string
}
