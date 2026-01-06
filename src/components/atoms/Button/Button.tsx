import type { ButtonProps } from './Button.types'
import { useFormStatus } from 'react-dom'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  onClick,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus()
  const isActuallyLoading = loading || (type === 'submit' && pending)
  const isActuallyDisabled = disabled || isActuallyLoading
  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:shadow-none'

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary/90 hover:shadow-md active:bg-primary/80 shadow-sm shadow-primary/30',
    secondary:
      'bg-transparent border border-gray-300 dark:border-gray-600 text-primary hover:bg-primary/5 hover:border-primary dark:text-primary-soft dark:hover:bg-primary/10 active:bg-primary/10',
    danger:
      'bg-red-500 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all',
    ghost:
      'bg-transparent text-primary hover:bg-primary/10 dark:text-primary-soft dark:hover:bg-primary/10 active:bg-primary/20',
    neo: 'bg-primary text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all',
    'neo-secondary':
      'bg-white text-slate-800 border-2 border-slate-200 shadow-sm hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-lg gap-2',
    lg: 'h-12 px-8 text-base rounded-xl gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  }

  const widthStyles = fullWidth ? 'w-full' : ''

  const classes = [baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isActuallyDisabled}
      className={classes}
      {...props}
    >
      {isActuallyLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent shrink-0" />
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
        </>
      )}
    </button>
  )
}
