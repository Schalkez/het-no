import { useTranslation } from 'react-i18next'

export type TabType = 'topics' | 'members' | 'settings'

interface GroupTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function GroupTabs({ activeTab, onTabChange }: GroupTabsProps) {
  const { t } = useTranslation()
  const tabs: TabType[] = ['topics', 'members', 'settings']

  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 font-medium text-sm transition-colors relative whitespace-nowrap cursor-pointer ${
            activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t(`group_detail.tabs.${tab}`)}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  )
}
