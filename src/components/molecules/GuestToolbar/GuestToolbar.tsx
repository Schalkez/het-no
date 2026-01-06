import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { slideFromRightVariants } from '@/components/pages/GuestCalculator/GuestCalculator.animations'
import { CurrencySelector } from '@/components/molecules/CurrencySelector'

interface GuestToolbarProps {
  onAddPerson: () => void
  onAddService: () => void
  onResetAll: () => void
}

export const GuestToolbar = memo(({ onAddPerson, onAddService, onResetAll }: GuestToolbarProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={slideFromRightVariants}
      className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1a1d2d]"
    >
      {/* Left: Main Actions Group */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          onClick={onAddPerson}
          variant="neo-secondary"
          className="flex-1 sm:flex-none !py-2 h-[42px] px-4"
          icon={
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person_add
            </span>
          }
          iconPosition="left"
        >
          <span className="text-[13px] font-black">{t('actions.add_person')}</span>
        </Button>
        <Button
          onClick={onAddService}
          variant="neo"
          className="flex-1 sm:flex-none !py-2 h-[42px] px-4"
          icon={
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              post_add
            </span>
          }
          iconPosition="left"
        >
          <span className="text-[13px] font-black">{t('actions.add_service')}</span>
        </Button>
      </div>

      {/* Right: Utilities Group */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="px-1 text-[10px] font-black text-gray-400 uppercase tracking-wider hidden xs:block">
            {t('settings.currency', 'Tiền tệ')}
          </div>
          <CurrencySelector />
        </div>

        <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-800 mx-1 hidden lg:block" />

        <Button
          onClick={onResetAll}
          variant="ghost"
          size="sm"
          className="!text-gray-400 hover:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 transition-all !p-2 h-10 w-10 sm:w-auto sm:px-3"
          icon={
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              restart_alt
            </span>
          }
          iconPosition="left"
        >
          <span className="text-[13px] font-bold hidden sm:inline">{t('actions.reset_all')}</span>
        </Button>
      </div>
    </motion.div>
  )
})
