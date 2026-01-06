import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from '@tanstack/react-store'
import { authStore, signOut } from '@/stores/local/auth/auth.store'
import { setLoginModalOpen } from '@/stores/local/ui'
import { CurrencySelector } from '@/components/molecules/CurrencySelector'
import { Select } from '@/components/atoms/Select'
import { Button } from '@/components/atoms/Button'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside } from '@/lib/hooks/useClickOutside'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'

export function Header() {
  const { t, i18n } = useTranslation()
  const { user, isInitialized } = useStore(authStore)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const authDropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(authDropdownRef, () => setIsAuthOpen(false), isAuthOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/80 dark:bg-[#0f111a]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60 transition-all duration-300">
      <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Section */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-all active:scale-95 shrink-0"
          >
            <img src="/logo-light.svg" alt={t('app.title')} className="h-10 w-auto dark:hidden" />
            <img
              src="/logo-dark.svg"
              alt={t('app.title')}
              className="h-10 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/50"
              activeProps={{ className: '!text-primary !bg-primary/5 dark:!bg-primary/10' }}
            >
              {t('header.home', 'Trang chủ')}
            </Link>
            <Link
              to="/app"
              className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/50"
              activeProps={{ className: '!text-primary !bg-primary/5 dark:!bg-primary/10' }}
            >
              {t('header.calculator', 'Máy tính')}
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-[13px] font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/50"
                activeProps={{ className: '!text-primary !bg-primary/5 dark:!bg-primary/10' }}
              >
                {t('header.dashboard', 'Quản lý nhóm')}
              </Link>
            )}
          </nav>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-3 sm:gap-6 ml-auto sm:ml-0">
          <div className="hidden sm:flex items-center">
            <Select
              value={i18n.language?.substring(0, 2) || 'vi'}
              onChange={(val) => i18n.changeLanguage(val)}
              options={[
                { value: 'vi', label: '🇻🇳 VN' },
                { value: 'en', label: '🇺🇸 EN' },
              ]}
              variant="minimal"
              className="w-[85px]"
            />
          </div>

          {!isInitialized ? (
            <div className="flex items-center gap-2">
              <Skeleton className="w-[100px] h-9 rounded-full hidden lg:block" />
              <Skeleton className="w-9 h-9 circular" />
            </div>
          ) : user ? (
            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setIsAuthOpen(!isAuthOpen)}
                className="flex items-center gap-2.5 px-2 py-1.5 pr-3 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all cursor-pointer active:scale-95 min-w-[44px] h-[44px] sm:min-w-0"
              >
                <div className="w-8 h-8 shrink-0">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || ''}
                      className="w-full h-full rounded-full ring-2 ring-white dark:ring-gray-900 shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center text-xs font-black shadow-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start hidden lg:flex min-w-[60px] ml-0.5">
                  <span className="text-[12px] font-bold text-gray-900 dark:text-gray-100 leading-tight truncate max-w-[100px]">
                    {user.name}
                  </span>
                </div>
                <div className="w-4 h-4 flex items-center justify-center shrink-0 ml-0.5 opacity-40">
                  <span
                    className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${isAuthOpen ? 'rotate-180' : ''}`}
                  >
                    expand_more
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isAuthOpen && (
                  <>
                    {/* Arrow/Notch */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-5 mt-[5px] w-2.5 h-2.5 bg-white dark:bg-[#1a1d2d] border-t-2 border-l-2 border-black dark:border-gray-800 rotate-45 z-[51]"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1a1d2d] border-2 border-black dark:border-gray-800 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(30,30,30,0.5)] overflow-hidden z-50"
                    >
                      {/* Dropdown Header: Compact User Info */}
                      <div className="px-4 py-3 border-b-2 border-dashed border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 shrink-0 bg-white dark:bg-gray-800 rounded-lg border-2 border-black overflow-hidden shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {user.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-black text-sm">
                                {user.name?.charAt(0) || user.email?.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-[13px] font-black text-gray-900 dark:text-white truncate">
                              {user.name}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-1 space-y-0.5">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsAuthOpen(false)}
                          className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group"
                        >
                          <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 group-hover:border-black rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary">
                              dashboard
                            </span>
                          </div>
                          <span className="whitespace-nowrap">
                            {t('header.dashboard', 'Quản lý nhóm')}
                          </span>
                        </Link>

                        <Button
                          variant="ghost"
                          fullWidth
                          className="!flex !items-center !justify-start !px-2.5 !py-2 !h-auto !rounded-lg !text-gray-600 dark:!text-gray-300 hover:!bg-slate-50 dark:hover:!bg-slate-800/50 !gap-3 !border-none !text-[12px]"
                          onClick={() => {
                            setIsAuthOpen(false)
                            // Profile logic
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 group-hover:border-black rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                              person
                            </span>
                          </div>
                          <span className="font-bold whitespace-nowrap">
                            {t('header.profile', 'Hồ sơ cá nhân')}
                          </span>
                        </Button>
                      </div>

                      <div className="p-1 border-t border-gray-100 dark:border-gray-800 bg-gray-50/20">
                        <Button
                          variant="ghost"
                          fullWidth
                          className="!flex !items-center !justify-start !px-2.5 !py-2 !h-auto !rounded-lg !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10 !gap-3 !border-none !text-[12px]"
                          onClick={() => {
                            setIsAuthOpen(false)
                            signOut()
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-red-50/50 dark:bg-red-500/10 border-2 border-red-50 dark:border-red-900/30 group-hover:border-red-500 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px] text-red-400 group-hover:text-red-500">
                              logout
                            </span>
                          </div>
                          <span className="font-bold whitespace-nowrap text-left">
                            {t('header.logout', 'Đăng xuất')}
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => setLoginModalOpen(true)}
              className="shadow-md !py-2 h-[42px] min-w-[120px]"
            >
              <span className="text-[13px] font-black">{t('header.login', 'Tham gia ngay')}</span>
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden !w-10 !h-10 !p-0 !text-gray-500 hover:!bg-gray-100 dark:hover:!bg-gray-800 !rounded-lg"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Simplistic) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white dark:bg-[#0f111a] border-b border-gray-100 dark:border-gray-800 py-4 px-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="text-sm font-bold py-2" onClick={() => setIsMenuOpen(false)}>
            {t('header.home', 'Trang chủ')}
          </Link>
          <Link to="/app" className="text-sm font-bold py-2" onClick={() => setIsMenuOpen(false)}>
            {t('header.calculator', 'Máy tính')}
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-sm font-bold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.dashboard', 'Quản lý nhóm')}
            </Link>
          )}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Select
              value={i18n.language?.substring(0, 2) || 'vi'}
              onChange={(val) => i18n.changeLanguage(val)}
              options={[
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'English' },
              ]}
              className="flex-1"
            />
            <CurrencySelector />
          </div>
        </div>
      )}
    </header>
  )
}
