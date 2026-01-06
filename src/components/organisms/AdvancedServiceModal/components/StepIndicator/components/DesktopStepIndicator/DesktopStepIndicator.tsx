import { memo } from 'react'
import { StepBadge } from '../StepBadge'

interface DesktopStepIndicatorProps {
  steps: Array<{ id: number; title: string; description: string }>
  currentStep: number
  onStepClick: (stepId: number) => void
  getStepStatus: (stepId: number) => 'completed' | 'active' | 'pending'
}

export const DesktopStepIndicator = memo(
  ({ steps, onStepClick, getStepStatus }: DesktopStepIndicatorProps) => {
    return (
      <nav className="hidden md:block w-48 shrink-0">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.id)
          const isLast = idx === steps.length - 1

          return (
            <div key={step.id} className="relative">
              {!isLast && (
                <div
                  className={`absolute left-4 top-10 w-0.5 h-8 -translate-x-1/2 ${
                    status === 'completed' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}

              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className="w-full flex items-start gap-3 py-2 cursor-pointer group"
              >
                <StepBadge
                  stepNumber={step.id}
                  status={status === 'pending' ? 'upcoming' : status}
                />

                <div className="pt-0.5 text-left">
                  <p
                    className={`text-sm font-semibold ${
                      status === 'active'
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[120px]">{step.description}</p>
                </div>
              </button>
            </div>
          )
        })}
      </nav>
    )
  }
)
