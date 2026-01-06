import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProgressBar } from './components/ProgressBar'

interface PayerHeaderProps {
  totalPaid: number
  totalCost: number
  currencySymbol: string
  isComplete: boolean
}

export const PayerHeader = memo(
  ({ totalPaid, totalCost, currencySymbol, isComplete }: PayerHeaderProps) => {
    const { t } = useTranslation()

    return (
      <header className="space-y-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('modal.who_paid')}</h2>
        <div className="flex items-center gap-3">
          <ProgressBar current={totalPaid} total={totalCost} isComplete={isComplete} />
          <span
            className={`text-xs font-medium whitespace-nowrap ${isComplete ? 'text-emerald-500' : 'text-gray-500'}`}
          >
            {currencySymbol}
            {totalPaid.toLocaleString()} / {currencySymbol}
            {totalCost.toLocaleString()}
            {isComplete && ' ✓'}
          </span>
        </div>
      </header>
    )
  }
)
