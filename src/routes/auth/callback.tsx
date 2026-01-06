import { createFileRoute } from '@tanstack/react-router'

import { AuthError } from '@/components/molecules/AuthError'
import { useAuthCallback } from '@/lib/hooks/useAuthCallback'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
})

function AuthCallback() {
  const { errorStatus } = useAuthCallback()

  if (errorStatus) {
    return <AuthError message={errorStatus} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6f8] dark:bg-[#111421]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#627bea] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  )
}
