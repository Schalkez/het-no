import { Button } from '@/components/atoms/Button'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface BackButtonProps {
  onClick: () => void
}

export const BackButton = memo(({ onClick }: BackButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      {t('common.back')}
    </Button>
  )
})
