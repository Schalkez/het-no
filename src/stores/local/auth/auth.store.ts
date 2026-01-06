import { Store } from '@tanstack/store'
import type { AuthState, AuthUser } from './auth.types'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

export const authStore = new Store<AuthState>({
  user: null,
  rawUser: null,
  loading: true,
  isInitialized: false,
})

// --- Actions ---

export const setAuthLoading = (isLoading: boolean) => {
  authStore.setState((state) => ({
    ...state,
    loading: isLoading,
  }))
}

export const setAuthInitialized = (isInitialized: boolean) => {
  authStore.setState((state) => ({
    ...state,
    isInitialized,
  }))
}

export const setAuthUser = (user: User | null) => {
  if (!user) {
    authStore.setState((state) => ({
      ...state,
      user: null,
      rawUser: null,
    }))
    return
  }

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
    avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
  }

  authStore.setState((state) => ({
    ...state,
    user: authUser,
    rawUser: user,
  }))
}

export const signOut = async () => {
  setAuthLoading(true)
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setAuthUser(null)
  } catch (error) {
    console.error('Error signing out:', error)
  } finally {
    setAuthLoading(false)
  }
}
