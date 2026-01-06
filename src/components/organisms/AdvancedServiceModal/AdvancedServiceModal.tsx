import { Modal } from '@/components/molecules/Modal'
import type { AdvancedServiceModalProps } from './AdvancedServiceModal.types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SPLIT_MODES } from '@/lib/constants/splitModes'
import { type ExpenseSchema } from '@/lib/schemas/expense'

// Modular Components
import {
  MobileStepIndicator,
  DesktopStepIndicator,
} from '@/components/organisms/AdvancedServiceModal/components/StepIndicator'
import { Step1ServiceInfo } from '@/components/organisms/AdvancedServiceModal/components/Step1ServiceInfo'
import { Step2PayerSelection } from '@/components/organisms/AdvancedServiceModal/components/Step2PayerSelection'
import { Step3BeneficiarySelection } from '@/components/organisms/AdvancedServiceModal/components/Step3BeneficiarySelection'
import { ResultPreview } from '@/components/organisms/AdvancedServiceModal/components/ResultPreview/ResultPreview'
import { ModalFooter } from '@/components/organisms/AdvancedServiceModal/components/ModalFooter'
import { AdvancedServiceProvider } from './AdvancedServiceModal.context'
import { useAdvancedServiceContext } from './hooks'
import { calculateBeneficiaryItems } from '@/lib/utils/splitLogic'
import { useCollaboration } from '@/components/collaboration/CollaborationProvider'
import { useEffect } from 'react'
import { PresenceIndicator } from '@/components/collaboration/PresenceIndicator'

function AdvancedServiceModalContent({
  onClose,
  onSave,
  service,
  isOpen,
}: AdvancedServiceModalProps) {
  const { t } = useTranslation()
  const form = useAdvancedServiceContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const { updateFocus, awarenessUsers } = useCollaboration()

  // Thông báo đang edit service này
  useEffect(() => {
    if (isOpen && service?.id) {
      updateFocus(`modal-${service.id}`)
    }
    return () => {
      updateFocus(null)
    }
  }, [isOpen, service?.id, updateFocus])

  const STEPS = [
    { id: 1, title: t('modal.service_info'), description: t('modal.step1_desc') },
    { id: 2, title: t('service_card.payer_label'), description: t('modal.step2_desc') },
    { id: 3, title: t('service_card.beneficiary_label'), description: t('modal.step3_desc') },
  ]

  const onSubmitForm = async (data: ExpenseSchema) => {
    try {
      setIsSaving(true)

      // Calculate shouldPay for each beneficiary
      const usedBeneficiaries = data.beneficiaries.filter((b) => b.used)
      const splitMode = data.splitMode
      const totalCost = data.cost

      const items = calculateBeneficiaryItems(totalCost, data.beneficiaries, splitMode)
      const beneficiaries = items.map((i) => ({ ...i, serviceId: service?.id || '' }))

      await onSave(service?.id ?? '', {
        name: data.name,
        totalCost: data.cost,
        splitMode: data.splitMode,
        payers: data.payers.map((p) => ({
          id: p.personId,
          personId: p.personId,
          paidAmount: Number(p.amount),
          serviceId: service?.id ?? '',
        })),
        beneficiaries,
        totalQuantity:
          splitMode === SPLIT_MODES.QUANTITY
            ? usedBeneficiaries.reduce((sum: number, b) => sum + (Number(b.quantity) || 0), 0)
            : undefined,
      })
      handleClose()
    } catch (error) {
      console.error('Failed to save service:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    onClose()
  }

  const { watch, handleSubmit } = form
  const name = watch('name') || ''
  const cost = watch('cost') || 0
  const payers = watch('payers') || []
  const beneficiaries = watch('beneficiaries') || []

  const totalPaid = payers.reduce((sum: number, p) => sum + (p.amount || 0), 0)
  const usedBeneficiaries = beneficiaries.filter((b) => b.used)

  const canProceedStep1 = name.trim().length > 0 && cost > 0
  const canProceedStep2 = payers.length > 0 && Math.abs(totalPaid - cost) < 0.01
  const canProceedStep3 = usedBeneficiaries.length > 0

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'active'
    return 'pending'
  }

  const canProceed =
    currentStep === 1 ? canProceedStep1 : currentStep === 2 ? canProceedStep2 : canProceedStep3

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      if (canProceed) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      handleSubmit(onSubmitForm, (errors) => {
        console.error('Submission validation failed:', errors)
        // Check for specific logic errors to give better feedback to user
        if (errors.payers) {
          console.error('Payers error:', errors.payers)
        }
      })()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'TEXTAREA') return
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="lg" fullscreenMobile>
      <div onKeyDown={handleKeyDown} className="h-full flex flex-col">
        <MobileStepIndicator
          steps={STEPS}
          onStepClick={setCurrentStep}
          getStepStatus={getStepStatus}
        />

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:min-h-[450px]">
          <DesktopStepIndicator
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            getStepStatus={getStepStatus}
          />

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <PresenceIndicator
                elementId={`modal-${service?.id}`}
                awarenessUsers={awarenessUsers}
              />
              {awarenessUsers.filter((u) => u.focusedId === `modal-${service?.id}`).length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                    Đang có người cùng xem
                  </span>
                  {awarenessUsers.some(
                    (u) => u.focusedId === `modal-${service?.id}` && u.isTyping
                  ) && (
                    <div className="flex items-center gap-1">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="text-[10px] font-black text-indigo-600 animate-pulse">
                        ĐANG NHẬP...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-1 md:min-h-[350px] relative">
              {currentStep === 1 && <Step1ServiceInfo />}

              {currentStep === 2 && <Step2PayerSelection />}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <Step3BeneficiarySelection />
                  <ResultPreview />
                </div>
              )}
            </div>

            <ModalFooter
              currentStep={currentStep}
              totalSteps={STEPS.length}
              canProceed={canProceed}
              onBack={() => setCurrentStep(currentStep - 1)}
              onNext={handleNext}
              onCancel={handleClose}
              loading={isSaving}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function AdvancedServiceModal(props: AdvancedServiceModalProps) {
  if (!props.isOpen) return null

  return (
    <AdvancedServiceProvider service={props.service} people={props.people}>
      <AdvancedServiceModalContent {...props} />
    </AdvancedServiceProvider>
  )
}
