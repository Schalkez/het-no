import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface BeneficiaryHeaderProps {
  selectedCount: number
  totalCount: number
}

export const BeneficiaryHeader = memo(({ selectedCount, totalCount }: BeneficiaryHeaderProps) => {
  const { t } = useTranslation()

  return (
    <header>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t('modal.who_split')}</h2>
      <p className="text-sm text-gray-500">
        {t('modal.step3_desc')}
        <span className="text-xs text-gray-400 ml-1">
          ({selectedCount}/{totalCount})
        </span>
      </p>
    </header>
  )
})
