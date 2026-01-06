import { memo } from 'react'
import type { GuestPerson } from '@/stores/local/guest'
import { PayerAvatar } from './components/PayerAvatar'
import { PayerAmountInput } from './components/PayerAmountInput'
import { Button } from '@/components/atoms/Button'

interface PayerItemProps {
  person: GuestPerson
  amount: string
  currencySymbol: string
  onAmountChange: (value: string | number) => void
  onRemove: () => void
  autoFocus?: boolean
}

export const PayerItem = memo(
  ({ person, amount, currencySymbol, onAmountChange, onRemove, autoFocus }: PayerItemProps) => {
    return (
      <div className="group flex items-center gap-2 p-1 pr-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
        <div className="flex items-center gap-2 pl-1">
          <PayerAvatar person={person} />
          <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
            {person.name}
          </span>
        </div>

        <div className="flex-1" />

        <div className="w-36">
          <PayerAmountInput
            value={amount}
            onChange={onAmountChange}
            currencySymbol={currencySymbol}
            autoFocus={!!autoFocus}
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="!w-6 !h-6 !min-w-0 !p-0 !rounded !text-gray-400 hover:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </Button>
      </div>
    )
  }
)
