import { createFileRoute } from '@tanstack/react-router'
import { TopicDetail } from '@/components/pages/TopicDetail/TopicDetail'

export const Route = createFileRoute('/_auth/groups/$groupId/topics/$topicId')({
  component: TopicDetailRoute,
})

function TopicDetailRoute() {
  const { groupId, topicId } = Route.useParams()
  return <TopicDetail groupId={groupId} topicId={topicId} />
}
