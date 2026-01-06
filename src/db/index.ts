import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema/index'

// Handle different environments (Client/Server vs CLI)
const getEnvVar = (name: string) => {
  if (typeof process !== 'undefined' && process.env?.[name]) return process.env[name]
  try {
    if (import.meta.env?.[name]) return import.meta.env[name]
  } catch {
    // Environment doesn't support import.meta.env
  }
  return undefined
}

const connectionString = getEnvVar('VITE_DATABASE_URL') || getEnvVar('DATABASE_URL')

if (!connectionString) {
  // Only throw if we are on the server/CLI, as this file might be bundled into browser code (where it shouldn't be executed)
  if (typeof window === 'undefined') {
    console.warn('DATABASE_URL is missing. DB connection will fail.')
  }
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString || '', {
  prepare: false,
  ssl: 'require',
})
export const db = drizzle(client, { schema })
