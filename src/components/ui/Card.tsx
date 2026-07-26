import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

interface CardProps {
  icon: string
  children: ReactNode
  className?: string
}

export function Card({ icon, children, className }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-card-lift)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('group rounded-card bg-white p-6 shadow-card md:p-7', className)}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="mb-5 h-11 w-11 transition-transform duration-500 group-hover:-rotate-6"
      />
      <p className="text-sm leading-relaxed text-muted-soft md:text-base">{children}</p>
    </motion.div>
  )
}
