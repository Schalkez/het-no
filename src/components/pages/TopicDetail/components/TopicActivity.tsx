import type { ActivityLog } from '@/types/activity'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ACTIVITY_ACTIONS } from '@/lib/constants'

interface TopicActivityProps {
  activities: (ActivityLog & { userId: string })[]
  members: { id: string; name: string; avatar: string | null }[]
}

export function TopicActivity({ activities, members }: TopicActivityProps) {
  const getActionText = (activity: ActivityLog) => {
    switch (activity.action) {
      case ACTIVITY_ACTIONS.SERVICE_CREATE:
        return (
          <>
            đã thêm khoản chi{' '}
            <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.SERVICE_UPDATE:
        return (
          <>
            đã cập nhật khoản chi{' '}
            <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.SERVICE_DELETE:
        return (
          <>
            đã xóa khoản chi{' '}
            <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.TOPIC_CREATE:
        return (
          <>
            đã tạo chủ đề <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.TOPIC_DELETE:
        return (
          <>
            đã xóa chủ đề <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.MEMBER_KICK:
        return (
          <>
            đã xóa <span className="font-bold text-black">"{activity.details?.displayName}"</span>{' '}
            khỏi nhóm
          </>
        )
      case ACTIVITY_ACTIONS.GROUP_JOIN:
        return (
          <>
            đã tham gia nhóm{' '}
            <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.GROUP_CREATE:
        return (
          <>
            đã tạo nhóm <span className="font-bold text-black">"{activity.details?.name}"</span>
          </>
        )
      case ACTIVITY_ACTIONS.GROUP_RENAME:
        return (
          <>
            đã đổi tên nhóm từ{' '}
            <span className="font-bold text-black">"{activity.details?.oldName}"</span> thành{' '}
            <span className="font-bold text-black">"{activity.details?.newName}"</span>
          </>
        )
      default:
        return activity.action
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b-2 border-black bg-[#f0f0f0] flex justify-between items-center">
        <h2 className="text-xs font-black text-gray-700 uppercase tracking-wider">
          Lịch sử hoạt động
        </h2>
        <div className="text-[10px] font-bold text-gray-400">{activities.length} hoạt động</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {activities.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xs text-gray-400 font-bold">Chưa có hoạt động nào</p>
          </div>
        )}
        {activities.map((activity) => {
          const user = members.find((m) => m.id === activity.userId)
          return (
            <div
              key={activity.id}
              className="relative pl-6 border-l-2 border-dashed border-gray-200 last:border-0 pb-2"
            >
              <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-black border-2 border-white"></div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-[12px] truncate max-w-[120px]">
                    {user?.name || 'Thành viên'}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 shrink-0">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-tight">{getActionText(activity)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
