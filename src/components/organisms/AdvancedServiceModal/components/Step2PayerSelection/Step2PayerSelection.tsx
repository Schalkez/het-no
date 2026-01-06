import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { PayerHeader } from './components/PayerHeader'
import { PayerList } from './components/PayerList'
import { useAdvancedServiceContext } from '../../hooks'
import { useStore } from '@tanstack/react-store'
import { uiStore, CURRENCY_CONFIGS } from '@/stores/local/ui'

export const Step2PayerSelection = memo(() => {
  const { watch, togglePayer, people, setValue } = useAdvancedServiceContext()

  const cost = watch('cost')
  const payers = watch('payers')

  const currency = useStore(uiStore, (state) => state.currency)
  const currencySymbol = CURRENCY_CONFIGS[currency].symbol

  const totalPaid = useMemo(() => payers.reduce((sum, p) => sum + (p.amount || 0), 0), [payers])
  const totalCost = cost
  const isComplete = Math.abs(totalPaid - totalCost) < 0.01

  const handleUpdateAmount = (personId: string, amount: string | number) => {
    const num = Number(amount) || 0
    const newPayers = payers.map((p) => (p.personId === personId ? { ...p, amount: num } : p))
    setValue('payers', newPayers, { shouldValidate: true })
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-6"
    >
      <PayerHeader
        totalPaid={totalPaid}
        totalCost={totalCost}
        currencySymbol={currencySymbol}
        isComplete={isComplete}
      />

      <PayerList
        payers={payers.map((p) => ({ ...p, amount: String(p.amount) }))}
        people={people}
        currencySymbol={currencySymbol}
        onUpdateAmount={handleUpdateAmount}
        onRemovePayer={togglePayer}
        onAddPayer={togglePayer}
      />
    </motion.div>
  )
})
