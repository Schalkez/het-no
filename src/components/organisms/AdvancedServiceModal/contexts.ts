import { createContext, useContext } from 'react'
import type { GuestPerson } from '@/stores/local/guest'

export const PeopleContext = createContext<GuestPerson[]>([])
export const usePeople = () => useContext(PeopleContext)
