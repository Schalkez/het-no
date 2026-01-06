import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface RemainingIndicatorProps {
  remaining: number
  mode: 'quantity' | 'percentage'
}

export const RemainingIndicator = memo(({ remaining, mode }: RemainingIndicatorProps) => {
  const { t } = useTranslation()

  if (remaining === 0) return null

  return (
    <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
      {remaining > 0 ? '+' : ''}
      {remaining} {mode === 'percentage' ? '%' : ''} {t('modal.remaining')}
    </div>
  )
})
