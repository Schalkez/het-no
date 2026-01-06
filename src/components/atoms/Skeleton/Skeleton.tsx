import { className } from '../../../lib/utils/className'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className: customClassName = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-800'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  const style = {
    width: width,
    height: height,
  }

  return (
    <div
      className={className(baseClasses, variantClasses[variant], customClassName)}
      style={style}
    />
  )
}
