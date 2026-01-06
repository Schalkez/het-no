import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { useCreateGroup } from '@/hooks/useGroups'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGroupSchema } from '@/lib/schemas/group'
import { z } from 'zod'

type CreateGroupForm = z.infer<typeof createGroupSchema>

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateGroupModal({ isOpen, onClose, onSuccess }: CreateGroupModalProps) {
  const { t } = useTranslation()
  const { mutate: createGroup, isPending, invalidateGroups } = useCreateGroup()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<CreateGroupForm>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateGroupForm) => {
    createGroup(
      { name: data.name },
      {
        onSuccess: () => {
          invalidateGroups()
          handleClose()
          onSuccess()
        },
        onError: (err) => {
          console.error('Create group failed:', err)
          setError('name', {
            message: err instanceof Error ? err.message : t('groups.create_error'),
          })
        },
      }
    )
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('groups.create_title')}
      description={t('groups.create_desc')}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label={t('groups.name_label')}
          placeholder={t('groups.name_placeholder')}
          {...register('name')}
          error={errors.name?.message}
          autoFocus
        />

        <div className="flex gap-3">
          <Button
            fullWidth
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isPending}
          >
            {t('common.cancel')}
          </Button>
          <Button fullWidth type="submit" variant="neo" loading={isPending}>
            {t('groups.create_btn')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
