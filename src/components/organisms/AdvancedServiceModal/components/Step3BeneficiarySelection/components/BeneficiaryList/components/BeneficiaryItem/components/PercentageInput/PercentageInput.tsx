import { Input } from '@/components/atoms/Input'
import { memo } from 'react'

interface PercentageInputProps {
  value: number
  onChange: (value: number) => void
}

export const PercentageInput = memo(({ value, onChange }: PercentageInputProps) => {
  const handleChange = (val: string | number) => {
    const num = Number(val) || 0
    if (num > 100) return
    onChange(num)
  }

  return (
    <Input
      value={String(value)}
      onChange={handleChange}
      type="number"
      suffix="%"
      className="text-center text-sm font-bold w-20 px-2 py-1"
      min={0}
      max={100}
    />
  )
})
