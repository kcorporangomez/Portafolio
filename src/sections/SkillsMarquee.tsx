import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import { SKILLS, type Skill } from '@/data/skills'
import { wrap } from '@/lib/wrap'

const AUTO_SPEED = 40 // px/s
const DECAY_PER_FRAME = 0.94
const VELOCITY_STOP_THRESHOLD = 0.01
const FRAME_MS = 1000 / 60

export function SkillsMarquee() {
  const prefersReducedMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const halfWidth = useRef(0)
  const velocity = useRef(0)
  const dragging = useRef(false)
  const lastPointerX = useRef(0)
  const lastPointerTime = useRef(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      halfWidth.current = el.scrollWidth / 2
    }
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || !halfWidth.current || dragging.current) return

    if (Math.abs(velocity.current) > VELOCITY_STOP_THRESHOLD) {
      x.set(wrap(x.get() + velocity.current * delta, halfWidth.current))
      velocity.current *= Math.pow(DECAY_PER_FRAME, delta / FRAME_MS)
    } else {
      velocity.current = 0
      x.set(wrap(x.get() - (AUTO_SPEED * delta) / 1000, halfWidth.current))
    }
  })

  if (prefersReducedMotion) {
    return (
      <div className="overflow-x-auto pb-2">
        <div className="flex w-max gap-[clamp(1rem,2.5vw,2.2rem)] px-6">
          {SKILLS.map((skill) => (
            <SkillTile key={skill.label} skill={skill} />
          ))}
        </div>
      </div>
    )
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true
    velocity.current = 0
    lastPointerX.current = e.clientX
    lastPointerTime.current = performance.now()
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.style.cursor = 'grabbing'
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const now = performance.now()
    const dt = now - lastPointerTime.current
    const dx = e.clientX - lastPointerX.current
    if (dt > 0) velocity.current = dx / dt
    x.set(wrap(x.get() + dx, halfWidth.current))
    lastPointerX.current = e.clientX
    lastPointerTime.current = now
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false
    e.currentTarget.style.cursor = 'grab'
  }

  return (
    <div
      className="marquee-mask relative cursor-grab overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max select-none gap-[clamp(1rem,2.5vw,2.2rem)] will-change-transform"
      >
        {[...SKILLS, ...SKILLS].map((skill, i) => (
          <SkillTile key={`${skill.label}-${i}`} skill={skill} ariaHidden={i >= SKILLS.length} />
        ))}
      </motion.div>
    </div>
  )
}

function SkillTile({ skill, ariaHidden }: { skill: Skill; ariaHidden?: boolean }) {
  return (
    <motion.div
      aria-hidden={ariaHidden}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-card bg-white px-4 py-5 shadow-tile md:w-28"
    >
      <img
        src={skill.icon}
        alt={ariaHidden ? '' : skill.alt}
        draggable={false}
        className="h-9 w-9 object-contain grayscale transition-all duration-300 hover:grayscale-0"
      />
      <span className="text-[10px] font-semibold tracking-wide text-muted">{skill.label}</span>
    </motion.div>
  )
}
