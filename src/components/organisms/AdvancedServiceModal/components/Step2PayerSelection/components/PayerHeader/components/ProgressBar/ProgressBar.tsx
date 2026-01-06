import { motion } from 'framer-motion'
import { memo } from 'react'

interface ProgressBarProps {
  current: number
  total: number
  isComplete: boolean
}

export const ProgressBar = memo(({ current, total, isComplete }: ProgressBarProps) => {
  const percentage = Math.min((current / total) * 100, 100)

  return (
    <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full ${isComplete ? 'bg-emerald-500' : 'bg-primary'}`}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
})
