import { memo } from 'react'
import type { Member } from '@/types/collaboration'

const FALLBACK_COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
  'bg-rose-400',
]

export const MemberAvatar = memo(
  ({ member, size = 'sm' }: { member: Member | undefined; size?: 'sm' | 'md' }) => {
    const dim = size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs'
    if (!member) return <div className={`${dim} rounded-full bg-gray-200 border border-black`} />

    const colorClass = FALLBACK_COLORS[member.name.length % FALLBACK_COLORS.length]

    return (
      <div
        className={`${dim} rounded-full border border-black flex-shrink-0 overflow-hidden flex items-center justify-center font-black text-white ${colorClass}`}
      >
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span>{member.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
    )
  }
)
