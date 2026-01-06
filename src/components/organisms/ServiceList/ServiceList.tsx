import { ServiceCard } from '@/components/molecules/ServiceCard'
import type { ServiceListProps } from './ServiceList.types'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { listItemVariants } from '@/components/pages/GuestCalculator/GuestCalculator.animations'

export function ServiceList({
  services,
  onAddService,
  onEditService,
  onDeleteService,
  people,
}: ServiceListProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
        {t('calculator.expense_list')}
      </label>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {services.length === 0 && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onAddService}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black hover:bg-yellow-50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-gray-400">add</span>
              </div>
              <p className="text-sm font-medium text-gray-500">
                {t('calculator.add_first_expense')}
              </p>
            </motion.div>
          )}

          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              variants={listItemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ServiceCard
                service={service}
                people={people}
                onEdit={onEditService}
                onDelete={onDeleteService}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
