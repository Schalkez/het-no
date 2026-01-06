import { Input } from '@/components/atoms/Input'
import { memo } from 'react'

interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export const QuantityInput = memo(({ value, onChange, max }: QuantityInputProps) => {
  const handleChange = (val: string | number) => {
    const num = Number(val) || 0
    if (max && num > max) return
    onChange(num)
  }

  return (
    <div className="flex items-center gap-1">
      <Input
        value={String(value)}
        onChange={handleChange}
        type="number"
        className="text-center text-sm font-bold w-16 px-2 py-1"
        min={0}
        max={max}
      />
    </div>
  )
})
