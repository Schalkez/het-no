import { Input } from '@/components/atoms/Input'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import type { ExpenseSchema } from '@/lib/schemas/expense'

interface ServiceNameInputProps {
  autoFocus?: boolean
}

export const ServiceNameInput = memo(({ autoFocus }: ServiceNameInputProps) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext<ExpenseSchema>()

  return (
    <Input
      label={t('modal.service_name')}
      {...register('name')}
      error={errors.name?.message}
      placeholder={t('modal.service_name_placeholder')}
      className="py-3 text-base"
      icon={<span className="material-symbols-outlined text-gray-400">description</span>}
      autoFocus={!!autoFocus}
    />
  )
})
