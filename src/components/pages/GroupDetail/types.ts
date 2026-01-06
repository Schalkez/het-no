export interface Topic {
  id: string
  name: string
  groupId: string
  createdAt: string
  expensesCount?: number
  totalAmount?: number
}

export interface Member {
  id: string
  displayName: string
  role: string
  joinedAt: string
}

export interface GroupDetailType {
  id: string
  name: string
  createdAt: string
  currentUserRole: string
  inviteCode: string
  inviteCodeExpiresAt?: string | null
  topics: Topic[]
  members: Member[]
}
