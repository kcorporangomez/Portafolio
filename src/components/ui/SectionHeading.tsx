import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { EASE, fadeUp, viewportOnce } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'left' | 'right'
  className?: string
}

export function SectionHeading({ eyebrow, title, lede, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-xl', align === 'right' ? 'text-right md:ml-auto' : 'text-left', className)}>
      {eyebrow && (
        <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal/60">
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        className="relative inline-block text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-teal"
      >
        {title}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1, transition: { duration: 0.6, ease: EASE, delay: 0.3 } }}
          viewport={viewportOnce}
          style={{ transformOrigin: align === 'right' ? 'right' : 'left' }}
          className={cn(
            'absolute -bottom-2 h-1 w-16 rounded-full bg-green',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        />
      </motion.h2>

      {lede && (
        <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-muted md:text-lg">
          {lede}
        </motion.p>
      )}
    </div>
  )
}
