import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const addPersonSchema = z.object({
  names: z.string().trim().min(1, 'Tên không được để trống'),
})

type AddPersonForm = z.infer<typeof addPersonSchema>

interface AddPersonModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (names: string[]) => void
  existingPeople: Array<{ id: string; name: string }>
}

export function AddPersonModal({ isOpen, onClose, onSubmit, existingPeople }: AddPersonModalProps) {
  const { t } = useTranslation()
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<AddPersonForm>({
    resolver: zodResolver(addPersonSchema),
    defaultValues: {
      names: '',
    },
  })

  const onSubmitForm = async (data: AddPersonForm) => {
    setIsPending(true)
    try {
      const names = (data.names || '')
        .trim()
        .split(',')
        .map((n) => (n || '').trim())
        .filter((n) => n.length > 0)

      if (names.length === 0) {
        setError('names', { message: t('people.name_placeholder') })
        return
      }

      const uniqueNames = new Set(names.map((n) => n.toLowerCase()))
      if (uniqueNames.size !== names.length) {
        setError('names', { message: 'Không được nhập tên trùng lặp' })
        return
      }

      const existingNamesLower = new Set(existingPeople.map((p) => p.name.toLowerCase()))
      const duplicates = names.filter((n) => existingNamesLower.has(n.toLowerCase()))

      if (duplicates.length > 0) {
        setError('names', { message: `Thành viên đã tồn tại: ${duplicates.join(', ')}` })
        return
      }

      onSubmit(names)
      handleClose()
    } finally {
      setIsPending(false)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('people.add_title')}
      description={t('people.add_desc')}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <Input
          label={t('people.name_label')}
          placeholder={t('people.name_placeholder')}
          {...register('names')}
          error={errors.names?.message}
          autoFocus
        />

        <Button fullWidth type="submit" variant="neo" loading={isPending}>
          {t('people.add_btn')}
        </Button>
      </form>
    </Modal>
  )
}
