import { Topic } from '../types'
import { Link } from '@tanstack/react-router'
import { ActionMenu } from '@/components/atoms/ActionMenu'

interface TopicCardProps {
  topic: Topic
  groupId?: string
  canDelete?: boolean
  onRename: (topic: Topic) => void
  onDelete: (topic: Topic) => void
  isPending?: boolean
}

export function TopicCard({
  topic,
  canDelete,
  onRename,
  onDelete,
  isPending,
}: TopicCardProps) {

  return (
    <Link
      to="/groups/$groupId/topics/$topicId"
      params={{ groupId: topic.groupId, topicId: topic.id }}
      className="no-underline block group relative"
    >
      <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Topic Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
              {topic.name}
            </h3>
            <span className="hidden sm:inline-flex text-black font-bold text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              →
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {new Date(topic.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              {topic.expensesCount || 0} khoản chi
            </span>
          </div>
        </div>

        {/* Right Side: Total & Menu */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 relative z-20">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng chi</div>
            <div className="text-lg font-black text-black">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(topic.totalAmount || 0)}
            </div>
          </div>

          <ActionMenu
            items={[
              {
                label: 'Đổi tên',
                onClick: () => onRename(topic),
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                ),
              },
              ...(canDelete
                ? [
                    {
                      label: 'Xóa',
                      onClick: () => onDelete(topic),
                      variant: 'danger' as const,
                      disabled: !!isPending,
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </div>
    </Link>
  )
}
