'use client'

import { useMemo, type ReactNode, useContext } from 'react'
import { AbilityContext } from './AbilityProvider.context'
import { defineAbilityFor, type UserContext, type AbilityAction, type AbilitySubject } from '@/lib/casl'

interface AbilityProviderProps {
  children: ReactNode
  user: UserContext
}

export function AbilityProvider({ children, user }: AbilityProviderProps) {
  const ability = useMemo(() => defineAbilityFor(user), [user])

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}

interface CanProps {
  I: AbilityAction
  a: AbilitySubject
  children: ReactNode
  fallback?: ReactNode
}

export function Can({ I, a, children, fallback = null }: CanProps) {
  const ability = useContext(AbilityContext)
  if (!ability) {
    return <>{fallback}</>
  }
  return ability.can(I, a) ? <>{children}</> : <>{fallback}</>
}
