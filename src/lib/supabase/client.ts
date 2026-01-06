/// <reference types="vite/client" />
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types/index'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
