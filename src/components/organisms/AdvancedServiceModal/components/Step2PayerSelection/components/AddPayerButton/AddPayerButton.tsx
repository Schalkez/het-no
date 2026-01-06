import { Button } from '@/components/atoms/Button'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import type { GuestPerson } from '@/stores/local/guest'

interface AddPayerButtonProps {
  availablePeople: GuestPerson[]
  onAdd: (personId: string) => void
}

export const AddPayerButton = memo(({ availablePeople, onAdd }: AddPayerButtonProps) => {
  const { t } = useTranslation()

  if (availablePeople.length === 0) return null

  return (
    <div className="relative">
      <select
        onChange={(e) => {
          if (e.target.value) {
            onAdd(e.target.value)
            e.target.value = ''
          }
        }}
        className="absolute inset-0 opacity-0 cursor-pointer"
        defaultValue=""
      >
        <option value="" disabled>
          {t('modal.add_payer')}
        </option>
        {availablePeople.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </select>
      <Button variant="ghost" size="sm">
        + {t('modal.add_payer')}
      </Button>
    </div>
  )
})
