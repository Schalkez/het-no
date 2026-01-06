export type SplitMode = 'equal' | 'quantity' | 'percentage'

export interface Service {
  id: string
  group_id: string
  name: string
  total_cost: number
  split_mode: SplitMode
  total_quantity: number | null
  created_by: string
  created_at: string
  updated_at: string
}

export interface ServiceInsert {
  id?: string
  group_id: string
  name: string
  total_cost: number
  split_mode?: SplitMode
  total_quantity?: number | null
  created_by: string
  created_at?: string
  updated_at?: string
}

export interface ServiceUpdate {
  id?: string
  group_id?: string
  name?: string
  total_cost?: number
  split_mode?: SplitMode
  total_quantity?: number | null
  created_by?: string
  created_at?: string
  updated_at?: string
}
