export interface Group {
  id: string
  name: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface GroupInsert {
  id?: string
  name: string
  owner_id: string
  created_at?: string
  updated_at?: string
}

export interface GroupUpdate {
  id?: string
  name?: string
  owner_id?: string
  created_at?: string
  updated_at?: string
}
