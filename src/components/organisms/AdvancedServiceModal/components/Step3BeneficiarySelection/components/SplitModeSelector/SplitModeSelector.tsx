import { memo } from 'react'
import type { SplitMode } from '@/stores/local/guest'
import { SplitModeButton } from './components/SplitModeButton'

interface SplitModeSelectorProps {
  currentMode: SplitMode
  onModeChange: (mode: SplitMode) => void
}

const MODES: SplitMode[] = ['equal', 'quantity', 'percentage']

export const SplitModeSelector = memo(({ currentMode, onModeChange }: SplitModeSelectorProps) => {
  return (
    <div className="flex gap-2">
      {MODES.map((mode) => (
        <SplitModeButton
          key={mode}
          mode={mode}
          isActive={currentMode === mode}
          onClick={() => onModeChange(mode)}
        />
      ))}
    </div>
  )
})
