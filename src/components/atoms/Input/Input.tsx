import type { InputProps } from './Input.types'
import CurrencyInput from 'react-currency-input-field'
import { useId, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      type = 'text',
      disabled = false,
      error,
      icon,
      prefix,
      suffix,
      autoFocus,
      selectOnFocus = false,
      className = '',
      id,
      name,
      onKeyDown,
      onBlur,
      currency = false,
      min,
      max,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? name ?? generatedId

    const hasError = Boolean(error)
    const hasIcon = Boolean(icon)
    const hasPrefix = Boolean(prefix)
    const hasSuffix = Boolean(suffix)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((currency || type === 'number') && e.key === '-') {
        e.preventDefault()
      }
      onKeyDown?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (selectOnFocus) {
        e.target.select()
      }
    }

    // Handle standard input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // If it looks like a synthetic event (for RHF)
        if (e.target && e.target.type !== undefined) {
          ;(onChange as React.ChangeEventHandler<HTMLInputElement>)(e)
        } else {
          // Fallback for manual value handlers
          ;(onChange as (val: string) => void)(e.target.value)
        }
      }
    }

    const inputClasses = [
      'block w-full rounded-md border-0 py-3 text-gray-900 dark:text-white',
      'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-400 dark:hover:ring-gray-500',
      'placeholder:text-gray-400',
      'focus:ring-2 focus:ring-inset focus:ring-[#627bea] dark:focus:ring-[#627bea]',
      hasError ? 'ring-red-300 focus:ring-red-500 !text-red-900' : '',
      'dark:bg-gray-800',
      'text-base sm:text-sm sm:leading-6',
      'transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      hasIcon ? 'pl-10' : hasPrefix ? 'pl-10' : 'pl-4',
      hasSuffix ? 'pr-16' : 'pr-4',
      type === 'number' || currency ? 'font-medium' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-0.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {hasIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}

          {hasPrefix && !hasIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm font-medium">
                {prefix}
              </span>
            </div>
          )}

          {currency ? (
            <CurrencyInput
              id={inputId}
              name={name}
              placeholder={placeholder || ''}
              value={value ?? ''}
              onValueChange={(val) => {
                if (onChange) {
                  // CurrencyInput always expects a value-based handler
                  // but we try to be safe
                  if (typeof onChange === 'function') {
                    ;(onChange as (val: string) => void)(val || '')
                  }
                }
              }}
              onFocus={handleFocus}
              onBlur={onBlur}
              disabled={disabled}
              autoFocus={autoFocus}
              onKeyDown={handleKeyDown}
              className={inputClasses}
              decimalsLimit={0}
              groupSeparator="."
              decimalSeparator=","
              allowNegativeValue={false}
            />
          ) : (
            <input
              {...rest}
              ref={ref}
              type={type}
              id={inputId}
              name={name}
              placeholder={placeholder}
              // CRITICAL: Only provide value if it's explicitly passed.
              // This allows the input to remain uncontrolled when used with RHF register().
              {...(value !== undefined ? { value } : {})}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={onBlur}
              disabled={disabled}
              autoFocus={autoFocus}
              onKeyDown={handleKeyDown}
              min={min}
              max={max}
              className={inputClasses}
            />
          )}

          {hasSuffix && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm font-medium">
                {suffix}
              </span>
            </div>
          )}
        </div>

        {hasError && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
