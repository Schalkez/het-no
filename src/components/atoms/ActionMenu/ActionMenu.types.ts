import { ReactNode } from 'react'

export interface ActionMenuItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

export interface ActionMenuProps {
  items: ActionMenuItem[]
  trigger?: ReactNode
  align?: 'left' | 'right'
}
