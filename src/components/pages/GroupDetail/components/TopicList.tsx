import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms/Button'
import { Topic } from '../types'
import { useDeleteTopic } from '@/hooks/useGroups'
import { TopicCard } from './TopicCard'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog/ConfirmDialog'
import { useState } from 'react'

interface TopicListProps {
  topics: Topic[]
  groupId: string
  onCreateTopic: () => void
  onEditTopic: (topic: Topic) => void
  canDelete?: boolean
}

export function TopicList({
  topics,
  groupId,
  onCreateTopic,
  onEditTopic,
  canDelete,
}: TopicListProps) {
  const { t } = useTranslation()
  const { mutate: deleteTopic, isPending } = useDeleteTopic(groupId)

  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null)

  const handleConfirmDelete = () => {
    if (!topicToDelete) return

    deleteTopic(
      { topicId: topicToDelete.id },
      {
        onSuccess: () => {
          toast.success(`Đã xóa "${topicToDelete.name}"`)
          setTopicToDelete(null)
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Không thể xóa topic')
        },
      }
    )
  }

  const handleDeleteClick = (topic: Topic) => {
    setTopicToDelete(topic)
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black border-l-4 border-black pl-3">
          {t('group_detail.topics.title')}
        </h2>
        <Button
          variant="neo"
          onClick={onCreateTopic}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
        >
          {t('group_detail.topics.new_btn')}
        </Button>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 font-bold text-lg mb-2">
            {t('group_detail.topics.empty_title')}
          </p>
          <p className="text-sm text-gray-400">{t('group_detail.topics.empty_desc')}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              groupId={groupId}
              canDelete={!!canDelete}
              onRename={onEditTopic}
              onDelete={handleDeleteClick}
              isPending={isPending}
            />
          ))}
        </div>
      )}

      {topicToDelete && (
        <ConfirmDialog
          isOpen={!!topicToDelete}
          onClose={() => setTopicToDelete(null)}
          onConfirm={handleConfirmDelete}
          title={t('common.confirm_delete')}
          description={`Bạn có chắc muốn xóa "${topicToDelete.name}"? Tất cả khoản chi trong topic này sẽ bị xóa.`}
          confirmText={t('common.delete')}
          cancelText={t('common.cancel')}
        />
      )}
    </div>
  )
}
