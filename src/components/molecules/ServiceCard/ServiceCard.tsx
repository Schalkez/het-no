import { useTranslation } from 'react-i18next'
import type { ServiceCardProps } from './ServiceCard.types'
import { formatCurrencyParts } from '@/lib/utils/currency'
import { Button } from '@/components/atoms/Button'
import { PresenceIndicator } from '@/components/collaboration/PresenceIndicator'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'

export function ServiceCard({ service, onEdit, onDelete, people }: ServiceCardProps) {
  const { t } = useTranslation()
  const { awarenessUsers, updateFocus } = useCollaboration()
  const costParts = formatCurrencyParts(service.totalCost)

  return (
    <div
      key={service.id}
      onMouseEnter={() => updateFocus(service.id)}
      onMouseLeave={() => updateFocus(null)}
      className="group relative bg-[#F8FAFC] dark:bg-gray-800 rounded-2xl border-2 border-transparent hover:border-black p-3 sm:p-4 shadow-sm transition-all cursor-default"
    >
      <div className="absolute -top-2 -right-2 z-10">
        <PresenceIndicator elementId={service.id} awarenessUsers={awarenessUsers} />
      </div>
      {/* Header: Title & Amount */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{service.name}</h3>
          </div>
        </div>
        <div className="text-right text-[#627bea]">
          <span className="text-sm font-medium">{costParts.symbol}</span>
          <span className="text-lg sm:text-xl font-black">{costParts.main}</span>
          <span className="text-sm font-medium opacity-60">{costParts.rest}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100 dark:bg-gray-700 my-3"></div>

      {/* Split Details */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        {/* Who paid */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {t('service_card.payer_label')}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {service.payers.length > 0 ? (
              service.payers.map((payer, idx) => {
                const person = people.find((p) => p.id === payer.personId)
                if (!person) return null
                const parts = formatCurrencyParts(payer.paidAmount)
                return (
                  <div
                    key={payer.id || idx}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span
                      className={`w-6 h-6 rounded-full ${person.color} flex items-center justify-center text-[10px] font-bold border-2 border-black`}
                    >
                      {person.name.charAt(0)}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {person.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {parts.symbol}
                      {parts.main}
                      <span className="opacity-60">{parts.rest}</span>
                    </span>
                  </div>
                )
              })
            ) : (
              <span className="text-sm text-gray-400 italic">{t('service_card.unselected')}</span>
            )}
          </div>
        </div>

        {/* Who splits */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:text-right">
            {t('service_card.beneficiary_label')}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
            {(() => {
              const beneficiaries = service.beneficiaries.filter((b) => b.used)
              if (beneficiaries.length === 0) {
                return (
                  <span className="text-sm text-gray-400 italic">{t('service_card.none')}</span>
                )
              }
              if (beneficiaries.length === people.length) {
                return (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    {t('service_card.all')} ({people.length})
                  </span>
                )
              }
              return beneficiaries.map((b) => {
                const person = people.find((p) => p.id === b.personId)
                if (!person) return null
                return (
                  <span
                    key={b.personId}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span
                      className={`w-5 h-5 rounded-full ${person.color} flex items-center justify-center text-[9px] font-bold border-2 border-black`}
                    >
                      {person.name.charAt(0)}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{person.name}</span>
                  </span>
                )
              })
            })()}
          </div>
        </div>
      </div>

      {/* Edit/Delete Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
        <Button
          variant="ghost"
          onClick={() => onEdit?.(service.id)}
          className="!p-2 !w-9 !h-9 !min-w-0 !rounded-md bg-white dark:bg-gray-800 shadow-md hover:shadow-lg !text-gray-700 dark:!text-gray-200 hover:!text-indigo-600"
          aria-label={t('common.edit')}
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => onDelete?.(service.id)}
          className="!p-2 !w-9 !h-9 !min-w-0 !rounded-md bg-white dark:bg-gray-800 shadow-md hover:shadow-lg !text-gray-700 dark:!text-gray-200 hover:!text-red-500"
          aria-label={t('common.delete')}
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </Button>
      </div>
    </div>
  )
}
