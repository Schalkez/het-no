export interface BaseBeneficiary {
  personId: string
  shouldPay: number
  used: boolean
  quantity?: number | null | undefined
  percentage?: number | null | undefined
}

export interface BasePayer {
  personId: string
  amount: number
}
