import type { CurrencyCode, CurrencyConfig } from './ui.types'

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  VND: {
    code: 'VND',
    symbol: '₫',
    name: 'Vietnamese Dong',
    groupSeparator: '.',
    decimalSeparator: ',',
    decimals: 0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    groupSeparator: ',',
    decimalSeparator: '.',
    decimals: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    groupSeparator: '.',
    decimalSeparator: ',',
    decimals: 2,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    groupSeparator: ',',
    decimalSeparator: '.',
    decimals: 0,
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
    name: 'Korean Won',
    groupSeparator: ',',
    decimalSeparator: '.',
    decimals: 0,
  },
  THB: {
    code: 'THB',
    symbol: '฿',
    name: 'Thai Baht',
    groupSeparator: ',',
    decimalSeparator: '.',
    decimals: 2,
  },
}
