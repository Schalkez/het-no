import { memo, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SPLIT_MODES, type SplitMode } from '@/lib/constants/splitModes'

interface SplitModeSelectorProps {
  currentMode: SplitMode
  onModeChange: (mode: SplitMode) => void
}

export const SplitModeSelector = memo(({ currentMode, onModeChange }: SplitModeSelectorProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const modes = [
    {
      id: SPLIT_MODES.EQUAL,
      label: t('split.mode.equal'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: SPLIT_MODES.QUANTITY,
      label: t('split.mode.quantity'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="9" y2="9" />
          <line x1="4" x2="20" y1="15" y2="15" />
          <line x1="10" x2="8" y1="3" y2="21" />
          <line x1="16" x2="14" y1="3" y2="21" />
        </svg>
      ),
    },
    {
      id: SPLIT_MODES.PERCENTAGE,
      label: t('split.mode.percentage'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" x2="5" y1="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      ),
    },
  ]

  const selectedMode = modes.find((m) => m.id === currentMode)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border-2 border-black rounded-xl py-3 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{selectedMode?.icon}</span>
          <span className="font-black text-sm">{selectedMode?.label}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                onModeChange(mode.id)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#A3E635] border-b-2 border-black last:border-0 transition-colors ${
                currentMode === mode.id
                  ? 'bg-[#A3E635] font-black'
                  : 'font-bold text-gray-600 hover:text-black hover:font-black'
              }`}
            >
              <span className="text-lg w-6 text-center">{mode.icon}</span>
              <span className="text-sm flex-1">{mode.label}</span>
              {currentMode === mode.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
