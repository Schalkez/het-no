import { motion } from 'framer-motion'
import { ActionMenu } from '@/components/atoms/ActionMenu'
import { GroupCardProps } from './GroupCard.types'

export function GroupCard({ group, onClick, variants, index = 0, actions }: GroupCardProps) {

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#1a1d2d] rounded-3xl p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full"
    >
      {/* Header: Badge & Action Menu */}
      <div className="flex justify-between items-start mb-3">
        <div className="px-3 py-1 rounded-full border-2 border-black text-xs font-bold bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {group.role === 'owner' ? '👑 Owner' : 'User'}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          {actions && actions.length > 0 && <ActionMenu items={actions} />}
        </div>
      </div>

      {/* Body: Name & Members */}
      <div className="flex-1 mb-4">
        <h3
          className="text-2xl font-black mb-2 line-clamp-2 break-words leading-tight pr-2"
          title={group.name}
        >
          {group.name}
        </h3>
        <p className="text-sm font-bold text-gray-500 mb-6 flex items-center gap-1.5">
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {group.memberCount} thành viên
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-200 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-1">
            Tổng chi tiêu
          </p>
          <p className="text-lg font-black text-gray-900 dark:text-gray-100">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: group.currency,
            }).format(group.totalAmount)}
          </p>
        </div>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
          {group.lastActive}
        </span>
      </div>
    </motion.div>
  )
}
