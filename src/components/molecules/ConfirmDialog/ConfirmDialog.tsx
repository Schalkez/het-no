import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import type { ConfirmDialogProps } from './ConfirmDialog.types'

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}: ConfirmDialogProps) {
  const { t } = useTranslation()
  const finalConfirmText = confirmText || t('confirm.default_confirm')
  const finalCancelText = cancelText || t('confirm.default_cancel')

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" showCloseButton={false}>
      <div className="py-1">
        {/* Title */}
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Actions - Right aligned like Google */}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} size="sm">
            {finalCancelText}
          </Button>
          <Button variant="danger" onClick={handleConfirm} size="sm">
            {finalConfirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
