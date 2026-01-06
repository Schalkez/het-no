import { memo } from 'react'
import { Button } from '@/components/atoms/Button'
import { className as cn } from '@/lib/utils/className'

interface BeneficiaryChipProps {
  name: string
  avatar?: string | null | undefined
  isSelected: boolean
  onClick: () => void
}

export const BeneficiaryChip = memo(
  ({ name, avatar, isSelected, onClick }: BeneficiaryChipProps) => {
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          '!flex !items-center !gap-2 !pl-1.5 !pr-3 !py-1.5 !rounded-full !transition-all !cursor-pointer !border-2 !h-auto !min-w-0 !font-medium',
          isSelected
            ? '!bg-indigo-50 dark:!bg-indigo-500/10 !border-indigo-500 !text-indigo-600 dark:!text-indigo-400'
            : '!bg-gray-100 dark:!bg-gray-800 !border-transparent !text-gray-500 hover:!border-gray-200 dark:hover:!border-gray-700'
        )}
      >
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors overflow-hidden',
            isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
          )}
        >
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <span className="text-sm">{name}</span>
        {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
      </Button>
    )
  }
)
