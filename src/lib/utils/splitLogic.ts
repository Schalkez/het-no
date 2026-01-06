import { SPLIT_MODES } from '@/lib/constants/splitModes'
import type { ExpenseSchema } from '@/lib/schemas/expense'

import { BaseBeneficiary } from '@/types/expense'

type Beneficiary = ExpenseSchema['beneficiaries'][number]

export type SplitResultItem = BaseBeneficiary & { id: string }

/**
 * Distributes an integer amount into 'count' parts as evenly as possible.
 * Returns an array of amounts.
 * Example: 100 split 3 -> [34, 33, 33]
 */
export function distributeInteger(total: number, count: number): number[] {
  if (count <= 0) return []
  const base = Math.floor(total / count)
  const remainder = total - base * count

  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0))
}

export function calculateTotalPaid(payers: { amount?: number | null }[]): number {
  return payers.reduce((sum, p) => sum + (p.amount || 0), 0)
}

/**
 * Auto-splits the total cost among payers evenly.
 * Preserves the personId structure.
 */
export function autoSplitPayers(
  totalCost: number,
  currentPayers: ExpenseSchema['payers']
): ExpenseSchema['payers'] {
  const count = currentPayers.length
  if (count === 0) return currentPayers

  const amounts = distributeInteger(totalCost, count)

  return currentPayers.map((p, idx) => ({
    ...p,
    amount: amounts[idx] ?? 0,
  }))
}

// --- Core Split Strategies ---

function calculateEqualSplit(totalCost: number, items: Beneficiary[]): SplitResultItem[] {
  const amounts = distributeInteger(totalCost, items.length)
  return items.map((b, idx) => ({
    id: b.personId,
    personId: b.personId,
    shouldPay: amounts[idx] ?? 0,
    used: true,
    quantity: 1,
    percentage: undefined,
  }))
}

function calculateQuantitySplit(totalCost: number, items: Beneficiary[]): SplitResultItem[] {
  const totalQty = items.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0)

  return items.map((b) => {
    const qty = Number(b.quantity) || 0
    // Prevent division by zero
    const share = totalQty > 0 ? (totalCost * qty) / totalQty : 0
    return {
      id: b.personId,
      personId: b.personId,
      quantity: b.quantity ?? 0, // Preserve original input (null -> 0 or null?) Schema allows null.
      shouldPay: share,
      used: true,
    }
  })
}

function calculatePercentageSplit(totalCost: number, items: Beneficiary[]): SplitResultItem[] {
  return items.map((b) => {
    const pct = Number(b.percentage) || 0
    const share = (totalCost * pct) / 100
    return {
      id: b.personId,
      personId: b.personId,
      percentage: b.percentage ?? 0,
      shouldPay: share,
      used: true,
    }
  })
}

/**
 * Main Calculator Function
 * Dispatches to specific strategy based on splitMode.
 */
export function calculateBeneficiaryItems(
  totalCost: number,
  beneficiaries: ExpenseSchema['beneficiaries'],
  splitMode: string
): SplitResultItem[] {
  const usedBeneficiaries = beneficiaries.filter((b) => b.used)

  if (usedBeneficiaries.length === 0) return []

  switch (splitMode) {
    case SPLIT_MODES.EQUAL:
      return calculateEqualSplit(totalCost, usedBeneficiaries)

    case SPLIT_MODES.QUANTITY:
      return calculateQuantitySplit(totalCost, usedBeneficiaries)

    case SPLIT_MODES.PERCENTAGE:
      return calculatePercentageSplit(totalCost, usedBeneficiaries)

    default:
      return []
  }
}
