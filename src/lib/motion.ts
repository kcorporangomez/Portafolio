import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const
export const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const
export const EASE_IN_QUAD = [0.55, 0.085, 0.68, 0.53] as const

export const viewportOnce = { once: true, amount: 0.25, margin: '-10% 0px -10% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}
