import { memo } from 'react'

interface ServiceInfoHeaderProps {
  title: string
  description: string
}

export const ServiceInfoHeader = memo(({ title, description }: ServiceInfoHeaderProps) => {
  return (
    <header>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </header>
  )
})
