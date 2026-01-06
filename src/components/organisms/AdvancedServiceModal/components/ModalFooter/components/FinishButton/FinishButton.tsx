import { Button } from '@/components/atoms/Button'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface FinishButtonProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export const FinishButton = memo(({ onClick, disabled, loading }: FinishButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button
      variant="neo"
      size="sm"
      type="button"
      onClick={onClick}
      disabled={!!disabled}
      loading={!!loading}
      icon={
        <span
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check
        </span>
      }
    >
      {t('common.finish')}
    </Button>
  )
})
