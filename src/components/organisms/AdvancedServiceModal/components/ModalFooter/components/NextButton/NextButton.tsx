import { Button } from '@/components/atoms/Button'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface NextButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

export const NextButton = memo(({ onClick, disabled, loading }: NextButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button
      variant="neo"
      size="sm"
      onClick={onClick}
      disabled={!!disabled}
      loading={!!loading}
      icon={
        <span
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          arrow_forward
        </span>
      }
    >
      {t('common.next')}
    </Button>
  )
})
