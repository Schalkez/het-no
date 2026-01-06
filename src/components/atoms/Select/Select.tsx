import { useState } from 'react'
import { className as cn } from '@/lib/utils/className'
import type { SelectProps, SelectOption } from './Select.types'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  size,
} from '@floating-ui/react'

export function Select<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className = '',
  variant = 'default',
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: variant === 'minimal' ? 'bottom-end' : 'bottom-start',
    middleware: [
      offset(6),
      flip({ padding: 10 }),
      shift({ padding: 10 }),
      variant === 'default' &&
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
    ].filter(Boolean),
    whileElementsMounted: autoUpdate,
  })

  // Interactions
  const click = useClick(context, { enabled: !disabled })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'listbox' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (option: SelectOption<T>) => {
    onChange(option.value)
    setIsOpen(false)
  }

  const baseButtonClasses = cn(
    'flex items-center gap-2 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    variant === 'minimal'
      ? 'px-2.5 h-8 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 active:bg-gray-200 dark:active:bg-gray-700'
      : 'w-full justify-between px-3.5 h-[44px] rounded-lg bg-white dark:bg-[#1a1d2d] border-2 border-slate-200 dark:border-gray-800 text-sm font-bold text-gray-700 dark:text-gray-200 hover:border-black dark:hover:border-primary',
    isOpen && variant === 'default' && 'border-black ring-4 ring-primary/10',
    className
  )

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        className={baseButtonClasses}
        {...getReferenceProps()}
      >
        <span className="whitespace-nowrap">{selectedOption?.label || placeholder}</span>
        <div
          className={cn(
            'flex items-center justify-center transition-transform duration-300 shrink-0',
            variant === 'minimal' ? 'w-4 h-4' : 'w-5 h-5',
            isOpen ? 'rotate-180' : ''
          )}
        >
          <span
            className={cn(
              'material-symbols-outlined text-gray-400',
              variant === 'minimal' ? 'text-[18px]' : 'text-[22px]'
            )}
          >
            expand_more
          </span>
        </div>
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cn(
                'z-[9999] bg-white dark:bg-[#1a1d2d] border-2 border-black dark:border-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden',
                variant === 'minimal' ? 'min-w-[150px]' : '' // Minimal has default min-width
              )}
              {...getFloatingProps()}
            >
              <div className="p-1 flex flex-col gap-0.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-bold text-left transition-all group cursor-pointer border-none',
                      option.value === value
                        ? 'bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-soft'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <span className="whitespace-nowrap">{option.label}</span>
                    <div
                      className={cn(
                        'w-5 h-5 flex items-center justify-center shrink-0 transition-opacity',
                        option.value === value ? 'opacity-100' : 'opacity-0'
                      )}
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
