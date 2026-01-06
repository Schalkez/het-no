import currency from 'currency.js'
import type { Currency } from 'currency.js'
import type { GuestService, GuestPerson } from '@/stores/local/guest'
import { calculateBeneficiaryItems } from './splitLogic'

export interface SplitResult {
  totalExpense: number
  personDetails: Record<string, PersonFinancialDetail>
  transactions: Transaction[]
}

export interface PersonFinancialDetail {
  id: string
  name: string
  paid: number
  share: number
  balance: number
}

export interface Transaction {
  from: string
  fromName: string
  to: string
  toName: string
  amount: number
}

/**
 * Configure currency for integer math (VND style)
 * Use precision: 0 to handle everything as integers
 */
const money = (value: number | string) => currency(value, { precision: 0, symbol: '' })

/**
 * Tính toán chia tiền cho nhóm
 * Sử dụng thư viện currency.js để đảm bảo tính chính xác
 */
export function calculateSplit(services: GuestService[], people: GuestPerson[]): SplitResult {
  // Intermediate storage using currency objects
  const detailsMap: Record<
    string,
    {
      id: string
      name: string
      paid: Currency // currency object
      share: Currency // currency object
    }
  > = {}

  let totalExpense = money(0)

  // 1. Init details
  people.forEach((p) => {
    detailsMap[p.id] = {
      id: p.id,
      name: p.name,
      paid: money(0),
      share: money(0),
    }
  })

  // 2. Iterate services
  services.forEach((service) => {
    const serviceCost = money(service.totalCost)
    totalExpense = totalExpense.add(serviceCost)

    // Handle Payers
    service.payers.forEach((payer) => {
      const detail = detailsMap[payer.personId]
      if (detail) {
        detail.paid = detail.paid.add(payer.paidAmount)
      }
    })

    // Handle Beneficiaries (All Split Modes)
    const splitItems = calculateBeneficiaryItems(
      service.totalCost,
      service.beneficiaries,
      service.splitMode
    )

    splitItems.forEach((item) => {
      const detail = detailsMap[item.personId]
      if (detail && item.shouldPay > 0) {
        detail.share = detail.share.add(money(item.shouldPay))
      }
    })
  })

  // 3. Convert back to plain numbers for result
  const personDetails: Record<string, PersonFinancialDetail> = {}
  Object.values(detailsMap).forEach((d) => {
    const paidVal = d.paid.value
    const shareVal = d.share.value
    personDetails[d.id] = {
      id: d.id,
      name: d.name,
      paid: paidVal,
      share: shareVal,
      balance: paidVal - shareVal,
    }
  })

  // 4. Generate Transactions
  const debtors: PersonFinancialDetail[] = []
  const creditors: PersonFinancialDetail[] = []

  const THRESHOLD = 100 // Ignore small debris (VND)

  Object.values(personDetails).forEach((p) => {
    if (p.balance < -THRESHOLD) debtors.push({ ...p })
    else if (p.balance > THRESHOLD) creditors.push({ ...p })
  })

  debtors.sort((a, b) => a.balance - b.balance)
  creditors.sort((a, b) => b.balance - a.balance)

  const transactions: Transaction[] = []

  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i]
    const creditor = creditors[j]
    if (!debtor || !creditor) break

    const debitAmount = Math.abs(debtor.balance)
    const creditAmount = creditor.balance

    const amount = Math.min(debitAmount, creditAmount)

    transactions.push({
      from: debtor.id,
      fromName: debtor.name,
      to: creditor.id,
      toName: creditor.name,
      amount: amount,
    })

    debtor.balance += amount
    creditor.balance -= amount

    if (Math.abs(debtor.balance) < THRESHOLD) i++
    if (Math.abs(creditor.balance) < THRESHOLD) j++
  }

  return {
    totalExpense: totalExpense.value,
    personDetails,
    transactions,
  }
}
