import { memo, ReactNode } from 'react'
import clsx from 'clsx'

interface CenteredSectionHeaderProps {
  badge?: string
  title: ReactNode
  description?: string
  className?: string
}

export const CenteredSectionHeader = memo(
  ({ badge, title, description, className }: CenteredSectionHeaderProps) => {
    return (
      <div className={clsx('text-center max-w-3xl mx-auto space-y-4', className)}>
        {badge && (
          <span className="text-primary font-bold tracking-wider uppercase text-xs bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mb-2">
            {badge}
          </span>
        )}
        <h2 className="text-text-main text-4xl md:text-5xl font-extrabold tracking-tight relative inline-block">
          {title}
        </h2>
        {description && <p className="text-slate-500 text-xl max-w-2xl mx-auto">{description}</p>}
      </div>
    )
  }
)
