import type { GuestService } from '@/stores/local/guest'

export interface ServiceCardProps {
  service: GuestService
  onEdit?: ((id: string) => void) | undefined
  onDelete?: ((id: string) => void) | undefined
  people: { id: string; name: string; color: string }[]
}
