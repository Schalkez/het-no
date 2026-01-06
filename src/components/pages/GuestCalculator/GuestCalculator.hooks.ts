import { useState, useMemo } from 'react'
import { useStore } from '@tanstack/react-store'
import {
  guestStore,
  removeService,
  updateService,
  createAdvancedService,
  updatePerson,
  addPerson,
  removePerson,
  resetGuestData,
} from '@/stores/local/guest'
import { uiStore, setAddPersonModalOpen } from '@/stores/local/ui'
import { calculateSplit } from '@/lib/utils/calculation'
import type { GuestService, GuestPerson } from '@/stores/local/guest'

export function useGuestCalculator() {
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [editingPerson, setEditingPerson] = useState<GuestPerson | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'service' | 'person'
    id: string
    name: string
  } | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isSettlementModalOpen, setSettlementModalOpen] = useState(false)

  // Get Store State
  const { people, services } = useStore(guestStore, (state) => state)
  const uiState = useStore(uiStore, (state) => state)

  // Calculate Result Logic
  const splitResult = useMemo(() => calculateSplit(services, people), [services, people])

  // Modals Local State Sync
  const isAddPersonModalOpen = uiState.isAddPersonModalOpen
  const isLoginModalOpen = uiState.isLoginModalOpen

  const editingService = useMemo(
    () => services.find((s) => s.id === editingServiceId) ?? null,
    [services, editingServiceId]
  )

  // Handlers
  const handleUpdateService = (id: string, updates: Partial<GuestService>) => {
    if (id && id !== 'NEW') {
      updateService(id, updates)
    } else {
      // Explicitly construct the new service with all required fields
      const newService: Omit<GuestService, 'id'> = {
        name: updates.name ?? '',
        totalCost: updates.totalCost ?? 0,
        splitMode: updates.splitMode ?? 'equal',
        beneficiaries: updates.beneficiaries ?? [],
        payers: updates.payers ?? [],
      }
      createAdvancedService(newService)
    }
    setEditingServiceId(null)
  }

  const handleAddPerson = (names: string[]) => {
    names.forEach((name) => addPerson(name))
    setAddPersonModalOpen(false)
  }

  const handleUpdatePerson = (id: string, name: string) => {
    updatePerson(id, name)
    setEditingPerson(null)
  }

  const handleDeleteService = (id: string) => {
    const service = services.find((s) => s.id === id)
    if (service) {
      setDeleteConfirm({ type: 'service', id, name: service.name })
    }
  }

  const handleRemovePerson = (id: string) => {
    const person = people.find((p) => p.id === id)
    if (person) {
      setDeleteConfirm({ type: 'person', id, name: person.name })
    }
  }

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return

    if (deleteConfirm.type === 'service') {
      removeService(deleteConfirm.id)
    } else {
      removePerson(deleteConfirm.id)
    }

    setDeleteConfirm(null)
  }

  const handleResetAll = () => {
    resetGuestData()
    setShowResetConfirm(false)
  }

  return {
    state: {
      people,
      services,
      editingServiceId,
      editingService,
      editingPerson,
      deleteConfirm,
      showResetConfirm,
      isSettlementModalOpen,
      isAddPersonModalOpen,
      isLoginModalOpen,
      splitResult,
    },
    actions: {
      setEditingServiceId,
      setEditingPerson,
      setDeleteConfirm,
      setShowResetConfirm,
      setSettlementModalOpen,
      handleUpdateService,
      handleAddPerson,
      handleUpdatePerson,
      handleDeleteService,
      handleRemovePerson,
      handleConfirmDelete,
      handleResetAll,
    },
  }
}
