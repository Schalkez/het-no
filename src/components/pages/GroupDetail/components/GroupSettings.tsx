import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { GroupDetailType } from '../types'
import { useTranslation } from 'react-i18next'
import { useDeleteGroup, useRenameGroup } from '@/hooks/useGroups'
import { toast } from 'sonner'
import { ROLE_TYPES } from '@/lib/constants'

interface GroupSettingsProps {
  group: GroupDetailType
}

export function GroupSettings({ group }: GroupSettingsProps) {
  const { t } = useTranslation()
  const [name, setName] = useState(group.name)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup()
  const { mutate: renameGroup, isPending: isRenaming } = useRenameGroup(group.id)

  const isOwner = group.currentUserRole === ROLE_TYPES.OWNER
  const hasNameChanged = name.trim() !== group.name

  const handleSaveName = () => {
    if (!hasNameChanged) return
    renameGroup(
      { name: name.trim() },
      {
        onSuccess: () => {
          toast.success('Đã cập nhật tên nhóm')
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Không thể cập nhật tên nhóm')
        },
      }
    )
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    deleteGroup(
      { groupId: group.id },
      {
        onSuccess: () => {
          toast.success('Đã xóa nhóm')
          setShowDeleteConfirm(false)
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Không thể xóa nhóm')
          setShowDeleteConfirm(false)
        },
      }
    )
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">{t('group_detail.settings.title')}</h2>
      <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {t('group_detail.settings.name_label')}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isOwner}
              className="flex-1 px-3 py-2 border-2 border-black rounded-lg font-medium disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {isOwner && hasNameChanged && (
              <Button variant="neo" onClick={handleSaveName} loading={isRenaming}>
                Lưu
              </Button>
            )}
          </div>
          {!isOwner && (
            <p className="text-xs text-gray-500 mt-1">Chỉ chủ nhóm mới có thể đổi tên</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Mã mời</label>
          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-mono text-sm">
            {group.inviteCode}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Số thành viên</label>
          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium">
            {group.members.length} thành viên
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="mt-8 pt-6 border-t-2 border-dashed border-red-300">
          <h3 className="text-lg font-black text-red-600 mb-3">
            {t('group_detail.settings.danger_zone')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Xóa nhóm sẽ xóa vĩnh viễn tất cả topics, khoản chi và dữ liệu liên quan. Hành động này
            không thể hoàn tác.
          </p>
          <Button variant="danger" onClick={handleDeleteClick} loading={isDeleting}>
            {t('group_detail.settings.delete_btn')}
          </Button>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa nhóm"
        description={`Bạn có chắc muốn xóa nhóm "${group.name}"? Hành động này sẽ xóa TẤT CẢ topics, khoản chi và thành viên. Không thể hoàn tác!`}
        confirmText="Xóa nhóm"
        variant="danger"
      />
    </div>
  )
}
