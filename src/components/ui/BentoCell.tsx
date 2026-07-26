import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

type Tone = 'light' | 'dark' | 'accent'

interface BentoCellProps {
  children: ReactNode
  tone?: Tone
  className?: string
  hover?: boolean
  as?: 'div' | 'a'
  href?: string
  target?: string
  rel?: string
  id?: string
}

const toneClasses: Record<Tone, string> = {
  light: 'bg-white border-border text-ink',
  dark: 'bg-teal border-transparent text-white',
  accent: 'bg-green border-transparent text-teal',
}

export function BentoCell({
  children,
  tone = 'light',
  className,
  hover = false,
  as = 'div',
  href,
  target,
  rel,
  id,
}: BentoCellProps) {
  const classes = cn('rounded-2xl border p-6 md:p-8', toneClasses[tone], hover && 'cursor-pointer', className)
  const hoverProps = hover
    ? {
        whileHover: { y: -4, borderColor: 'var(--color-green)' },
        transition: { type: 'spring' as const, stiffness: 300, damping: 26 },
      }
    : {}

  if (as === 'a') {
    return (
      <motion.a variants={fadeUp} id={id} href={href} target={target} rel={rel} className={classes} {...hoverProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div variants={fadeUp} id={id} className={classes} {...hoverProps}>
      {children}
    </motion.div>
  )
}
