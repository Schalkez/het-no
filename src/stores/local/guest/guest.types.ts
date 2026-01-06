import { type SplitMode } from '@/lib/constants'
import { BaseBeneficiary } from '@/types/expense'

export type { SplitMode }

export interface GuestPerson {
  id: string
  name: string
  color: string // Avatar color class (e.g., 'bg-blue-100 text-blue-700')
  avatar?: string | null
  isOptimistic?: boolean
}

export interface GuestBeneficiary extends BaseBeneficiary {
  id: string
  serviceId: string
}

export interface GuestPayer {
  id: string
  personId: string
  paidAmount: number
}

export interface GuestService {
  id: string
  name: string
  totalCost: number
  totalQuantity?: number | null | undefined // Total items/plates for the service (used in QUANTITY mode)
  splitMode: SplitMode
  beneficiaries: GuestBeneficiary[]
  payers: GuestPayer[]
}

export interface GuestState {
  services: GuestService[]
  people: GuestPerson[]
}
