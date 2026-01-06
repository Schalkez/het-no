import { memo, useState } from 'react'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { topicActions } from '@/stores/local/topic/topic.store'
import { MemberAvatar } from '@/components/atoms/MemberAvatar'
import { useExpenseSync } from '../hooks/useExpenseSync'
import type { Expense, Member, UserPresence } from '@/types/collaboration'
import { FOCUS_IDS } from '@/lib/constants'
import { useAbility } from '@/components/providers/AbilityProvider'
import type { ExpenseSubject } from '@/lib/casl'

interface ExpenseCardProps {
  initialExpense: Expense
  members: Member[]
  awarenessUsers: UserPresence[]
  updateFocus: (id: string | null, isTyping?: boolean) => void
  onDelete?: (id: string) => void
}

export const ExpenseCard = memo(({
  initialExpense,
  members,
  awarenessUsers,
  updateFocus,
  onDelete,
}: ExpenseCardProps) => {
  const { expense, isLive } = useExpenseSync(initialExpense)
  const ability = useAbility()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const expenseSubject: ExpenseSubject = {
    __typename: 'Expense',
    id: expense.id,
    createdBy: expense.createdBy,
  }

  const canDelete = ability.can('delete', expenseSubject)

  const getMember = (personId: string) => {
    return members.find((m) => m.id === personId)
  }

  const getPayerDisplay = () => {
    if (!expense.payers || expense.payers.length === 0) return 'Unknown'
    const firstPayer = expense.payers[0]
    if (!firstPayer) return 'Unknown'
    const member = getMember(firstPayer.personId)
    const name = member?.name || 'Unknown'
    if (expense.payers.length === 1) return name
    return `${name} +${expense.payers.length - 1}`
  }

  return (
    <article
      id={`${FOCUS_IDS.EXPENSE_CARD_PREFIX}${expense.id}`}
      onClick={() => topicActions.editExpense(expense.id)}
      onMouseEnter={() => updateFocus(`${FOCUS_IDS.MODAL_PREFIX}${expense.id}`)}
      onMouseLeave={() => updateFocus(null)}
      className="group relative bg-white rounded-xl p-5 border border-black/10 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Presence Floating Indicator */}
      <div className="absolute top-2 right-2 flex -space-x-1.5 z-10">
        {Array.from(
          new Map(
            awarenessUsers
              .filter((u) => u.focusedId === `${FOCUS_IDS.MODAL_PREFIX}${expense.id}`)
              .map((u) => [u.id, u])
          ).values()
        ).map((u: UserPresence) => (
          <div
            key={u.id}
            className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: u.color }}
            title={`${u.name} đang xem`}
          >
            {u.avatar ? (
              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[8px] font-black text-white">
                {u.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-lg leading-tight truncate">{expense.name}</h3>
            {isLive && (
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></span>
            )}
          </div>
          <p className="text-xs font-bold text-gray-400 mt-1">
            {new Date(expense.createdAt).toLocaleDateString([], {
              day: '2-digit',
              month: '2-digit',
            })}{' '}
            •{' '}
            {new Date(expense.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="text-right ml-4">
          <span className="text-lg font-black block">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              expense.totalCost
            )}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
            Chia cho
          </span>
          <div className="flex -space-x-2">
            {expense.beneficiaries.slice(0, 5).map((b) => (
              <div key={b.personId} title={getMember(b.personId)?.name}>
                <MemberAvatar member={getMember(b.personId)} size="sm" />
              </div>
            ))}
            {expense.beneficiaries.length > 5 && (
              <div className="h-6 w-6 rounded-full bg-black text-white text-[8px] flex items-center justify-center font-black border border-white z-10">
                +{expense.beneficiaries.length - 5}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          {expense.beneficiaries.slice(0, 3).map((b) => {
            const member = getMember(b.personId)
            const name = member?.name || 'Unknown'

            return (
              <div key={b.personId} className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-600 truncate mr-2">{name}</span>
                <span className="font-black tabular-nums">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    maximumSignificantDigits: 3,
                  }).format(b.shouldPay)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pt-3 border-t-2 border-dashed border-black/10 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-400">Người trả:</span>
          <div className="flex items-center gap-1.5">
            <MemberAvatar member={getMember(expense.payers[0]?.personId ?? '')} size="sm" />
            <span className="font-black">{getPayerDisplay()}</span>
          </div>
        </div>
        {canDelete && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteConfirm(true)
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
            title="Xóa khoản chi"
          >
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
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => onDelete && onDelete(expense.id)}
        title="Xóa khoản chi"
        description={`Bạn có chắc muốn xóa khoản chi "${expense.name}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa khoản chi"
        variant="danger"
      />
    </article>
  )
})
