import { Store } from '@tanstack/store'
import { nanoid } from 'nanoid'
import type { GuestState, GuestService, GuestPerson } from './guest.types'
import { getAvatarColor, getNextAvatarColor } from '@/lib/utils/colors'

// LocalStorage key
const STORAGE_KEY = 'chia_tien_guest_data_v1'

// Initial state
const initialState: GuestState = {
  services: [],
  people: [
    { id: nanoid(), name: 'Bạn', color: getAvatarColor(0) }, // Default person with first color
  ],
}

// Load from LocalStorage
const loadState = (): GuestState => {
  if (typeof window === 'undefined') return initialState
  try {
    const item = window.localStorage.getItem(STORAGE_KEY)
    return item ? JSON.parse(item) : initialState
  } catch (e) {
    console.error('Failed to load guest data:', e)
    return initialState
  }
}

export const guestStore = new Store<GuestState>(loadState())

// Save to LocalStorage on change
guestStore.subscribe(() => {
  const state = guestStore.state
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
})

// --- Actions ---

export const addService = (name: string, cost: number) => {
  const id = nanoid()

  guestStore.setState((state: GuestState) => {
    // Default Payer: First person pays full amount
    const firstPerson = state.people[0]
    const payers = firstPerson
      ? [
          {
            id: nanoid(),
            personId: firstPerson.id,
            paidAmount: cost,
          },
        ]
      : []

    // Default Beneficiaries: All people involved
    const beneficiaries = state.people.map((p) => ({
      id: nanoid(),
      serviceId: id,
      personId: p.id,
      used: true,
      shouldPay: 0,
    }))

    const newService: GuestService = {
      id,
      name,
      totalCost: cost,
      splitMode: 'equal',
      payers,
      beneficiaries,
    }

    return {
      ...state,
      services: [...state.services, newService],
    }
  })

  return id
}

export const createAdvancedService = (service: Omit<GuestService, 'id'>) => {
  const id = nanoid()
  const newService: GuestService = {
    ...service,
    id,
    beneficiaries: service.beneficiaries.map((b) => ({ ...b, serviceId: id })),
  }

  guestStore.setState((state: GuestState) => ({
    ...state,
    services: [...state.services, newService],
  }))

  return id
}

export const addPerson = (name: string) => {
  guestStore.setState((state: GuestState) => {
    const newPerson: GuestPerson = {
      id: nanoid(),
      name,
      color: getNextAvatarColor(state.people.length),
    }
    return {
      ...state,
      people: [...state.people, newPerson],
    }
  })
}

export const updateService = (id: string, updates: Partial<GuestService>) => {
  guestStore.setState((state: GuestState) => ({
    ...state,
    services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
  }))
}

export const removeService = (id: string) => {
  guestStore.setState((state: GuestState) => ({
    ...state,
    services: state.services.filter((s) => s.id !== id),
  }))
}

export const removePerson = (id: string) => {
  guestStore.setState((state: GuestState) => ({
    ...state,
    people: state.people.filter((p) => p.id !== id),
  }))
}

export const updatePerson = (id: string, name: string) => {
  guestStore.setState((state: GuestState) => ({
    ...state,
    people: state.people.map((p) => (p.id === id ? { ...p, name } : p)),
  }))
}

export const resetGuestData = () => {
  guestStore.setState(() => initialState)
}
