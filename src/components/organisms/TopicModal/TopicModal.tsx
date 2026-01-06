import { Modal } from '@/components/molecules/Modal'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { useCreateTopic, useRenameTopic } from '@/hooks/useGroups'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTopicSchema } from '@/lib/schemas/group'
import { z } from 'zod'
import { Topic } from '@/components/pages/GroupDetail/types'
import { useEffect } from 'react'

type TopicForm = z.infer<typeof createTopicSchema>

interface TopicModalProps {
  isOpen: boolean
  onClose: () => void
  groupId: string
  topicToEdit?: Topic | null
}

export function TopicModal({ isOpen, onClose, groupId, topicToEdit }: TopicModalProps) {
  const { t } = useTranslation()
  const isEditMode = !!topicToEdit

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<TopicForm>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: {
      groupId,
      name: '',
    },
  })

  // Reset form when opening/closing or changing mode
  useEffect(() => {
    if (isOpen) {
      reset({
        groupId,
        name: topicToEdit ? topicToEdit.name : '',
      })
    }
  }, [isOpen, topicToEdit, groupId, reset])

  const { mutate: createTopic, isPending: isCreatePending } = useCreateTopic(groupId)
  const { mutate: renameTopic, isPending: isRenamePending } = useRenameTopic(groupId)

  const isPending = isCreatePending || isRenamePending

  const onSubmit = (data: TopicForm) => {
    if (isEditMode && topicToEdit) {
      renameTopic(
        { topicId: topicToEdit.id, name: data.name },
        {
          onSuccess: () => handleClose(),
          onError: (err: unknown) => {
            setError('name', {
              message: (err as Error).message || 'Failed to rename topic',
            })
          },
        }
      )
    } else {
      createTopic(data, {
        onSuccess: () => handleClose(),
        onError: (err: unknown) => {
          setError('name', {
            message: (err as Error).message || t('group_detail.topics.create_modal.name_required'),
          })
        },
      })
    }
  }

  const handleClose = () => {
    reset({ groupId, name: '' })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        isEditMode
          ? 'Đổi tên Topic' // TODO: Add translation key
          : t('group_detail.topics.create_modal.title')
      }
      description={
        isEditMode
          ? 'Nhập tên mới cho topic này' // TODO: Add translation key
          : t('group_detail.topics.create_modal.desc')
      }
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label={t('group_detail.topics.create_modal.name_label')}
          placeholder={t('group_detail.topics.create_modal.name_placeholder')}
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
            {isEditMode ? 'Lưu thay đổi' : t('group_detail.topics.create_modal.submit')}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
