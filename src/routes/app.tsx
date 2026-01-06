import { createFileRoute } from '@tanstack/react-router'
import { GuestCalculator } from '@/components/pages/GuestCalculator'

export const Route = createFileRoute('/app')({
  ssr: false,
  component: GuestCalculator,
})
