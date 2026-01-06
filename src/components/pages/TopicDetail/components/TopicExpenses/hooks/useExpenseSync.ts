import { useState, useEffect, useMemo } from 'react'
import * as Y from 'yjs'
import { calculateBeneficiaryItems } from '@/lib/utils/splitLogic'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'
import type { Expense, LiveExpenseData } from '@/types/collaboration'

export function useExpenseSync(initialExpense: Expense) {
  const { sharedMap } = useCollaboration()
  const [liveData, setLiveData] = useState<LiveExpenseData | null>(null)

  useEffect(() => {
    const expenseSubMap = sharedMap.get(initialExpense.id) as Y.Map<unknown>
    if (!expenseSubMap || !(expenseSubMap instanceof Y.Map)) return

    const updateLocalState = () => {
      setLiveData(expenseSubMap.toJSON() as LiveExpenseData)
    }

    updateLocalState()
    expenseSubMap.observe(updateLocalState)
    return () => expenseSubMap.unobserve(updateLocalState)
  }, [sharedMap, initialExpense.id])

  const mergedExpense = useMemo(() => {
    if (!liveData) return initialExpense

    const items = calculateBeneficiaryItems(
      liveData.cost ?? initialExpense.totalCost,
      liveData.beneficiaries || [],
      liveData.splitMode || 'EQUAL'
    )

    return {
      ...initialExpense,
      name: liveData.name || initialExpense.name,
      totalCost: liveData.cost || initialExpense.totalCost,
      payers:
        liveData.payers?.map((p: { personId: string; amount: number }) => ({
          personId: p.personId,
          paidAmount: p.amount,
        })) || initialExpense.payers,
      beneficiaries: items.map((i) => ({
        personId: i.personId,
        shouldPay: i.shouldPay,
      })),
    }
  }, [initialExpense, liveData])

  return {
    expense: mergedExpense,
    isLive: !!liveData
  }
}
