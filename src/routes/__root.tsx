import React from 'react'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { AuthObserver } from '@/components/organisms/AuthObserver'
import { Header } from '@/components/organisms/Header'
import { LoginModal } from '@/components/organisms/LoginModal'
import { uiStore, setLoginModalOpen } from '@/stores/local/ui'
import { Button } from '@/components/atoms/Button'
import { Toaster } from 'sonner'

import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from '@tanstack/react-query'
import i18n from '@/lib/i18n'
import { queryClient } from '@/lib/query-client'
import indexCss from '@/index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    title: `${i18n.t('app.title')} - ${i18n.t('landing.hero.tagline')}`,
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'stylesheet', href: indexCss },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Kalam:wght@400;700&display=swap',
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-4xl font-bold font-hand text-primary">404</h1>
        <p className="text-xl">{i18n.t('not_found.title')}</p>
        <a
          href="/"
          className="px-6 py-2 bg-primary text-white rounded-full hover:scale-105 transition-transform"
        >
          {i18n.t('not_found.back_home')}
        </a>
      </div>
    )
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4 text-center">
        <h1 className="text-4xl font-bold font-hand text-secondary">{i18n.t('error.title')}</h1>
        <p className="text-xl">{i18n.t('error.message')}</p>
        <pre className="p-4 bg-gray-100 rounded text-left overflow-auto max-w-full text-xs">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <Button
          onClick={() => window.location.reload()}
          variant="neo"
          className="!px-8 !py-2.5 !rounded-full !h-auto !min-w-0"
        >
          {i18n.t('error.retry')}
        </Button>
      </div>
    )
  },
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang={i18n.language || 'vi'} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const { isLoginModalOpen } = useStore(uiStore)
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AuthObserver />
        <Header />
        <main className="pt-[72px] min-h-screen bg-gray-50/50">
          <Outlet />
        </main>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        <Toaster richColors position="top-center" />
      </I18nextProvider>
    </QueryClientProvider>
  )
}
