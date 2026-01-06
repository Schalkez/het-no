import { memo } from 'react'
import type { GuestPerson } from '@/stores/local/guest'

interface PayerAvatarProps {
  person: GuestPerson
  size?: 'sm' | 'md'
}

export const PayerAvatar = memo(({ person, size = 'md' }: PayerAvatarProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-xs',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full ${person.color} flex items-center justify-center font-bold border-2 border-black shadow-sm overflow-hidden`}
    >
      {person.avatar ? (
        <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
      ) : (
        person.name.charAt(0).toUpperCase()
      )}
    </div>
  )
})
