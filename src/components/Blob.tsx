import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface BlobProps {
  src: string
  className?: string
  parallax?: number
  rotate?: number
}

export function Blob({ src, className, parallax = 0, rotate = 0 }: BlobProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const parallaxEnabled = parallax > 0 && isDesktop && !prefersReducedMotion
  const rotateEnabled = rotate > 0 && isDesktop && !prefersReducedMotion

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ySpring = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  const y = useTransform(ySpring, [0, 1], parallaxEnabled ? [parallax, -parallax] : [0, 0])
  const rotateValue = useTransform(ySpring, [0, 1], rotateEnabled ? [-rotate, rotate] : [0, 0])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ y, rotate: rotateValue, pointerEvents: 'none', willChange: 'transform' }}
    >
      <img src={src} alt="" className="h-full w-full select-none object-contain" draggable={false} />
    </motion.div>
  )
}
