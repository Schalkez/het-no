import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ROLE_TYPES } from '@/lib/constants'
import { MemberAvatar } from '@/components/atoms/MemberAvatar'
import { useKickMember } from '@/hooks/useGroups'
import { Member } from '../types'
import { useState, Suspense, lazy } from 'react'
import { Button } from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'

const InviteModal = lazy(() =>
  import('@/components/organisms/InviteModal/InviteModal').then((module) => ({
    default: module.InviteModal,
  }))
)

interface MemberListProps {
  members: Member[]
  inviteCode: string
  inviteCodeExpiresAt?: string | null | undefined
  groupId: string
  canRegenerate?: boolean
}

export function MemberList({
  members,
  inviteCode,
  inviteCodeExpiresAt,
  groupId,
  canRegenerate,
}: MemberListProps) {
  const { t } = useTranslation()
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean
    memberId: string
    memberName: string
  }>({
    isOpen: false,
    memberId: '',
    memberName: '',
  })
  const { mutate: kickMember, isPending: isKicking } = useKickMember(groupId)

  const handleKickClick = (memberId: string, memberName: string) => {
    setConfirmState({ isOpen: true, memberId, memberName })
  }

  const handleConfirmKick = () => {
    kickMember(
      { memberId: confirmState.memberId },
      {
        onSuccess: () => {
          toast.success(`Đã xóa ${confirmState.memberName} khỏi nhóm`)
          setConfirmState((prev) => ({ ...prev, isOpen: false }))
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Không thể xóa thành viên')
          setConfirmState((prev) => ({ ...prev, isOpen: false }))
        },
      }
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 border-b-2 border-black bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-lg">
            {t('group_detail.members.title')} ({members.length})
          </h3>
          <Button
            variant="neo"
            size="sm"
            onClick={() => setIsInviteModalOpen(true)}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            }
          >
            Mời thành viên
          </Button>
        </div>
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="bg-[#f0f0f0]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                {t('group_detail.members.table.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                {t('group_detail.members.table.role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                {t('group_detail.members.table.joined')}
              </th>
              {canRegenerate && (
                <th className="px-6 py-3 text-right text-xs font-black text-gray-500 uppercase tracking-wider">
                  
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <MemberAvatar 
                      member={{ id: member.id, name: member.displayName }} 
                      size="md"
                    />
                    <div className="text-sm font-bold text-gray-900 ml-3">{member.displayName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-lg border border-black ${
                      member.role === ROLE_TYPES.OWNER
                        ? 'bg-[#A3E635] text-black'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                  {new Date(member.joinedAt).toLocaleDateString()}
                </td>
                {canRegenerate && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {member.role !== ROLE_TYPES.OWNER && (
                      <button
                        onClick={() => handleKickClick(member.id, member.displayName)}
                        disabled={isKicking}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                        title="Xóa khỏi nhóm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <line x1="17" y1="11" x2="22" y2="11"></line>
                        </svg>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Suspense fallback={null}>
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          inviteCode={inviteCode}
          inviteCodeExpiresAt={inviteCodeExpiresAt}
          groupId={groupId}
          canRegenerate={!!canRegenerate}
        />
      </Suspense>
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmKick}
        title="Xóa thành viên"
        description={`Bạn có chắc muốn xóa thành viên ${confirmState.memberName} khỏi nhóm? Hành động này không thể hoàn tác.`}
        confirmText="Xóa thành viên"
        variant="danger"
      />
    </div>
  )
}
