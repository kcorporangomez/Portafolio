import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { ProjectCard } from './ProjectCard'
import { PROJECTS } from '@/data/projects'
import brandBlob from '@/assets/blobs/mission-blob.svg'

export function Projects() {
  return (
    <section id="proyectos" className="relative scroll-mt-24 overflow-hidden bg-teal py-24 md:py-32">
      <img
        src={brandBlob}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] top-1/2 w-[70%] max-w-[720px] -translate-y-1/2 rotate-180 opacity-[0.07]"
      />

      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto grid max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10"
      >
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green">
              Proyectos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-white">
              Una selección de lo que he construido.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 font-mono text-sm text-white/50">
              01 — {String(PROJECTS.length).padStart(2, '0')}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:col-span-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
