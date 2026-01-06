import { useTopicDetails, useCreateExpense, useUpdateExpense, useDeleteExpense } from '@/hooks/useTopic'
import type { GuestService } from '@/stores/local/guest'
import { TopicHeader } from './components/TopicHeader'
import { TopicMembers } from './components/TopicMembers'
import { TopicExpenses } from './components/TopicExpenses'
import { TopicActivity } from './components/TopicActivity'
import { useEffect, useMemo } from 'react'
import { useStore } from '@tanstack/react-store'
import { topicStore, topicActions } from '@/stores/local/topic/topic.store'
import { AdvancedServiceModal } from '@/components/organisms/AdvancedServiceModal/AdvancedServiceModal'
import { CollaborationProvider } from '@/components/collaboration/CollaborationProvider'
import { OnlineUsers } from '@/components/collaboration/OnlineUsers'
import { useAuthUser } from '@/hooks/useAuth'
import { useGroupRole } from '@/hooks/useGroupRole'
import { AbilityProvider } from '@/components/providers/AbilityProvider'
import { ROLE_TYPES } from '@/lib/constants'
import type { RoleType } from '@/lib/constants'

interface TopicDetailProps {
  groupId: string
  topicId: string
}

export function TopicDetail({ groupId, topicId }: TopicDetailProps) {
  const { data, isLoading, isFetching, error } = useTopicDetails(groupId, topicId)
  const { mutate: createExpense } = useCreateExpense(topicId)
  const { mutate: updateExpense } = useUpdateExpense(topicId)
  const { mutate: deleteExpense } = useDeleteExpense(topicId, groupId)
  const isAddModalOpen = useStore(topicStore, (state) => state.isAddExpenseModalOpen)
  const editingExpenseId = useStore(topicStore, (state) => state.editingExpenseId)

  const { data: authUser } = useAuthUser()
  const { data: roleData } = useGroupRole(groupId)

  const userRole: RoleType = roleData?.role ?? ROLE_TYPES.MEMBER

  const currentUser = useMemo(() => {
    const currentMember = data?.members?.find((m: { id: string }) => m.id === authUser?.id)
    const userColorIndex = (authUser?.id?.charCodeAt(0) || 0) % 6
    return {
      id: authUser?.id || 'guest',
      name: currentMember?.name || authUser?.email?.split('@')[0] || 'Member',
      color: `var(--user-${userColorIndex + 1})`,
      avatar: currentMember?.avatar || null,
    }
  }, [authUser?.id, authUser?.email, data?.members])

  useEffect(() => {
    topicActions.setContext(groupId, topicId)
  }, [groupId, topicId])

  const handleSaveExpense = async (id: string, updates: Partial<GuestService>) => {
    if (!updates.name || updates.totalCost === undefined || !updates.splitMode) return

    const payload = {
      groupId,
      topicId,
      name: updates.name,
      cost: updates.totalCost,
      splitMode: updates.splitMode,
      totalQuantity: updates.totalQuantity,
      payers: (updates.payers || []).map((p) => ({
        personId: p.personId,
        amount: p.paidAmount,
      })),
      beneficiaries: (updates.beneficiaries || []).map((b) => ({
        personId: b.personId,
        shouldPay: b.shouldPay,
        quantity: b.quantity,
        percentage: b.percentage,
      })),
    }

    if (id) {
      updateExpense({
        expenseId: id,
        ...payload,
      })
    } else {
      createExpense(payload)
    }
  }

  // Dynamic SEO Title
  useEffect(() => {
    if (data?.topic?.name) {
      document.title = `${data.topic.name} | Chia Tiền Real-time`
    }
  }, [data?.topic?.name])

  if (isLoading || !authUser) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-primary font-black animate-pulse uppercase tracking-widest text-sm">
            {isLoading ? 'Loading Topic...' : 'Checking Auth...'}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center text-red-500 font-bold bg-cream">
        Error: {error.message}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center text-gray-500 bg-cream">
        Topic not found
      </div>
    )
  }

  return (
    <AbilityProvider user={{ userId: authUser.id, role: userRole, groupId }}>
      <CollaborationProvider topicId={topicId} user={currentUser}>
        <div className="fixed inset-0 z-[100] flex flex-col bg-cream selection:bg-primary selection:text-white">
        <TopicHeader topic={data.topic} groupId={groupId}>
          <OnlineUsers />
        </TopicHeader>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Subtle Background Elements */}
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Left Sidebar - Members */}
          <aside className="w-[260px] hidden md:flex flex-col border-r border-black/5 bg-white/40 backdrop-blur-xl z-20">
            <TopicMembers members={data.members} />
          </aside>

          {/* Main Content - Expenses */}
          <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 relative">
            <div className="max-w-6xl mx-auto relative z-10">
              <TopicExpenses
                expenses={data.expenses}
                members={data.members}
                isFetching={isFetching}
                onDeleteExpense={(id) => deleteExpense({ expenseId: id })}
              />
            </div>
          </main>

          {/* Right Sidebar - Activities */}
          <aside className="w-[300px] hidden lg:flex flex-col border-l border-black/5 bg-white/40 backdrop-blur-xl z-20">
            <TopicActivity activities={data.activities} members={data.members} />
          </aside>
        </div>

        {/* Global Modals */}
        {(isAddModalOpen || editingExpenseId) && (
          <AdvancedServiceModal
            key={editingExpenseId || 'new'}
            isOpen={true}
            onClose={
              editingExpenseId ? topicActions.closeEditModal : topicActions.closeAddExpenseModal
            }
            onSave={handleSaveExpense}
            service={
              editingExpenseId
                ? (data.expenses.find(
                    (e: { id: string }) => e.id === editingExpenseId
                  ) as unknown as GuestService)
                : null
            }
            people={data.members.map((m: { id: string; name: string; avatar: string | null }) => {
              const colorIdx = (m.id?.charCodeAt(0) || 0) % 6
              return {
                id: m.id,
                name: m.name,
                avatar: m.avatar,
                color: `var(--user-${colorIdx + 1})`,
              }
            })}
          />
        )}
        </div>
      </CollaborationProvider>
    </AbilityProvider>
  )
}
