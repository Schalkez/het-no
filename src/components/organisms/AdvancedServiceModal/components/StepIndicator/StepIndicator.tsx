import { memo } from 'react'
import { MobileStepIndicator } from './components/MobileStepIndicator/MobileStepIndicator'
import { DesktopStepIndicator } from './components/DesktopStepIndicator/DesktopStepIndicator'

interface StepIndicatorProps {
  steps: Array<{ id: number; title: string; description: string }>
  currentStep: number
  onStepClick: (stepId: number) => void
  getStepStatus: (stepId: number) => 'completed' | 'active' | 'pending'
}

export const StepIndicator = memo((props: StepIndicatorProps) => {
  return (
    <>
      <MobileStepIndicator {...props} />
      <DesktopStepIndicator {...props} />
    </>
  )
})
