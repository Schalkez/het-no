export interface Beneficiary {
  id: string
  service_id: string
  person_id: string
  used: boolean
  quantity: number | null
  percentage: number | null
  should_pay: number
  created_at: string
}

export interface BeneficiaryInsert {
  id?: string
  service_id: string
  person_id: string
  used?: boolean
  quantity?: number | null
  percentage?: number | null
  should_pay: number
  created_at?: string
}

export interface BeneficiaryUpdate {
  id?: string
  service_id?: string
  person_id?: string
  used?: boolean
  quantity?: number | null
  percentage?: number | null
  should_pay?: number
  created_at?: string
}
