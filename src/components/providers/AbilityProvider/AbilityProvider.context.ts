import { createContext } from 'react'
import type { AppAbility } from '@/lib/casl'

export const AbilityContext = createContext<AppAbility | null>(null)
