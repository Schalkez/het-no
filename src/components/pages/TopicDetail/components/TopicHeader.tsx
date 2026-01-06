import { Link } from '@tanstack/react-router'
import { Button } from '@/components/atoms/Button'
import { ReactNode } from 'react'

interface TopicHeaderProps {
  topic: { id: string; name: string }
  groupId: string
  children?: ReactNode
}

export function TopicHeader({ topic, groupId, children }: TopicHeaderProps) {
  return (
    <header className="h-[72px] flex-none glass-header flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <Link to="/groups/$groupId" params={{ groupId }} className="no-underline">
          <Button
            variant="ghost"
            size="sm"
            className="!px-2 text-gray-600"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            }
          >
            Back
          </Button>
        </Link>
        <div className="h-8 w-0.5 bg-black/10 mx-1"></div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black tracking-tight">{topic.name}</h1>
          <span className="bg-[#A3E635] text-black text-xs font-bold px-2 py-0.5 rounded border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ACTIVE
          </span>
        </div>
        {children}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="neo-secondary"
          size="sm"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          }
        >
          Share
        </Button>
      </div>
    </header>
  )
}
