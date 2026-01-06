import type { GuestPerson } from '@/stores/local/guest'

export interface PeopleChipsProps {
  people: GuestPerson[]
  onRemovePerson: (id: string) => void
  onEditPerson: (person: GuestPerson) => void
  onAddPerson?: () => void
}
