import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils/currency'
import type { SplitResult } from '@/lib/utils/calculation'

interface GuestCalculatorSummaryProps {
  splitResult: SplitResult
}

export function GuestCalculatorSummary({ splitResult }: GuestCalculatorSummaryProps) {
  const { t } = useTranslation()

  return useMemo(() => {
    const transactions = splitResult.transactions
    if (!transactions || transactions.length === 0) {
      return <span className="text-gray-500 font-normal">{t('summary.no_data')}</span>
    }
    const firstTrans = transactions[0]
    if (firstTrans) {
      return (
        <span className="text-gray-900 dark:text-white">
          {t('summary.transaction', { from: firstTrans.fromName, to: firstTrans.toName })}{' '}
          <span className="text-[#627bea] font-bold">{formatCurrency(firstTrans.amount)}</span>
          {transactions.length > 1 && (
            <span className="text-gray-400 text-sm ml-1">
              {t('summary.and_n_more', { count: transactions.length - 1 })}
            </span>
          )}
        </span>
      )
    }
    return <span className="text-green-500 font-medium">{t('summary.settled')}</span>
  }, [splitResult, t])
}
