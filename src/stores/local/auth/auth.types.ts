import type { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email?: string | undefined
  name?: string | undefined
  avatarUrl?: string | undefined
}

export interface AuthState {
  user: AuthUser | null
  rawUser: User | null
  loading: boolean
  isInitialized: boolean
}
