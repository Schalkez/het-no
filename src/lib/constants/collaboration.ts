export const SYNC_STATUS = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
} as const

export type SyncStatus = (typeof SYNC_STATUS)[keyof typeof SYNC_STATUS]

export const FOCUS_IDS = {
  MODAL_PREFIX: 'modal-',
  EXPENSE_CARD_PREFIX: 'expense-card-',
} as const
