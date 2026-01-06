import { useStore } from '@tanstack/react-store'
import { uiStore, setCurrency } from '@/stores/local/ui'
import { Select } from '@/components/atoms/Select'
import type { CurrencyCode } from '@/stores/local/ui/ui.types'
import type { SelectOption } from '@/components/atoms/Select'

export function CurrencySelector() {
  const currency = useStore(uiStore, (state) => state.currency)

  const currencyOptions: SelectOption<CurrencyCode>[] = [
    { value: 'VND', label: '₫ VND' },
    { value: 'USD', label: '$ USD' },
    { value: 'EUR', label: '€ EUR' },
    { value: 'JPY', label: '¥ JPY' },
    { value: 'KRW', label: '₩ KRW' },
    { value: 'THB', label: '฿ THB' },
  ]

  return (
    <Select options={currencyOptions} value={currency} onChange={setCurrency} variant="minimal" />
  )
}
