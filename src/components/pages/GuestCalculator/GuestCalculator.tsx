import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useOptimistic, useTransition } from 'react'
import { setAddPersonModalOpen } from '@/stores/local/ui'
import { toast } from 'sonner'

import { PeopleChips } from '@/components/organisms/PeopleChips/PeopleChips'
import { GuestBottomPanel } from '@/components/organisms/GuestBottomPanel/GuestBottomPanel'
import { AddPersonModal } from '@/components/organisms/AddPersonModal/AddPersonModal'
import { EditPersonModal } from '@/components/organisms/EditPersonModal'
import { AdvancedServiceModal } from '@/components/organisms/AdvancedServiceModal/AdvancedServiceModal'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { SettlementModal } from '@/components/organisms/SettlementModal'

import {
  pageVariants,
  cardVariants,
  contentVariants,
  contentItemVariants,
} from './GuestCalculator.animations'
import { GuestToolbar } from '@/components/molecules/GuestToolbar'
import { ServiceList } from '@/components/organisms/ServiceList'
import { useGuestCalculator } from './GuestCalculator.hooks'
import { GuestCalculatorSummary } from './components/GuestCalculatorSummary'

export function GuestCalculator() {
  const { t } = useTranslation()
  const { state, actions } = useGuestCalculator()
  const [, startTransition] = useTransition()

  const [optimisticPeople, addOptimisticPeople] = useOptimistic(
    state.people,
    (currentPeople, newNames: string[]) => [
      ...currentPeople,
      ...newNames.map((name) => ({
        id: `opt-${name}-${Math.random()}`,
        name,
        color: '#e2e8f0', // Light gray for optimistic state
        isOptimistic: true,
      })),
    ]
  )

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#111421] font-sans text-[#0e101b] dark:text-white min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Header */}

      {/* Main Content Area */}
      <motion.main
        className="flex-1 flex flex-col items-center w-full px-4 pb-24 pt-24 sm:pt-28 bg-paper-texture font-sans selection:bg-accent/30 selection:text-primary"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={cardVariants}
          className="w-full max-w-[720px] bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative z-10"
        >
          <GuestToolbar
            onAddPerson={() => setAddPersonModalOpen(true)}
            onAddService={() => actions.setEditingServiceId('NEW')}
            onResetAll={() => actions.setShowResetConfirm(true)}
          />

          <motion.div className="p-4 sm:p-5 space-y-6" variants={contentVariants}>
            <motion.div variants={contentItemVariants}>
              <PeopleChips
                people={optimisticPeople}
                onRemovePerson={actions.handleRemovePerson}
                onEditPerson={actions.setEditingPerson}
              />
            </motion.div>

            <ServiceList
              services={state.services}
              people={optimisticPeople}
              onAddService={() => actions.setEditingServiceId('NEW')}
              onEditService={actions.setEditingServiceId}
              onDeleteService={actions.handleDeleteService}
            />
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Sticky Bottom Bar */}
      <GuestBottomPanel
        summary={<GuestCalculatorSummary splitResult={state.splitResult} />}
        onSave={() => toast.info(t('common.coming_soon'))}
        onViewDetails={() => actions.setSettlementModalOpen(true)}
      />

      {/* Modals */}
      <SettlementModal
        isOpen={state.isSettlementModalOpen}
        onClose={() => actions.setSettlementModalOpen(false)}
        result={state.splitResult}
        people={state.people}
      />

      <AddPersonModal
        isOpen={state.isAddPersonModalOpen}
        onClose={() => setAddPersonModalOpen(false)}
        onSubmit={(names) => {
          startTransition(() => {
            addOptimisticPeople(names)
            actions.handleAddPerson(names)
          })
        }}
        existingPeople={state.people}
      />

      {/* Key prop forces re-mount when person changes, resetting local state */}
      <EditPersonModal
        key={state.editingPerson?.id ?? 'new'}
        isOpen={!!state.editingPerson}
        onClose={() => actions.setEditingPerson(null)}
        onSave={actions.handleUpdatePerson}
        person={state.editingPerson}
      />

      <ConfirmDialog
        isOpen={!!state.deleteConfirm}
        onClose={() => actions.setDeleteConfirm(null)}
        onConfirm={actions.handleConfirmDelete}
        title={
          state.deleteConfirm?.type === 'service'
            ? t('confirm.delete_service_title')
            : t('confirm.delete_person_title')
        }
        description={
          state.deleteConfirm?.type === 'service'
            ? t('confirm.delete_service_desc', { name: state.deleteConfirm?.name })
            : t('confirm.delete_person_desc', { name: state.deleteConfirm?.name })
        }
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={state.showResetConfirm}
        onClose={() => actions.setShowResetConfirm(false)}
        onConfirm={actions.handleResetAll}
        title={t('confirm.reset_all_title')}
        description={t('confirm.reset_all_desc')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        variant="danger"
      />

      <AdvancedServiceModal
        key={state.editingServiceId ?? 'empty'}
        isOpen={!!state.editingServiceId}
        onClose={() => actions.setEditingServiceId(null)}
        onSave={actions.handleUpdateService}
        service={state.editingService}
        people={state.people}
      />
    </div>
  )
}
