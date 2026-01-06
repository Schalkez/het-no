import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { LoginModalProps } from './LoginModal.types'

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useTranslation()
  const handleLogin = async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const redirectUrl = params.get('redirect')
      const redirectTo = `${window.location.origin}/auth/callback${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
      onClose()
    } catch (error) {
      console.error('Login error:', error)
      const message = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`${t('login.error')}: ${message}`)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center pt-2 pb-4">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#627bea]/10 rounded-2xl flex items-center justify-center rotate-3">
            <span className="material-symbols-outlined text-[#627bea] text-4xl">
              account_balance_wallet
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
          {t('login.title')}
        </h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed px-4">{t('login.description')}</p>

        <Button
          fullWidth
          variant="secondary"
          size="lg"
          onClick={handleLogin}
          className="py-3.5"
          icon={
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
          iconPosition="left"
        >
          {t('login.google')}
        </Button>

        <div className="mt-8 text-[11px] text-gray-400">
          {t('login.footer_text')}{' '}
          <a href="#" className="hover:text-[#627bea] underline">
            {t('login.terms')}
          </a>{' '}
          {t('login.and')}{' '}
          <a href="#" className="hover:text-[#627bea] underline">
            {t('login.privacy')}
          </a>
          .
        </div>
      </div>
    </Modal>
  )
}
