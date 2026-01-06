import { memo } from 'react'

interface BeneficiaryCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const BeneficiaryCheckbox = memo(
  ({ checked, onChange, disabled }: BeneficiaryCheckboxProps) => {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      />
    )
  }
)
