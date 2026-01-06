import { Button } from '@/components/atoms/Button'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface SelectAllButtonProps {
  allSelected: boolean
  onToggle: () => void
  disabled?: boolean
}

export const SelectAllButton = memo(({ allSelected, onToggle, disabled }: SelectAllButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button onClick={onToggle} variant="ghost" size="sm" disabled={!!disabled}>
      {allSelected ? t('modal.deselect_all') : t('modal.select_all')}
    </Button>
  )
})
