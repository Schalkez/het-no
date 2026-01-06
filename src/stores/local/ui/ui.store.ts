import { Store } from '@tanstack/store'
import type { UIState, CurrencyCode } from './ui.types'

export const uiStore = new Store<UIState>({
  isAddPersonModalOpen: false,
  isResultExpanded: false,
  focusedInputId: null,
  isLoginModalOpen: false,
  currency: 'VND',
})

// --- Actions ---

export const setAddPersonModalOpen = (isOpen: boolean) => {
  uiStore.setState((state: UIState) => ({
    ...state,
    isAddPersonModalOpen: isOpen,
  }))
}

export const setFocusedInput = (inputId: string | null) => {
  uiStore.setState((state: UIState) => ({
    ...state,
    focusedInputId: inputId,
  }))
}

export const setLoginModalOpen = (isOpen: boolean) => {
  uiStore.setState((state: UIState) => ({
    ...state,
    isLoginModalOpen: isOpen,
  }))
}

export const setCurrency = (currency: CurrencyCode) => {
  uiStore.setState((state: UIState) => ({
    ...state,
    currency,
  }))
}
