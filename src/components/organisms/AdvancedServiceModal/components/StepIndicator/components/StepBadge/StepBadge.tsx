import { memo } from 'react'

interface StepBadgeProps {
  stepNumber: number
  status: 'completed' | 'active' | 'upcoming'
}

export const StepBadge = memo(({ stepNumber, status }: StepBadgeProps) => {
  const statusStyles = {
    completed: 'bg-green-500 border-green-600',
    active: 'bg-primary border-black',
    upcoming: 'bg-gray-200 border-gray-300',
  }

  return (
    <div
      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${statusStyles[status]} ${
        status === 'completed' || status === 'active' ? 'text-white' : 'text-gray-500'
      } transition-all`}
    >
      {status === 'completed' ? (
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check
        </span>
      ) : (
        stepNumber
      )}
    </div>
  )
})
