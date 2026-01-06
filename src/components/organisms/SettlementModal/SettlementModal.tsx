import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { SettlementPlan } from '@/components/organisms/SettlementPlan'
import { formatCurrency } from '@/lib/utils/currency'
import type { SplitResult } from '@/lib/utils/calculation'
import type { GuestPerson } from '@/stores/local/guest'

export interface SettlementModalProps {
  isOpen: boolean
  onClose: () => void
  result: SplitResult | null
  people: GuestPerson[]
}

export function SettlementModal({ isOpen, onClose, result, people }: SettlementModalProps) {
  const { t } = useTranslation()
  if (!result) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('settlement.detail_result')}
      description={t('settlement.detail_desc')}
      maxWidth="lg"
      fullscreenMobile
    >
      <div className="space-y-6">
        {/* Total Summary */}
        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('bottom_panel.total_spending')}</p>
            <p className="text-2xl font-black text-primary">
              {formatCurrency(result.totalExpense)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
          </div>
        </div>

        {/* Plan */}
        <SettlementPlan
          transactions={result.transactions}
          details={result.personDetails}
          totalExpense={result.totalExpense}
          people={people}
        />

        <div className="text-center text-xs text-gray-400">{t('settlement.tip_screenshot')}</div>
      </div>
    </Modal>
  )
}
