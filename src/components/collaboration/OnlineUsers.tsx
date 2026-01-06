import { useCollaboration } from './CollaborationProvider'
import { motion, AnimatePresence } from 'framer-motion'

export function OnlineUsers() {
  const { awarenessUsers } = useCollaboration()

  return (
    <div className="flex -space-x-2">
      <AnimatePresence>
        {awarenessUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ scale: 0, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: -10 }}
            className="w-9 h-9 rounded-full border-2 border-white ring-1 ring-black/5 flex items-center justify-center text-xs font-black text-white shadow-md overflow-hidden"
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
      {awarenessUsers.length > 0 && (
        <div className="pl-3 flex items-center">
          <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter animate-pulse">
            Live
          </span>
        </div>
      )}
    </div>
  )
}
