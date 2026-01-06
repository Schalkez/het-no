import { createFileRoute } from '@tanstack/react-router'
import { GroupDetail } from '@/components/pages/GroupDetail/GroupDetail'

export const Route = createFileRoute('/_auth/groups/$groupId/')({
  component: GroupDetailRoute,
})

function GroupDetailRoute() {
  const { groupId } = Route.useParams()
  return <GroupDetail groupId={groupId} />
}
