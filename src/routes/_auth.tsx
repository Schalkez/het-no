import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getAuthUser } from '@/server/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location }) => {
    // Server-side auth check (will also run on client)
    const user = await getAuthUser()

    if (!user) {
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      user,
      userId: user.id,
    }
  },
  component: Outlet,
})
