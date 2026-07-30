import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { type MotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  angle: number
  speed: number
}

interface VapourTextProps {
  text: string
  /** 0 = solid text, 1 = fully dispersed into vapour */
  progress: MotionValue<number>
  className?: string
}

const TEAL_RGB = '15, 52, 67'

export const VapourText = forwardRef<HTMLSpanElement, VapourTextProps>(function VapourText(
  { text, progress, className },
  forwardedRef,
) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const sizeRef = useRef({ width: 0, height: 0 })
  const drawRef = useRef<(value: number) => void>(() => {})
  const reducedMotion = useReducedMotion()

  useImperativeHandle(forwardedRef, () => wrapperRef.current as HTMLSpanElement)

  useEffect(() => {
    if (reducedMotion) return
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const draw = (value: number) => {
      const ctx = canvas.getContext('2d')
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = sizeRef.current
      if (!ctx || !width || !height) return

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      if (value <= 0.001) return

      for (const p of particlesRef.current) {
        const dist = value * p.speed
        const x = p.x + Math.cos(p.angle) * dist
        const y = p.y - Math.abs(Math.sin(p.angle)) * dist * 1.3 - value * 26
        const alpha = Math.max(0, 1 - value * 1.15)
        if (alpha <= 0) continue
        ctx.fillStyle = `rgba(${TEAL_RGB}, ${alpha})`
        ctx.fillRect(x, y, 1.6, 1.6)
      }
    }
    drawRef.current = draw

    const buildParticles = () => {
      const rect = wrapper.getBoundingClientRect()
      const width = Math.ceil(rect.width)
      const height = Math.ceil(rect.height)
      if (!width || !height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      sizeRef.current = { width, height }
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const style = getComputedStyle(wrapper)
      const sample = document.createElement('canvas')
      sample.width = width * dpr
      sample.height = height * dpr
      const sctx = sample.getContext('2d')
      if (!sctx) return
      sctx.scale(dpr, dpr)
      sctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      sctx.textBaseline = 'middle'
      sctx.fillStyle = '#000'
      sctx.fillText(text, 0, height / 2)

      const { data } = sctx.getImageData(0, 0, width * dpr, height * dpr)
      const particles: Particle[] = []
      const step = Math.max(2, Math.round(2 * dpr))

      for (let y = 0; y < height * dpr; y += step) {
        for (let x = 0; x < width * dpr; x += step) {
          const alpha = data[(y * width * dpr + x) * 4 + 3] ?? 0
          if (alpha > 128) {
            particles.push({
              x: x / dpr,
              y: y / dpr,
              angle: Math.random() * Math.PI * 2,
              speed: 24 + Math.random() * 46,
            })
          }
        }
      }
      particlesRef.current = particles
      draw(progress.get())
    }

    buildParticles()
    const ro = new ResizeObserver(buildParticles)
    ro.observe(wrapper)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reducedMotion])

  useMotionValueEvent(progress, 'change', (value) => {
    if (reducedMotion) return
    drawRef.current(value)
    if (textRef.current) {
      textRef.current.style.opacity = String(Math.max(0, 1 - value * 3))
    }
  })

  return (
    <span ref={wrapperRef} className={`relative inline-block ${className ?? ''}`}>
      <span ref={textRef} className="inline-block">
        {text}
      </span>
      {!reducedMotion && (
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      )}
    </span>
  )
})
