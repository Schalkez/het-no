import { Button } from '@/components/atoms/Button'
import { topicActions } from '@/stores/local/topic/topic.store'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'
import { SYNC_STATUS } from '@/lib/constants'

// Sub-components
import { ExpenseCard } from './TopicExpenses/components/ExpenseCard'
import { SkeletonCard } from './TopicExpenses/components/SkeletonCard'

// Types
import type { Expense, Member } from '@/types/collaboration'

interface TopicExpensesProps {
  expenses: Expense[]
  members: Member[]
  isFetching?: boolean
  onDeleteExpense?: (id: string) => void
}

export function TopicExpenses({ expenses, members, isFetching, onDeleteExpense }: TopicExpensesProps) {
  const { syncStatus, awarenessUsers, updateFocus } = useCollaboration()

  const getStatusColor = () => {
    if (syncStatus === SYNC_STATUS.CONNECTING) return 'bg-amber-400 animate-spin'
    if (syncStatus === SYNC_STATUS.CONNECTED)
      return 'bg-[#A3E635] animate-pulse shadow-[0_0_8px_#A3E635]'
    return 'bg-red-500'
  }

  const getStatusText = () => {
    if (isFetching) return 'SYNCING'
    if (syncStatus === SYNC_STATUS.CONNECTING) return 'CONNECTING'
    if (syncStatus === SYNC_STATUS.CONNECTED) return 'LIVE'
    return 'OFFLINE'
  }

  return (
    <section id="topic-expenses-section" className="relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button
            variant="neo"
            onClick={topicActions.openAddExpenseModal}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            Ghi khoản mới
          </Button>
        </div>
        <div
          id="realtime-status-indicator"
          className="hidden sm:flex items-center gap-2 text-sm font-black text-gray-500 bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-black/5"
        >
          <span className={`flex h-2 w-2 rounded-full ${getStatusColor()}`}></span>
          <span className="text-[10px] tracking-widest">{getStatusText()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isFetching && expenses.length === 0 ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                initialExpense={expense}
                members={members}
                awarenessUsers={awarenessUsers}
                updateFocus={updateFocus}
                {...(onDeleteExpense ? { onDelete: onDeleteExpense } : {})}
              />
            ))}
          </>
        )}

        {!isFetching && (
          <button
            onClick={topicActions.openAddExpenseModal}
            className="border-2 border-dashed border-gray-400 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-[#A3E635]/10 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all min-h-[210px] group w-full"
          >
            <div className="h-16 w-16 rounded-full bg-gray-100 border-2 border-gray-300 group-hover:border-black group-hover:bg-[#A3E635] flex items-center justify-center transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 group-hover:text-black"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span className="font-black text-gray-500 group-hover:text-black">Thêm khoản chi</span>
          </button>
        )}
      </div>
    </section>
  )
}
