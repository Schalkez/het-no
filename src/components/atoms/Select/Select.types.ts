export interface SelectOption<T = string> {
  value: T
  label: string
  icon?: React.ReactNode
}

export interface SelectProps<T = string> {
  options: SelectOption<T>[]
  value: T
  onChange: (value: T) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  variant?: 'default' | 'minimal'
}
