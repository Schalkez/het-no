import type { GuestService, GuestPerson } from '@/stores/local/guest'

export interface ServiceListProps {
  services: GuestService[]
  onAddService: () => void
  onEditService?: (id: string) => void
  onDeleteService?: (id: string) => void
  people: GuestPerson[]
}
