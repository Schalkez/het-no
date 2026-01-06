import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PresenceIndicatorProps {
  elementId: string
  awarenessUsers: {
    id: string
    name: string
    color: string
    avatar?: string | null
    focusedId?: string | null
  }[]
}

export const PresenceIndicator = memo(function PresenceIndicator({
  elementId,
  awarenessUsers,
}: PresenceIndicatorProps) {
  // Tìm những user đang focus vào element này
  const usersHere = awarenessUsers.filter((u) => u.focusedId === elementId)

  if (usersHere.length === 0) return null

  return (
    <div className="flex -space-x-1.5 items-center">
      <AnimatePresence>
        {usersHere.map((user) => (
          <motion.div
            key={user.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-5 h-5 rounded-full border border-white ring-1 ring-black/10 flex items-center justify-center text-[8px] font-black text-white shadow-sm overflow-hidden"
            style={{ backgroundColor: user.color || 'var(--user-1)' }}
            title={user.name}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})
