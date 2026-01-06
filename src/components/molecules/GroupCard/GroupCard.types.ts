export interface GroupCardItem {
  id: string
  name: string
  memberCount: number
  totalAmount: number
  currency: string
  lastActive: string
  inviteCode?: string | null
  role: string
  actions?: GroupCardAction[]
}

export interface GroupCardAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

export interface GroupCardProps {
  group: GroupCardItem
  onClick: () => void
  variants?: any
  index?: number
  actions?: GroupCardAction[]
}
