import { memo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ServiceInfoHeader } from './components/ServiceInfoHeader'
import { ServiceNameInput } from './components/ServiceNameInput'
import { ServiceCostInput } from './components/ServiceCostInput'

export const Step1ServiceInfo = memo(() => {
  const { t } = useTranslation()

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="space-y-6"
    >
      <ServiceInfoHeader title={t('modal.service_info')} description={t('modal.step1_desc')} />

      <div className="space-y-6 pt-2">
        <ServiceNameInput autoFocus />
        <ServiceCostInput />
      </div>
    </motion.div>
  )
})
