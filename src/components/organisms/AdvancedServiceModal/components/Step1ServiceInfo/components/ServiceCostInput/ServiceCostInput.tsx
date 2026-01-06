import { Input } from '@/components/atoms/Input'
import { useTranslation } from 'react-i18next'
import { useStore } from '@tanstack/react-store'
import { uiStore, CURRENCY_CONFIGS } from '@/stores/local/ui'
import { memo } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import type { ExpenseSchema } from '@/lib/schemas/expense'

export const ServiceCostInput = memo(() => {
  const { t } = useTranslation()
  const { control } = useFormContext<ExpenseSchema>()
  const currency = useStore(uiStore, (state) => state.currency)
  const currencySymbol = CURRENCY_CONFIGS[currency].symbol

  return (
    <Controller
      name="cost"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Input
          label={t('modal.amount')}
          value={value === 0 ? '' : String(value)}
          onChange={(val: string | number | undefined) => onChange(Number(val) || 0)}
          currency
          suffix={currencySymbol}
          error={error?.message}
          placeholder="0"
          className="py-3 text-lg font-bold text-[#627bea]"
          icon={<span className="material-symbols-outlined text-gray-400">payments</span>}
          selectOnFocus
        />
      )}
    />
  )
})
