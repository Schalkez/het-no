import type { GuestService, GuestPerson } from '@/stores/local/guest'

export interface AdvancedServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, updates: Partial<GuestService>) => void | Promise<void>
  service: GuestService | null
  people: GuestPerson[]
}
