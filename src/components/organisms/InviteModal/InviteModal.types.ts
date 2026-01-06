export interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  inviteCode?: string | null | undefined
  inviteCodeExpiresAt?: string | null | undefined
  groupId: string
  canRegenerate?: boolean
}
