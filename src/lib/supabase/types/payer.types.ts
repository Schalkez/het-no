export interface Payer {
  id: string
  service_id: string
  person_id: string
  paid_amount: number
  created_at: string
}

export interface PayerInsert {
  id?: string
  service_id: string
  person_id: string
  paid_amount: number
  created_at?: string
}

export interface PayerUpdate {
  id?: string
  service_id?: string
  person_id?: string
  paid_amount?: number
  created_at?: string
}
