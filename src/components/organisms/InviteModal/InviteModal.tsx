import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Select } from '@/components/atoms/Select'
import { InviteQRCode } from '@/components/atoms/InviteQRCode'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useRegenerateInviteCode } from '@/hooks/useGroups'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

import type { InviteModalProps } from './InviteModal.types'

export function InviteModal({
  isOpen,
  onClose,
  inviteCode,
  inviteCodeExpiresAt,
  groupId,
  canRegenerate,
}: InviteModalProps) {
  const {  } = useTranslation()
  const [selectedExpiry, setSelectedExpiry] = useState<number>(0)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const { mutate: regenerate, isPending } = useRegenerateInviteCode(groupId)

  const inviteLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/join/${inviteCode}`
  const isExpired = inviteCodeExpiresAt && new Date(inviteCodeExpiresAt) < new Date()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const expiryText =
    selectedExpiry === 0
      ? 'không giới hạn'
      : selectedExpiry === 1
        ? '1 ngày'
        : `${selectedExpiry} ngày`

  const handleRegenerateClick = () => {
    setIsConfirmOpen(true)
  }

  const handleConfirmRegenerate = () => {
    regenerate(
      selectedExpiry === 0 ? undefined : { expiryDays: selectedExpiry },
      {
        onSuccess: () => {
          toast.success('Đã làm mới mã mời thành công!')
          setSelectedExpiry(0) // Reset selection
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Không thể làm mới mã mời')
        },
      }
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mời thành viên"
      description="Chia sẻ link hoặc mã QR để mời bạn bè tham gia nhóm."
      maxWidth="md"
    >
      <div className="flex flex-col gap-6 py-2">
        {inviteCode ? (
          <div className="flex justify-center">
            <InviteQRCode inviteLink={inviteLink} size={180} />
          </div>
        ) : (
          <div className="py-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4 text-gray-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                <line x1="8" y1="8" x2="16" y2="16" stroke="red" opacity="0.5" />
              </svg>
            </div>
            <p className="text-gray-600 font-bold">
              {canRegenerate ? 'Nhóm chưa có link mời' : 'Nhóm chưa có link mời. Vui lòng liên hệ trưởng nhóm.'}
            </p>
            {canRegenerate && <p className="text-sm text-gray-500 mt-1">Tạo link mời mới ở bên dưới</p>}
          </div>
        )}

        <div className="space-y-4">
          {inviteCode && (
            <>
              {/* Link Input & Copy */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-1">
              Link mời
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={inviteLink}
                  readOnly
                  className="bg-gray-50 font-mono text-sm"
                />
              </div>
              <Button
                variant={isCopied ? 'neo' : 'neo-secondary'}
                onClick={handleCopyLink}
                className={`transition-all duration-200 min-w-[120px] ${isCopied ? '!bg-green-400 !border-green-900 !text-black' : ''}`}
                icon={
                  isCopied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )
                }
              >
                {isCopied ? 'Đã copy' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Expiry Status */}
          <div className="flex items-center justify-center text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
            {isExpired ? (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                Link đã hết hạn!
              </span>
            ) : inviteCodeExpiresAt ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Hết hạn{' '}
                {formatDistanceToNow(new Date(inviteCodeExpiresAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            ) : (
              <span className="text-green-600 font-medium flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
                Link không giới hạn
              </span>
            )}
          </div>

            </>
          )}

          {/* Regenerate Controls */}
          {canRegenerate && (
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{inviteCode ? 'Làm mới link mời' : 'Tạo link mời'}</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select
                    options={[
                      { value: '0', label: 'Không giới hạn' },
                      { value: '1', label: '1 ngày' },
                      { value: '7', label: '7 ngày' },
                      { value: '30', label: '30 ngày' },
                    ]}
                    value={String(selectedExpiry)}
                    onChange={(val) => setSelectedExpiry(Number(val))}
                  />
                </div>
                <Button
                  variant="ghost"
                  onClick={handleRegenerateClick}
                  loading={isPending}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M16 16h5v5" />
                    </svg>
                  }
                >
                  {inviteCode ? 'Làm mới' : 'Tạo link'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRegenerate}
        title="Làm mới link mời"
        description={`Làm mới link mời (${expiryText}) sẽ khiến link cũ không còn tác dụng. Bạn có chắc chắn?`}
        confirmText={inviteCode ? 'Làm mới' : 'Tạo link'}
        variant={inviteCode ? 'danger' : 'info'}
      />
    </Modal>
  )
}
