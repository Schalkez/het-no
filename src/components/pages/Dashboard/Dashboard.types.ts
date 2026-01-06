import { GroupCardItem } from '@/components/molecules/GroupCard'

export interface DashboardProps {
  groups: GroupCardItem[]
  isLoading?: boolean
  onCreateGroup: () => void
  onSelectGroup: (groupId: string) => void
}
