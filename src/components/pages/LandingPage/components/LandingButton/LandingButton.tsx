import { memo } from 'react'
import { Button } from '@/components/atoms/Button'
import { className as cn } from '@/lib/utils/className'

interface LandingButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> {
  variant?: 'primary' | 'secondary'
  icon?: string
  onClick?: () => void
}

export const LandingButton = memo(
  ({ variant = 'primary', icon, children, className, onClick, ...props }: LandingButtonProps) => {
    return (
      <Button
        variant={variant === 'primary' ? 'neo' : 'neo-secondary'}
        onClick={onClick}
        icon={icon ? <span className="material-symbols-outlined">{icon}</span> : undefined}
        className={cn(
          '!h-14 !px-8 !rounded-full !text-lg !font-bold !transition-all !min-w-0 !border-2',
          variant === 'primary'
            ? '!bg-indigo-600 !text-white !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[2px] hover:!translate-y-[2px] hover:!shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            : '!bg-white !text-slate-800 !border-slate-200 !shadow-sm hover:!border-black hover:!shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
