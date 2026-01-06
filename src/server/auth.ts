/// <reference types="vite/client" />
import { supabase as browserClient } from '@/lib/supabase/client'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export async function createSupabaseServer() {
  const { createServerClient } = await import('@supabase/ssr')
  const { getCookies, setCookie } = await import('@tanstack/react-start/server')

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookies = getCookies()
        return Object.entries(cookies).map(([name, value]) => ({
          name,
          value: value ?? '',
        }))
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: object }>) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookie(name, value, options)
        })
      },
    },
  })
}

export async function getAuthUser() {
  const isServer = import.meta.env.SSR

  try {
    if (isServer) {
      const supabase = await createSupabaseServer()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return null
      return user
    } else {
      const {
        data: { user },
      } = await browserClient.auth.getUser()
      return user
    }
  } catch {
    return null
  }
}
