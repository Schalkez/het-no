import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { GroupCard } from '@/components/molecules/GroupCard'
import type { DashboardProps } from './Dashboard.types'

export function Dashboard({ groups, isLoading, onCreateGroup, onSelectGroup }: DashboardProps) {
  const { t } = useTranslation()

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#111421] font-sans text-text-main flex flex-col">
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 pt-24 pb-12">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="min-w-[200px]">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight h-9 flex items-center">
              {t('dashboard.title', 'Nhóm của bạn')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 h-5 flex items-center">
              {t('dashboard.subtitle', 'Quản lý và theo dõi các khoản chi tiêu')}
            </p>
          </div>
          <Button
            variant="neo"
            onClick={onCreateGroup}
            className="min-w-[160px] h-[46px]"
            icon={<span className="material-symbols-outlined">add</span>}
          >
            {t('dashboard.create_group', 'Tạo nhóm mới')}
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1a1d2d] rounded-3xl p-6 border-2 border-transparent shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <Skeleton className="w-16 h-6 rounded-lg" />
                </div>
                <Skeleton className="w-3/4 h-7 rounded-lg mb-2" />
                <Skeleton className="w-1/2 h-4 rounded-lg mb-6" />
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <Skeleton className="w-20 h-3 rounded-md" />
                    <Skeleton className="w-32 h-6 rounded-md" />
                  </div>
                  <Skeleton className="w-16 h-3 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : groups.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mb-6 rotate-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="material-symbols-outlined text-4xl text-blue-600">group_add</span>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {t('dashboard.empty_title', 'Chưa có nhóm nào')}
            </h3>
            <p className="text-gray-500 max-w-md mb-8">
              {t(
                'dashboard.empty_desc',
                'Tạo nhóm đầu tiên để bắt đầu chia tiền với bạn bè, đồng nghiệp hoặc gia đình.'
              )}
            </p>
            <Button variant="neo" onClick={onCreateGroup}>
              {t('dashboard.create_first', 'Tạo nhóm ngay')}
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <GroupCard
                key={group.id}
                group={group}
                actions={group.actions || []}
                index={index}
                variants={cardVariants}
                onClick={() => onSelectGroup(group.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
