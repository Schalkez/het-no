import { GroupDetailType } from '../types'
import { useTranslation } from 'react-i18next'

interface GroupHeaderProps {
  group: GroupDetailType
}

export function GroupHeader({ group }: GroupHeaderProps) {
  const { t } = useTranslation()
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{group.name}</h1>
      <div className="flex items-center text-sm text-gray-500 gap-4">
        <span>
          {t('group_detail.role')}:{' '}
          <span className="font-medium capitalize">{group.currentUserRole}</span>
        </span>
        <span>•</span>
        <span>
          {t('group_detail.created')}: {new Date(group.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
