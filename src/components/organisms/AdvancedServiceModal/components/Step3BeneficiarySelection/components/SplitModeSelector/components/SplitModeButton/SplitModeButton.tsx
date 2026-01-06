import { memo } from 'react'
import type { SplitMode } from '@/stores/local/guest'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'
import { className as cn } from '@/lib/utils/className'

interface SplitModeButtonProps {
  mode: SplitMode
  isActive: boolean
  onClick: () => void
}

const MODE_ICONS: Record<SplitMode, string> = {
  equal: 'equal',
  quantity: 'counter_1',
  percentage: 'percent',
}

export const SplitModeButton = memo(({ mode, isActive, onClick }: SplitModeButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button
      variant={isActive ? 'primary' : 'secondary'}
      onClick={onClick}
      className={cn(
        '!flex-1 !flex !items-center !justify-center !gap-2 !px-4 !py-2.5 !rounded-lg !border-2 !font-semibold !text-sm !h-auto !min-w-0 !transition-all',
        isActive
          ? '!bg-indigo-600 !text-white !border-indigo-600 !shadow-sm'
          : '!bg-white dark:!bg-gray-800 !text-gray-700 dark:!text-gray-300 !border-gray-200 dark:!border-gray-700 hover:!border-indigo-500 hover:!text-indigo-600'
      )}
    >
      <span
        className="material-symbols-outlined text-[18px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {MODE_ICONS[mode]}
      </span>
      {t(`modal.split_mode.${mode}`)}
    </Button>
  )
})
