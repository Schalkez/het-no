export type CurrencyCode = 'VND' | 'USD' | 'EUR' | 'JPY' | 'KRW' | 'THB'

export interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  name: string
  groupSeparator: string
  decimalSeparator: string
  decimals: number
}

export interface UIState {
  isAddPersonModalOpen: boolean
  isResultExpanded: boolean
  focusedInputId: string | null
  isLoginModalOpen: boolean
  currency: CurrencyCode
}
