import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'

export interface GuestBottomPanelProps {
  summary: React.ReactNode
  onSave: () => void
  onViewDetails?: () => void
}

export function GuestBottomPanel({ summary, onSave, onViewDetails }: GuestBottomPanelProps) {
  const { t } = useTranslation()
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="absolute inset-0 bg-white/90 dark:bg-[#111421]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800"></div>

      <div className="relative max-w-[960px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div
          onClick={onViewDetails}
          className={`flex items-center gap-3 ${onViewDetails ? 'cursor-pointer group hover:opacity-80 transition-opacity' : ''}`}
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined fill-current">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              {t('bottom_panel.provisional_result')}
              {onViewDetails && (
                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform text-[#627bea]">
                  open_in_new
                </span>
              )}
            </span>
            <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {summary}
            </div>
          </div>
        </div>

        <Button
          onClick={onSave}
          size="lg"
          variant="neo"
          icon={<span className="material-symbols-outlined">save</span>}
        >
          {t('common.save_group')}
        </Button>
      </div>
    </div>
  )
}
