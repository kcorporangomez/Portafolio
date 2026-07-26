import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface FieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  as?: 'input' | 'textarea'
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  tooltip?: string
  maxLength?: number
  required?: boolean
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
}: FieldProps) {
  const baseClasses = cn(
    'w-full rounded-field border bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors',
    invalid ? 'border-danger' : 'border-ink/15 focus:border-green',
  )

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-teal">
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
