import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Dashboard } from '@/components/pages/Dashboard/Dashboard'
import { CreateGroupModal } from '@/components/organisms/CreateGroupModal/CreateGroupModal'
import { useGroups } from '@/hooks/useGroups'
import { isValidRole, ROLE_TYPES } from '@/lib/constants'
import { GroupCardItem } from '@/components/molecules/GroupCard'
import { Suspense, lazy } from 'react'

const InviteModal = lazy(() =>
  import('@/components/organisms/InviteModal/InviteModal').then((module) => ({
    default: module.InviteModal,
  }))
)

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})


// ...

// ... imports

function DashboardPage() {
  const navigate = useNavigate()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [inviteGroup, setInviteGroup] = useState<GroupCardItem | null>(null)
  const { data: groupsData = [], isLoading } = useGroups()

  // Transform data to match UI component
  const formattedGroups = groupsData.map((item) => ({
    id: item.id,
    name: item.name,
    memberCount: item.memberCount,
    totalAmount: item.totalAmount,
    currency: 'VND',
    lastActive: new Date(item.createdAt).toLocaleDateString('vi-VN'),
    role: isValidRole(item.role) ? item.role : ROLE_TYPES.MEMBER,
    inviteCode: item.inviteCode,
  }))

  const handleCreateGroup = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateSuccess = () => {
    // No need to manually invalidate - useCreateGroup hook handles it!
  }

  const handleSelectGroup = (groupId: string) => {
    navigate({ to: '/groups/$groupId', params: { groupId } })
  }

  const getGroupActions = (group: any) => [
    {
      label: 'Đổi tên nhóm',
      onClick: () => toast.info('Tính năng đổi tên đang phát triển'),
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
    {
      label: 'Mời thành viên',
      onClick: () => {
        if (group.inviteCode || group.role === 'owner') {
          setInviteGroup(group)
        } else {
          toast.error('Nhóm chưa có mã mời. Vui lòng liên hệ trưởng nhóm.')
        }
      },
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
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      ),
    },
    ...(group.role === 'owner'
      ? [
          {
            label: 'Xóa nhóm',
            onClick: () => toast.error('Tính năng xóa nhóm đang phát triển'),
            variant: 'danger' as const,
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
                <path d="M19 6v14c1 0 2-1 2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            ),
          },
        ]
      : [
          {
            label: 'Rời nhóm',
            onClick: () => toast.error('Tính năng rời nhóm đang phát triển'),
            variant: 'danger' as const,
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            ),
          },
        ]),
  ]

  return (
    <>
      <Dashboard
        groups={formattedGroups.map(g => ({ ...g, actions: getGroupActions(g) }))} // Pass actions via group object? Or modify Dashboard component?
        isLoading={isLoading}
        onCreateGroup={handleCreateGroup}
        onSelectGroup={handleSelectGroup}
      />
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      
      
      {inviteGroup && (
        <Suspense fallback={null}>
          <InviteModal
            isOpen={!!inviteGroup}
            onClose={() => setInviteGroup(null)}
            inviteCode={inviteGroup.inviteCode}
            groupId={inviteGroup.id}
            canRegenerate={inviteGroup.role === 'owner'}
          />
        </Suspense>
      )}
    </>
  )
}
