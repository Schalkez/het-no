import { useEffect, useSyncExternalStore, useEffectEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Button } from '@/components/atoms/Button'
import type { ModalProps } from './Modal.types'

const emptySubscribe = () => () => {}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  showCloseButton = true,
  fullscreenMobile = false,
}: ModalProps & { fullscreenMobile?: boolean }) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const onEscape = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose()
    }
  })

  // Close on Escape key
  useEffect(() => {
    if (!isClient) return

    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('keydown', onEscape)
    }
  }, [isClient])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isClient) {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    return () => {
      if (isClient) document.body.style.overflow = ''
    }
  }, [isOpen, isClient])

  if (!isClient) return null

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-[500px]',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  // Ensure portal target exists
  const portalTarget = document.body

  // Mobile fullscreen classes
  const mobileFullscreenClasses = fullscreenMobile
    ? 'max-md:inset-0 max-md:rounded-none max-md:max-w-none max-md:h-full'
    : ''

  const containerClasses = fullscreenMobile ? 'max-md:p-0' : ''

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${containerClasses}`}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className={`fixed inset-0 bg-black/60 backdrop-blur-[1px] ${fullscreenMobile ? 'max-md:bg-black/0 max-md:backdrop-blur-0' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className={`relative w-full ${maxWidthStyles[maxWidth]} bg-white dark:bg-[#1e1e1e] rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-10 ${mobileFullscreenClasses}`}
            initial={{
              opacity: 0,
              scale: fullscreenMobile ? 1 : 0.95,
              y: fullscreenMobile ? 20 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: fullscreenMobile ? 1 : 0.95, y: fullscreenMobile ? 20 : 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {/* Close Button */}
            {showCloseButton && (
              <div className="absolute top-0 right-0 p-4 z-[60]">
                <Button
                  variant="neo-secondary"
                  onClick={onClose}
                  className="!p-1.5 !w-8 !h-8 !rounded-lg !bg-white dark:!bg-slate-800 !border-2 !border-black !shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:!shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[1px] hover:!translate-y-[1px] transition-all"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
            )}

            {/* Content Wrapper */}
            <div
              className={`overflow-y-auto custom-scrollbar ${fullscreenMobile ? 'max-md:h-full max-md:p-4 max-md:pt-14 p-8 max-h-[85vh]' : 'max-h-[85vh] p-8'}`}
            >
              {/* Header */}
              {(title ?? description) && (
                <div className="mb-6 text-center sm:text-left">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-1"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                  )}
                </div>
              )}

              {/* Body */}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalTarget
  )
}
