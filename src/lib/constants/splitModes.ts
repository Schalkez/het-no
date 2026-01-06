export const SPLIT_MODES = {
  EQUAL: 'equal',
  QUANTITY: 'quantity',
  PERCENTAGE: 'percentage',
} as const

export type SplitMode = (typeof SPLIT_MODES)[keyof typeof SPLIT_MODES]
// Result: 'equal' | 'quantity' | 'percentage'

/**
 * Type guard to check if a string is a valid SplitMode
 */
export function isValidSplitMode(mode: string): mode is SplitMode {
  return Object.values(SPLIT_MODES).includes(mode as SplitMode)
}
