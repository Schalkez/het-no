import { memo } from 'react'
import { StepBadge } from '../StepBadge/StepBadge'

interface MobileStepIndicatorProps {
  steps: Array<{ id: number; title: string; description: string }>
  onStepClick: (stepId: number) => void
  getStepStatus: (stepId: number) => 'completed' | 'active' | 'pending'
}

export const MobileStepIndicator = memo(
  ({ steps, onStepClick, getStepStatus }: MobileStepIndicatorProps) => {
    return (
      <div className="md:hidden flex items-center justify-center gap-2 mb-6">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.id)
          return (
            <div key={step.id} className="flex items-center">
              <button type="button" onClick={() => onStepClick(step.id)} className="cursor-pointer">
                <StepBadge
                  stepNumber={step.id}
                  status={status === 'pending' ? 'upcoming' : status}
                />
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`w-6 h-0.5 mx-1 ${
                    status === 'completed' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
