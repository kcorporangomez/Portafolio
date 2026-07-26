import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE_IN_QUAD, EASE_OUT_QUAD } from '@/lib/motion'

const GREETINGS = ['Hey', 'Hello', 'Hola'] as const
const ROTATE_INTERVAL_MS = 2200
const FIRST_SWAP_DELAY_MS = 1400

export function RotatingGreeting() {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      setIndex((i) => (i + 1) % GREETINGS.length)
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % GREETINGS.length)
      }, ROTATE_INTERVAL_MS)
    }, FIRST_SWAP_DELAY_MS)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return (
      <span className="inline-block text-green-deep" aria-hidden="true">
        Hola.
      </span>
    )
  }

  return (
    <span className="inline-block w-[3em] align-baseline text-green-deep md:w-[2.8em]" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: EASE_OUT_QUAD } }}
          exit={{ y: -12, opacity: 0, transition: { duration: 0.3, ease: EASE_IN_QUAD } }}
        >
          {GREETINGS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
