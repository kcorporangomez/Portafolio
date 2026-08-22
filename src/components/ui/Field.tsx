import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'

export interface FieldOption {
  value: string
  label: string
}

interface FieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  as?: 'input' | 'textarea' | 'select'
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  tooltip?: string
  maxLength?: number
  required?: boolean
  labelClassName?: string
  options?: FieldOption[]
  placeholder?: string
}

export function Field({
  id,
  label,
  type = 'text',
  as = 'input',
  value,
  onChange,
  invalid,
  tooltip,
  maxLength,
  required,
  labelClassName = 'text-teal',
  options,
  placeholder,
}: FieldProps) {
  const baseClasses = cn(
    'w-full rounded-field border bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors',
    invalid ? 'border-danger' : 'border-ink/15 focus:border-green',
  )

  return (
    <div className="relative">
      <label htmlFor={id} className={cn('mb-1.5 block text-sm font-semibold', labelClassName)}>
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          required={required}
          rows={5}
          className={cn(baseClasses, 'resize-none')}
        />
      ) : as === 'select' ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={cn(
              baseClasses,
              'h-[50px] appearance-none truncate whitespace-nowrap pr-10 leading-[1.5]',
              !value && 'text-muted',
            )}
          >
            <option value="" disabled>
              {placeholder ?? 'Selecciona una opción'}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="text-ink">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          required={required}
          className={baseClasses}
        />
      )}

      <AnimatePresence>
        {invalid && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="alert"
            className="absolute left-0 top-full z-10 mt-1.5 rounded-field bg-danger px-3 py-1.5 text-xs font-medium text-white shadow-tile"
          >
            {tooltip}
            <span className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-danger" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
