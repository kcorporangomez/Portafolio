import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { ProjectCard } from './ProjectCard'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  return (
    <section id="proyectos" className="relative scroll-mt-24 py-2">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-350 grid-cols-1 gap-4 px-6 md:grid-cols-12 md:px-10"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            className={i === 0 ? 'md:col-start-3 md:col-span-4' : 'md:col-start-7 md:col-span-4'}
          />
        ))}
      </motion.div>
    </section>
  )
}
