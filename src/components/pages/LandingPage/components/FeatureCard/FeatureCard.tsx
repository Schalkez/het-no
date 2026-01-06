import clsx from 'clsx'
import { memo } from 'react'

export type FeatureColor = 'blue' | 'purple' | 'orange'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  color: FeatureColor
  badgeText?: string
}

const colorStyles: Record<
  FeatureColor,
  { bg: string; border: string; iconBg: string; iconBorder: string; iconColor: string }
> = {
  blue: {
    bg: 'bg-blue-100', // hover bg
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconBorder: 'border-blue-200',
    iconColor: 'text-blue-600',
  },
  purple: {
    bg: 'bg-purple-100',
    border: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconBorder: 'border-purple-200',
    iconColor: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-100',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconBorder: 'border-orange-200',
    iconColor: 'text-orange-600',
  },
}

export const FeatureCard = memo(
  ({ icon, title, description, color, badgeText }: FeatureCardProps) => {
    const theme = colorStyles[color]

    return (
      <div className="group p-8 rounded-[2.5rem] bg-[#F8FAFC] border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative">
        {badgeText && (
          <div className="absolute -top-3 -right-3 rotate-12 bg-accent text-xs font-bold px-3 py-1 rounded-full border border-black shadow-sm transform scale-0 group-hover:scale-100 transition-transform">
            {badgeText}
          </div>
        )}
        <div
          className={clsx(
            'w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
            theme.iconBg,
            theme.iconBorder,
            theme.iconColor,
            color === 'blue' && 'group-hover:-rotate-6',
            color === 'purple' && 'group-hover:rotate-6',
            color === 'orange' && 'group-hover:-rotate-3'
          )}
        >
          <span
            className="material-symbols-outlined !text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
          >
            {icon}
          </span>
        </div>
        <h4 className="text-text-main text-2xl font-bold mb-3 font-hand">{title}</h4>
        <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
      </div>
    )
  }
)
