import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils/currency'
import type { SettlementPlanProps } from './SettlementPlan.types'

export function SettlementPlan({
  transactions,
  details,
  totalExpense,
  people,
}: SettlementPlanProps) {
  const { t } = useTranslation()
  if (totalExpense === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-black">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-green-500">payments</span>
        {t('settlement.title')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cột 1: Chi tiết từng người */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {t('settlement.details_per_person')}
          </h4>
          <div className="space-y-3">
            {Object.values(details).map((person) => {
              const personData = people.find((p) => p.id === person.id)
              return (
                <div key={person.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full ${personData?.color || 'bg-gray-200'} flex items-center justify-center text-xs font-bold border-2 border-black`}
                    >
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {person.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {t('settlement.expense')}: {formatCurrency(person.share)}
                    </div>
                    <div
                      className={`font-bold ${
                        person.balance > 0
                          ? 'text-green-500'
                          : person.balance < 0
                            ? 'text-red-500'
                            : 'text-gray-400'
                      }`}
                    >
                      {person.balance > 0
                        ? `+${formatCurrency(person.balance)}`
                        : person.balance < 0
                          ? `${formatCurrency(person.balance)}`
                          : formatCurrency(0)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cột 2: Các bước chuyển khoản */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {t('settlement.transactions')} ({transactions.length})
          </h4>
          {transactions.length === 0 ? (
            <div className="text-sm text-gray-500 italic">{t('settlement.no_debt')}</div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="bg-yellow-50 dark:bg-gray-700 p-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-red-500">{tx.fromName}</span>
                    <span className="material-symbols-outlined text-gray-300 text-sm">
                      arrow_forward
                    </span>
                    <span className="font-bold text-green-500">{tx.toName}</span>
                  </div>
                  <div className="font-bold text-primary">{formatCurrency(tx.amount)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
