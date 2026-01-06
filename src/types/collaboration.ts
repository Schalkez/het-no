export interface Member {
  id: string
  name: string
  avatar?: string | null
}

export interface UserPresence {
  id: string
  name: string
  color: string
  avatar?: string | null
  focusedId?: string | null
  isTyping?: boolean
}

export interface LiveExpenseData {
  name?: string
  cost?: number
  splitMode?: string
  beneficiaries?: { personId: string; quantity?: number; percentage?: number; used?: boolean }[]
  payers?: { personId: string; amount: number }[]
  updatedAt?: string
  updaterId?: string
}

export interface Expense {
  id: string
  name: string
  totalCost: number
  createdAt: string | Date
  createdBy: string
  payers: { personId: string; paidAmount: number }[]
  beneficiaries: { personId: string; shouldPay: number }[]
}
