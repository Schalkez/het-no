import { memo } from 'react'
import { BackButton } from './components/BackButton'
import { NextButton } from './components/NextButton'
import { FinishButton } from './components/FinishButton'

export interface ModalFooterProps {
  currentStep: number
  totalSteps: number
  canProceed: boolean
  onBack: () => void
  onNext: () => void
  onCancel: () => void
  loading?: boolean
}

export const ModalFooter = memo(
  ({ currentStep, totalSteps, canProceed, onBack, onNext, loading = false }: ModalFooterProps) => {
    const isLastStep = currentStep === totalSteps

    return (
      <div className="flex justify-end gap-2 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
        {currentStep > 1 && <BackButton onClick={onBack} />}

        {isLastStep ? (
          <FinishButton onClick={onNext} disabled={!canProceed} loading={loading} />
        ) : (
          <NextButton onClick={onNext} disabled={!canProceed} loading={loading} />
        )}
      </div>
    )
  }
)
