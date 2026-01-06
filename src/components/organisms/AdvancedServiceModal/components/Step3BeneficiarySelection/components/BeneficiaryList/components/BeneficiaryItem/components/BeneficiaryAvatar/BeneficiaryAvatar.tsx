import { memo } from 'react'
import type { GuestPerson } from '@/stores/local/guest'

interface BeneficiaryAvatarProps {
  person: GuestPerson
}

export const BeneficiaryAvatar = memo(({ person }: BeneficiaryAvatarProps) => {
  return (
    <div
      className={`w-6 h-6 rounded-full ${person.color} flex items-center justify-center text-xs font-bold border-2 border-black shadow-sm`}
    >
      {person.name.charAt(0).toUpperCase()}
    </div>
  )
})
