import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { GuestPerson } from '@/stores/local/guest'
import { useState, useEffect } from 'react'

const editPersonSchema = z.object({
  name: z.string().trim().min(1, 'Tên không được để trống'),
})

type EditPersonForm = z.infer<typeof editPersonSchema>

interface EditPersonModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, name: string) => void
  person: GuestPerson | null
}

export function EditPersonModal({ isOpen, onClose, onSave, person }: EditPersonModalProps) {
  const { t } = useTranslation()
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPersonForm>({
    resolver: zodResolver(editPersonSchema),
    defaultValues: {
      name: person?.name ?? '',
    },
  })

  // Update form when person changes
  useEffect(() => {
    if (person) {
      reset({ name: person.name })
    }
  }, [person, reset])

  const onSubmit = async (data: EditPersonForm) => {
    if (!person) return

    setIsPending(true)
    try {
      onSave(person.id, data.name.trim())
      onClose()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('people.edit_title')} maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label={t('people.name_display')}
          {...register('name')}
          error={errors.name?.message}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="neo" type="submit" loading={isPending}>
            {t('common.save')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
