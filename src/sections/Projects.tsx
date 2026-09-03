import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { ProjectCard } from './ProjectCard'
import { ArrowLongRightIcon } from '@/components/icons/ArrowLongRightIcon'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateBounds = () => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 8)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateBounds()
    const el = scrollerRef.current
    if (!el) return
    const observer = new ResizeObserver(updateBounds)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section id="proyectos" className="relative scroll-mt-24 py-2">
      <div className="relative mx-auto max-w-350 px-12 sm:px-14 md:px-16">
        <button
          type="button"
          aria-label="Proyecto anterior"
          onClick={() => scrollByPage(-1)}
          disabled={!canScrollPrev}
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-teal/15 bg-white text-teal shadow-tile transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-teal/15 disabled:hover:bg-white"
        >
          <ArrowLongRightIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Siguiente proyecto"
          onClick={() => scrollByPage(1)}
          disabled={!canScrollNext}
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-teal/15 bg-white text-teal shadow-tile transition-colors duration-200 hover:border-teal/40 hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-teal/15 disabled:hover:bg-white"
        >
          <ArrowLongRightIcon className="h-5 w-5" />
        </button>

        <motion.div
          ref={scrollerRef}
          onScroll={updateBounds}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="no-scrollbar grid grid-flow-col auto-cols-[100%] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:auto-cols-[calc(50%-0.5rem)]"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} className="snap-start" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
