import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { setAuthUser, setAuthLoading, setAuthInitialized } from '@/stores/local/auth/auth.store'

/**
 * Global component to observe Supabase auth state changes and sync with local store.
 * Place this high in the component tree.
 */
export function AuthObserver() {
  useEffect(() => {
    // 1. Check initial session
    const checkSession = async () => {
      setAuthLoading(true)
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) console.error('AuthObserver: Error getting session', error)
        setAuthUser(session?.user ?? null)
      } catch (err) {
        console.error('Error getting session:', err)
        setAuthUser(null)
      } finally {
        setAuthLoading(false)
        setAuthInitialized(true)
      }
    }

    checkSession()

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null)
      setAuthLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return null // This component doesn't render anything
}
