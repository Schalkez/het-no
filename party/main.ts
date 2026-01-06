import type { Connection, Room, Server } from 'partykit/server'
import { onConnect } from 'y-partykit'

export default {
  async onConnect(conn: Connection, room: Room) {
    // onConnect handles Yjs synchronization and awareness automatically
    return await onConnect(conn, room, {
      persist: true, // Enable snapshot persistence to Cloudflare KV
    })
  },
} satisfies Server
