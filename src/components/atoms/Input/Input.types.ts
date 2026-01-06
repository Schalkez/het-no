import type { ChangeHandler } from 'react-hook-form'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string | undefined
  placeholder?: string | undefined
  value?: string
  onChange?: ChangeHandler | ((value: string | number) => void)
  error?: string | undefined
  icon?: React.ReactNode | undefined
  prefix?: string | undefined
  suffix?: string | undefined
  autoFocus?: boolean | undefined
  selectOnFocus?: boolean | undefined
  currency?: boolean
}
