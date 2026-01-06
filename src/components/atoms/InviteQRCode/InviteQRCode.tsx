import { QRCodeSVG } from 'qrcode.react'
import type { InviteQRCodeProps } from './InviteQRCode.types'

export function InviteQRCode({ inviteLink, size = 160 }: InviteQRCodeProps) {
  return (
    <div className="bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <QRCodeSVG
        value={inviteLink}
        size={size}
        level="M"
        marginSize={2}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <p className="text-center text-xs font-bold text-gray-500 mt-2">Quét để tham gia</p>
    </div>
  )
}
