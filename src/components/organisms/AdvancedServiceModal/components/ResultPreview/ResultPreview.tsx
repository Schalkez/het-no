import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils/currency'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdvancedServiceContext } from '../../hooks'
import { calculateBeneficiaryItems } from '@/lib/utils/splitLogic'

export const ResultPreview = memo(() => {
  const { watch, people } = useAdvancedServiceContext()
  const { t } = useTranslation()

  const splitMode = watch('splitMode')
  const cost = watch('cost')
  const rawBeneficiaries = watch('beneficiaries')

  const activeBeneficiaries = useMemo(() => {
    const beneficiaries = rawBeneficiaries || []
    return calculateBeneficiaryItems(cost, beneficiaries, splitMode)
  }, [rawBeneficiaries, splitMode, cost])

  const displayBeneficiaries = activeBeneficiaries.filter((b) => b.shouldPay > 0)

  const FALLBACK_COLORS = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ]
  const getColor = (name: string) => FALLBACK_COLORS[name.length % FALLBACK_COLORS.length]

  if (displayBeneficiaries.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-indigo-500 text-sm">payments</span>
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {t('modal.live_preview')}
        </h3>
      </div>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {displayBeneficiaries.map((b) => {
            const person = people.find((p) => p.id === b.personId)
            const colorClass = person?.color || getColor(person?.name || '?') || 'bg-gray-500'

            return (
              <motion.div
                key={b.personId}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-between items-center text-sm group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: colorClass.split(' ')[0]?.replace('bg-', '') }}
                  />
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {person?.name}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatCurrency(b.shouldPay)}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})
