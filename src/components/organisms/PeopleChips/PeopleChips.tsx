import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'
import type { PeopleChipsProps } from './PeopleChips.types'
import React from 'react'

export function PeopleChips({ people, onRemovePerson, onEditPerson }: PeopleChipsProps) {
  const { t } = useTranslation()
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
        {t('people.label')}
      </label>
      <div className="flex flex-wrap gap-2.5">
        {people.map((p) => {
          return (
            <div
              key={p.id}
              onClick={() => !p.isOptimistic && onEditPerson(p)}
              style={{
                opacity: p.isOptimistic ? 0.6 : 1,
                pointerEvents: p.isOptimistic ? 'none' : 'auto',
              }}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border-2 border-transparent hover:border-black bg-slate-50 text-gray-900 transition-all cursor-pointer group"
            >
              <div
                className={`w-7 h-7 rounded-full ${p.color} flex items-center justify-center font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold">{p.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  onRemovePerson(p.id)
                }}
                className="!p-0 !w-6 !h-6 !min-w-0 !rounded-full opacity-0 group-hover:opacity-100 !text-slate-400 hover:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10"
              >
                <span className="material-symbols-outlined text-[16px] font-bold">close</span>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
