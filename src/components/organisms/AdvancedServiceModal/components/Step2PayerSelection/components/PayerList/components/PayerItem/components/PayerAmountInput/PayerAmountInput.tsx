import { Input } from '@/components/atoms/Input'
import { memo } from 'react'

interface PayerAmountInputProps {
  value: string
  onChange: (value: string | number) => void
  currencySymbol: string
  autoFocus?: boolean
}

export const PayerAmountInput = memo(
  ({ value, onChange, currencySymbol, autoFocus }: PayerAmountInputProps) => {
    return (
      <Input
        value={value}
        onChange={onChange}
        currency
        suffix={currencySymbol}
        className="text-right text-sm font-bold border-transparent bg-transparent ring-0 focus:ring-0 focus:border-b focus:border-primary rounded-none px-0 py-0.5 h-auto !pr-8"
        placeholder="0"
        autoFocus={!!autoFocus}
        selectOnFocus
      />
    )
  }
)
