import { useContext } from 'react'
import { AbilityContext } from './AbilityProvider.context'
import type { AppAbility } from '@/lib/casl'

export function useAbility(): AppAbility {
  const ability = useContext(AbilityContext)
  if (!ability) {
    throw new Error('useAbility must be used within an AbilityProvider')
  }
  return ability
}
