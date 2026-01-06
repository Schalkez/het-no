import { memo } from 'react'
import type { GuestPerson, SplitMode } from '@/stores/local/guest'
import { BeneficiaryCheckbox } from './components/BeneficiaryCheckbox'
import { BeneficiaryAvatar } from './components/BeneficiaryAvatar'
import { QuantityInput } from './components/QuantityInput'
import { PercentageInput } from './components/PercentageInput'

interface BeneficiaryItemProps {
  person: GuestPerson
  isSelected: boolean
  splitMode: SplitMode
  quantity?: number | undefined
  percentage?: number | undefined
  onToggle: (checked: boolean) => void
  onQuantityChange?: (value: number) => void
  onPercentageChange?: (value: number) => void
}

export const BeneficiaryItem = memo(
  ({
    person,
    isSelected,
    splitMode,
    quantity,
    percentage,
    onToggle,
    onQuantityChange,
    onPercentageChange,
  }: BeneficiaryItemProps) => {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/30 transition-all">
        <BeneficiaryCheckbox checked={isSelected} onChange={onToggle} />
        <BeneficiaryAvatar person={person} />
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{person.name}</span>

        <div className="flex-1" />

        {isSelected && splitMode === 'quantity' && onQuantityChange && (
          <QuantityInput value={quantity || 1} onChange={onQuantityChange} />
        )}

        {isSelected && splitMode === 'percentage' && onPercentageChange && (
          <PercentageInput value={percentage || 0} onChange={onPercentageChange} />
        )}
      </div>
    )
  }
)
