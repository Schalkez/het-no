import { uiStore } from '@/stores/local/ui'
import { CURRENCY_CONFIGS } from '@/stores/local/ui/ui.constants'

export function formatCurrency(amount: number): string {
  const currency = uiStore.state.currency
  const config = CURRENCY_CONFIGS[currency]

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount)

  // Replace separators based on currency config
  const withCorrectSeparators = formatted
    .replace(/,/g, 'TEMP')
    .replace(/\./g, config.decimalSeparator)
    .replace(/TEMP/g, config.groupSeparator)

  return `${withCorrectSeparators} ${currency}`
}

export function getCurrencyConfig() {
  const currency = uiStore.state.currency
  return CURRENCY_CONFIGS[currency]
}

/**
 * Returns currency parts for custom styling
 * E.g. 500.000 → { symbol: '₫', main: '500', rest: '.000' }
 */
export function formatCurrencyParts(amount: number): {
  symbol: string
  main: string
  rest: string
} {
  const currency = uiStore.state.currency
  const config = CURRENCY_CONFIGS[currency]

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount)

  // Replace separators based on currency config
  const withCorrectSeparators = formatted
    .replace(/,/g, 'TEMP')
    .replace(/\./g, config.decimalSeparator)
    .replace(/TEMP/g, config.groupSeparator)

  // Split at first separator
  const separator = config.groupSeparator
  const firstSepIndex = withCorrectSeparators.indexOf(separator)

  if (firstSepIndex === -1) {
    return {
      symbol: config.symbol,
      main: withCorrectSeparators,
      rest: '',
    }
  }

  return {
    symbol: config.symbol,
    main: withCorrectSeparators.substring(0, firstSepIndex),
    rest: withCorrectSeparators.substring(firstSepIndex),
  }
}
