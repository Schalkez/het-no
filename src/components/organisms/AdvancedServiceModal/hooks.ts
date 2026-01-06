import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import type { ExpenseSchema } from '@/lib/schemas/expense'
import { usePeople } from './contexts'

export function useAdvancedServiceContext() {
  const methods = useFormContext<ExpenseSchema>()
  const people = usePeople()
  if (!methods) {
    throw new Error('useAdvancedServiceContext must be used within an AdvancedServiceProvider')
  }

  const { watch, setValue } = methods
  const cost = watch('cost')
  const payers = watch('payers')
  const beneficiaries = watch('beneficiaries')

  const togglePayer = useCallback(
    (personId: string) => {
      const existingIndex = payers.findIndex((p) => p.personId === personId)
      const totalCost = cost || 0

      const isEvenSplit = () => {
        if (payers.length === 0 || totalCost === 0) return true
        const expectedAmount = totalCost / payers.length
        const tolerance = Math.max(1, totalCost * 0.00001)
        return payers.every((p) => Math.abs(p.amount - expectedAmount) < tolerance)
      }

      const hasManualEdits = !isEvenSplit()

      if (existingIndex >= 0) {
        // Remove payer
        const newPayers = payers.filter((_, i) => i !== existingIndex)

        if (hasManualEdits && newPayers.length === 1 && totalCost > 0 && newPayers[0]) {
          newPayers[0].amount = totalCost
        } else if (!hasManualEdits && newPayers.length > 0) {
          const amountPerPerson = Math.floor(totalCost / newPayers.length)
          const remainder = totalCost - amountPerPerson * newPayers.length
          newPayers.forEach((p, idx) => {
            p.amount = amountPerPerson + (idx === 0 ? remainder : 0)
          })
        }
        setValue('payers', newPayers, { shouldValidate: true })
      } else {
        // Add payer
        const newPayers = [...payers, { personId, amount: 0 }]
        if (!hasManualEdits) {
          const amountPerPerson = Math.floor(totalCost / newPayers.length)
          const remainder = totalCost - amountPerPerson * newPayers.length
          newPayers.forEach((p, idx) => {
            p.amount = amountPerPerson + (idx === 0 ? remainder : 0)
          })
        }
        setValue('payers', newPayers, { shouldValidate: true })
      }
    },
    [payers, cost, setValue]
  )

  const toggleBeneficiary = useCallback(
    (personId: string) => {
      const next = (beneficiaries || []).map((b) =>
        b.personId === personId ? { ...b, used: !b.used } : b
      )
      setValue('beneficiaries', next, { shouldValidate: true })
    },
    [beneficiaries, setValue]
  )

  const toggleAllBeneficiaries = useCallback(() => {
    const allUsed = (beneficiaries || []).every((b) => b.used)
    const next = (beneficiaries || []).map((b) => ({ ...b, used: !allUsed }))
    setValue('beneficiaries', next, { shouldValidate: true })
  }, [beneficiaries, setValue])

  return { ...methods, people, togglePayer, toggleBeneficiary, toggleAllBeneficiaries }
}
