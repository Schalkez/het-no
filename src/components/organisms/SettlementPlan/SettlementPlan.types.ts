import type { Transaction, PersonFinancialDetail } from '@/lib/utils/calculation'
import type { GuestPerson } from '@/stores/local/guest'

export interface SettlementPlanProps {
  transactions: Transaction[]
  details: Record<string, PersonFinancialDetail>
  totalExpense: number
  people: GuestPerson[]
}
