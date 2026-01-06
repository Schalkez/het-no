export interface EditHistory {
  id: string
  group_id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  old_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null
  created_at: string
}

export interface EditHistoryInsert {
  id?: string
  group_id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  old_value?: Record<string, unknown> | null
  new_value?: Record<string, unknown> | null
  created_at?: string
}

export interface EditHistoryUpdate {
  id?: string
  group_id?: string
  user_id?: string
  action?: string
  entity_type?: string
  entity_id?: string
  old_value?: Record<string, unknown> | null
  new_value?: Record<string, unknown> | null
  created_at?: string
}
