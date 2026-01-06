import { createContext, useContext, ReactNode } from 'react'
import { usePresence } from '@/hooks/usePresence'

import * as Y from 'yjs'

interface CollaborationContextType {
  awarenessUsers: {
    id: string
    name: string
    color: string
    avatar?: string | null
    focusedId?: string | null
    isTyping?: boolean
  }[]
  updateFocus: (id: string | null, isTyping?: boolean) => void
  sharedMap: Y.Map<unknown>
  syncStatus: 'connecting' | 'connected' | 'disconnected'
}

const CollaborationContext = createContext<CollaborationContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useCollaboration = () => {
  const context = useContext(CollaborationContext)
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider')
  }
  return context
}

interface CollaborationProviderProps {
  topicId: string
  user: { id: string; name: string; color: string; avatar?: string | null }
  children: ReactNode
}

export function CollaborationProvider({ topicId, user, children }: CollaborationProviderProps) {
  const presence = usePresence(topicId, user)

  return <CollaborationContext.Provider value={presence}>{children}</CollaborationContext.Provider>
}
