import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'
import { SPLIT_MODES } from '@/lib/constants/splitModes'
import { BeneficiaryHeader } from './components/BeneficiaryHeader'
import { BeneficiaryChip } from './components/BeneficiaryChip'
import { SplitModeSelector } from '../SplitModeSelector/SplitModeSelector'
import { useAdvancedServiceContext } from '../../hooks'

export const Step3BeneficiarySelection = memo(() => {
  const { watch, setValue, toggleBeneficiary, toggleAllBeneficiaries, people } =
    useAdvancedServiceContext()

  const splitMode = watch('splitMode')
  const rawBeneficiaries = watch('beneficiaries')
  const beneficiaries = rawBeneficiaries || []

  const selectedBeneficiariesCount = beneficiaries.filter((b) => b.used).length
  const totalQuantity = useMemo(() => {
    const items = rawBeneficiaries || []
    if (splitMode !== SPLIT_MODES.QUANTITY) return 0
    return items.reduce((sum, b) => sum + (b.used ? Number(b.quantity) || 0 : 0), 0)
  }, [rawBeneficiaries, splitMode])

  const { t } = useTranslation()
  const canSave = selectedBeneficiariesCount > 0

  const handleUpdateValue = (personId: string, value: string) => {
    const num = Number(value) || 0
    const next = beneficiaries.map((b) =>
      b.personId === personId
        ? { ...b, [splitMode === SPLIT_MODES.QUANTITY ? 'quantity' : 'percentage']: num }
        : b
    )
    setValue('beneficiaries', next, { shouldValidate: true })
  }

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-4"
    >
      <div className="relative z-30 pr-12">
        <SplitModeSelector
          currentMode={splitMode}
          onModeChange={(mode) => setValue('splitMode', mode, { shouldValidate: true })}
        />
      </div>

      {splitMode === SPLIT_MODES.QUANTITY && (
        <div className="flex items-center gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-100/50 dark:border-indigo-500/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500/80">
            {t('modal.total_quantity')}
          </span>
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-500/20 min-w-[3rem] text-center">
            {totalQuantity}
          </span>
        </div>
      )}

      <div className="space-y-3">
        <BeneficiaryHeader selectedCount={selectedBeneficiariesCount} totalCount={people.length} />

        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
          {people.map((person) => {
            const b = beneficiaries.find((x) => x.personId === person.id)
            const isSelected = !!b?.used
            const val = b ? (splitMode === SPLIT_MODES.QUANTITY ? b.quantity : b.percentage) : ''

            return (
              <div key={person.id} className="flex items-center gap-3 group">
                <div className="flex-1">
                  <BeneficiaryChip
                    name={person.name}
                    avatar={person.avatar}
                    isSelected={isSelected}
                    onClick={() => toggleBeneficiary(person.id)}
                  />
                </div>

                {isSelected && splitMode !== SPLIT_MODES.EQUAL && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex items-center shrink-0"
                  >
                    <div className="relative">
                      <input
                        type="number"
                        value={val || ''}
                        onChange={(e) => handleUpdateValue(person.id, e.target.value)}
                        onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                        placeholder={splitMode === SPLIT_MODES.QUANTITY ? '1' : '0'}
                        min="0"
                        className="w-16 h-8 pl-2 pr-5 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-0 focus:border-black outline-none transition-all text-center"
                      />
                      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 pointer-events-none">
                        {splitMode === SPLIT_MODES.PERCENTAGE ? '%' : 'x'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAllBeneficiaries}
          className="!text-[11px] !font-bold !text-indigo-600 dark:!text-indigo-400 !px-4 !py-1.5 !rounded-full !bg-indigo-50/50 dark:!bg-indigo-500/5 hover:!bg-indigo-100 dark:hover:!bg-indigo-500/10 !h-auto !min-w-0 transition-all border border-indigo-100/50 dark:border-indigo-500/10"
        >
          {selectedBeneficiariesCount === people.length
            ? `✕ ${t('modal.deselect_all')}`
            : `✓ ${t('modal.select_all')}`}
        </Button>

        {!canSave && (
          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-tight">
            ⚠️ {t('modal.min_one')}
          </p>
        )}
      </div>
    </motion.div>
  )
})
