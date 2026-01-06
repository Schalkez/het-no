import * as Y from 'yjs'
import YPartyKitProvider from 'y-partykit/provider'
import { IndexeddbPersistence } from 'y-indexeddb'
import { useState, useEffect, useMemo } from 'react'
import type { UserPresence } from '@/types/collaboration'
import { SYNC_STATUS } from '@/lib/constants'

export const usePresence = (
  topicId: string,
  user: { id: string; name: string; color: string; avatar?: string | null }
): {
  awarenessUsers: UserPresence[]
  updateFocus: (id: string | null, isTyping?: boolean) => void
  sharedMap: Y.Map<unknown>
  syncStatus: (typeof SYNC_STATUS)[keyof typeof SYNC_STATUS]
} => {
  const [awarenessUsers, setAwarenessUsers] = useState<UserPresence[]>([])
  const [syncStatus, setSyncStatus] = useState<(typeof SYNC_STATUS)[keyof typeof SYNC_STATUS]>(
    SYNC_STATUS.CONNECTING
  )

  const { doc, provider, sharedMap } = useMemo(() => {
    const doc = new Y.Doc()
    const sharedMap = doc.getMap('liveUpdates')

    // 1. Local Persistence (IndexedDB)
    const indexeddbProvider = new IndexeddbPersistence(`chia-tien-topic-${topicId}`, doc)
    indexeddbProvider.on('synced', () => {
      console.log('[Yjs] IndexedDB synced')
    })

    // 2. Network Sync (PartyKit)
    const isDev = import.meta.env.DEV
    const partyHost =
      import.meta.env.VITE_PARTYKIT_HOST ||
      (isDev ? 'localhost:1999' : 'chia-tien-party.mac.partykit.dev')

    console.log(`[PartyKit] Connecting to ${partyHost} for topic ${topicId}...`)

    const provider = new YPartyKitProvider(partyHost, `topic-${topicId}`, doc, {
      connect: true,
      params: {
        userId: user.id,
      },
    })

    provider.on('synced', () => {
      setSyncStatus(SYNC_STATUS.CONNECTED)
      provider.awareness.setLocalStateField('user', {
        id: user.id,
        name: user.name,
        color: user.color,
        avatar: user.avatar,
        focusedId: null,
        isTyping: false
      })
    })

    provider.on('error', (err: unknown) => {
      console.error('[PartyKit] Connection error:', err)
      setSyncStatus(SYNC_STATUS.DISCONNECTED)
    })

    return { doc, provider, sharedMap }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, user.id])

  useEffect(() => {
    provider.awareness.setLocalStateField('user', {
      id: user.id,
      name: user.name,
      color: user.color,
      avatar: user.avatar,
      focusedId: null,
      isTyping: false
    })

    const handleAwarenessChange = () => {
      const allStates = provider.awareness.getStates()
      const states = Array.from(allStates.values()) as { user?: UserPresence }[]

      const uniqueUsersMap = new Map<string, UserPresence>()
      states.forEach((s) => {
        if (s?.user?.id) {
          uniqueUsersMap.set(s.user.id, s.user)
        }
      })

      const activeUsers = Array.from(uniqueUsersMap.values())
      setAwarenessUsers(activeUsers)
    }

    handleAwarenessChange()
    provider.awareness.on('change', handleAwarenessChange)

    return () => {
      provider.awareness.off('change', handleAwarenessChange)
    }
  }, [provider, user])

  useEffect(() => {
    return () => {
      provider.disconnect()
      doc.destroy()
    }
  }, [provider, doc])

  const updateFocus = (elementId: string | null, isTyping?: boolean) => {
    const localState = provider.awareness.getLocalState()
    if (!localState || !localState.user) return

    provider.awareness.setLocalStateField('user', {
      ...localState.user,
      focusedId: elementId,
      isTyping: isTyping ?? localState.user.isTyping ?? false,
    })
  }

  return { awarenessUsers, updateFocus, sharedMap, syncStatus }
}
