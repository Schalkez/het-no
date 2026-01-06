import { useState, useRef } from 'react'
import { useClickOutside } from '@/lib/hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { ActionMenuProps } from './ActionMenu.types'

export function ActionMenu({ items, trigger, align = 'right' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setIsOpen(false))

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const handleItemClick = (e: React.MouseEvent, onClick: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)
    onClick()
  }

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggle}>
        {trigger || (
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.1 }}
            className={`absolute mt-2 w-40 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50 ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={(e) => handleItemClick(e, item.onClick)}
                  disabled={item.disabled}
                  className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    item.variant === 'danger'
                      ? 'text-red-500 hover:bg-red-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  } ${index !== 0 ? 'border-t border-gray-100' : ''} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
