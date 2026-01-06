import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { setAuthUser } from '@/stores/local/auth/auth.store'

export function useAuthCallback() {
  const navigate = useNavigate()
  const [errorStatus, setErrorStatus] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)
  const called = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      if (called.current) return
      called.current = true

      try {
        const params = new URLSearchParams(window.location.search)
        const error = params.get('error')
        const errorDescription = params.get('error_description')
        const code = params.get('code')

        if (error) throw new Error(errorDescription || error)

        if (code) {
          // Check if we already have a session (library might have auto-exchanged)
          const {
            data: { session: existingSession },
          } = await supabase.auth.getSession()

          if (!existingSession) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
            if (exchangeError) throw exchangeError
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) throw sessionError

        if (session) {
          setAuthUser(session.user)
          const redirectUrl = params.get('redirect')
          if (redirectUrl) {
            window.location.href = decodeURIComponent(redirectUrl)
            return
          }
          navigate({ to: '/dashboard' })
          return
        }

        throw new Error('No session found after callback')
      } catch (err) {
        console.error('AuthCallback: Error processing callback:', err)
        setErrorStatus(err instanceof Error ? err.message : 'Authentication failed')
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [navigate])

  return { errorStatus, isProcessing }
}
