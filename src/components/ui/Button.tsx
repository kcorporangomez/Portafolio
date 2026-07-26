import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/cn'

type Variant = 'solid' | 'ghost'

const base =
  'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-7 py-3.5 text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  solid: 'bg-teal text-white shadow-cta',
  ghost: 'bg-transparent text-teal border border-teal/20 hover:border-teal/40',
}

const hoverShadow: Record<Variant, string> = {
  solid: 'var(--shadow-cta-hover)',
  ghost: 'none',
}

const springTap = { type: 'spring', stiffness: 400, damping: 28 } as const

type ButtonProps = { variant?: Variant; className?: string } & HTMLMotionProps<'button'>
type ButtonLinkProps = { variant?: Variant; className?: string } & HTMLMotionProps<'a'>

export function Button({ variant = 'solid', className, ...props }: ButtonProps) {
  return (
    <motion.button
      className={cn(base, variants[variant], className)}
      whileHover={{ y: -2, boxShadow: hoverShadow[variant] }}
      whileTap={{ scale: 0.97 }}
      transition={springTap}
      {...props}
    />
  )
}

export function ButtonLink({ variant = 'solid', className, ...props }: ButtonLinkProps) {
  return (
    <motion.a
      className={cn(base, variants[variant], className)}
      whileHover={{ y: -2, boxShadow: hoverShadow[variant] }}
      whileTap={{ scale: 0.97 }}
      transition={springTap}
      {...props}
    />
  )
}
