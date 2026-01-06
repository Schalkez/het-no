import { Link } from '@tanstack/react-router'
import { useGroupDetails } from '@/hooks/useGroups'
import { useState } from 'react'
import { TopicModal } from '@/components/organisms/TopicModal/TopicModal'
import { Topic } from '@/components/pages/GroupDetail/types'
import { GroupHeader } from './components/GroupHeader'
import { GroupTabs, TabType } from './components/GroupTabs'
import { TopicList } from './components/TopicList'
import { MemberList } from './components/MemberList'
import { GroupSettings } from './components/GroupSettings'
import { GroupDetailType } from './types'
import { ROLE_TYPES } from '@/lib/constants'

interface GroupDetailProps {
  groupId: string
}

export function GroupDetail({ groupId }: GroupDetailProps) {
  const { data: group, isLoading, error } = useGroupDetails(groupId)
  const [activeTab, setActiveTab] = useState<TabType>('topics')
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false)
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null)

  const openCreateModal = () => {
    setEditingTopic(null)
    setIsTopicModalOpen(true)
  }

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic)
    setIsTopicModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500 font-medium">Loading group details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Error: {error.message}
      </div>
    )
  }

  if (!group) {
    return <div className="flex items-center justify-center p-8 text-gray-500">Group not found</div>
  }

  const typedGroup = group as unknown as GroupDetailType

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <nav className="flex items-center text-sm text-gray-500 mb-6 font-medium">
        <Link
          to="/dashboard"
          className="hover:text-black hover:underline px-1 rounded transition-colors flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Dashboard
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-black truncate max-w-[200px] border-b-2 border-transparent">
          {group.name}
        </span>
      </nav>

      <GroupHeader group={typedGroup} />

      <GroupTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === 'topics' && (
          <TopicList
            topics={typedGroup.topics}
            groupId={groupId}
            onCreateTopic={openCreateModal}
            onEditTopic={openEditModal}
            canDelete={typedGroup.currentUserRole === ROLE_TYPES.OWNER}
          />
        )}

        {activeTab === 'members' && (
          <MemberList
            members={typedGroup.members}
            inviteCode={typedGroup.inviteCode}
            inviteCodeExpiresAt={typedGroup.inviteCodeExpiresAt}
            groupId={groupId}
            canRegenerate={typedGroup.currentUserRole === ROLE_TYPES.OWNER}
          />
        )}

        {activeTab === 'settings' && <GroupSettings group={typedGroup} />}
      </div>

      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        groupId={groupId}
        topicToEdit={editingTopic}
      />
    </div>
  )
}
