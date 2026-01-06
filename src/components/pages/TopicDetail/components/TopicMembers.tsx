import { Button } from '@/components/atoms/Button'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'

interface Member {
  id: string
  name: string
  avatar?: string | null
}

interface TopicMembersProps {
  members: Member[]
}

export function TopicMembers({ members }: TopicMembersProps) {
  const { awarenessUsers } = useCollaboration()

  return (
    <div className="flex flex-col h-full bg-white/20 backdrop-blur-xl">
      <div className="p-6 border-b border-black/5 bg-white/40">
        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
          Thành viên • {members.length}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
        {members.map((member) => {
          const isOnline = awarenessUsers.some((u) => u.id === member.id)
          const colorIdx = (member.id?.charCodeAt(0) || 0) % 6
          const userColor = `var(--user-${colorIdx + 1})`

          return (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/60 transition-all duration-200 group relative border border-transparent hover:border-black/5"
            >
              <div
                className="h-10 w-10 rounded-full border border-white shadow-sm flex items-center justify-center font-bold text-white text-sm overflow-hidden shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: userColor }}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  member.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm text-gray-900 truncate block">
                  {member.name}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {isOnline ? 'Active Now' : 'Away'}
                </span>
              </div>
              {isOnline && (
                <div className="h-2 w-2 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635] animate-pulse"></div>
              )}
            </div>
          )
        })}
      </div>

      <div className="p-6 border-t border-black/5 bg-white/40">
        <Button
          fullWidth
          variant="neo-secondary"
          size="sm"
          className="!border-black/5 !shadow-sm hover:!border-primary hover:!text-primary"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
        >
          Add Member
        </Button>
      </div>
    </div>
  )
}
