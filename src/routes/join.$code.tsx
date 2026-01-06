import { useNavigate, createFileRoute } from '@tanstack/react-router'
import { getGroupInfoByInviteCode } from '@/server/groups'
import { Button } from '@/components/atoms/Button'
import { useJoinGroup } from '@/hooks/useGroups'
import { toast } from 'sonner'

export const Route = createFileRoute('/join/$code')({
  loader: ({ params }) => getGroupInfoByInviteCode({ data: { code: params.code } }),
  component: JoinGroupPage,
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] }
    return {
      meta: [
        { title: `Tham gia ${loaderData.name} | Chia Tiền` },
        { property: 'og:title', content: `Tham gia nhóm "${loaderData.name}"` },
        { property: 'og:description', content: `Nhóm đang có ${loaderData.memberCount} thành viên. Bấm để tham gia ngay!` },
        { property: 'og:image', content: 'https://chiatien.app/og-image.png' }, // TODO: Add real OG image
        { name: 'twitter:card', content: 'summary' },
      ],
    }
  },
})

function JoinGroupPage() {
  const { code } = Route.useParams()
  const navigate = useNavigate()
  const { mutate: joinGroup, isPending: isJoining } = useJoinGroup()

  const groupInfo = Route.useLoaderData()

  const handleJoin = () => {
    joinGroup(
      { code },
      {
        onSuccess: (result) => {
          toast.success('Joined group successfully!')
          navigate({ to: '/groups/$groupId', params: { groupId: result.groupId } })
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Failed to join group')
        },
      }
    )
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#ff90e8] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-black mb-2">Join Group</h1>

        <div className="my-6 p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <h2 className="text-xl font-bold text-[#627bea] mb-1">{groupInfo?.name}</h2>
          <p className="text-sm text-gray-500 font-bold">
            {groupInfo?.memberCount} members • Created{' '}
            {groupInfo?.createdAt ? new Date(groupInfo.createdAt).toLocaleDateString() : 'Unknown'}
          </p>
        </div>

        <p className="text-gray-600 mb-8 font-medium">
          You are about to join this group as a member.
        </p>


        <Button fullWidth variant="neo" loading={isJoining} onClick={handleJoin} size="lg">
          Accept Invite & Join
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/dashboard' })}
          className="mt-4 w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
