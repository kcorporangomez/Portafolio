import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Tag } from '@/components/ui/Tag'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import { cn } from '@/lib/cn'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const domain = new URL(project.href).hostname.replace('www.', '')

  return (
    <motion.a
      variants={fadeUp}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={cn('group relative flex flex-col overflow-hidden rounded-card cursor-pointer', className)}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-teal-soft to-green" />
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90 mix-blend-luminosity transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-teal via-teal/10 to-transparent" />
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[16px] border-white/10 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-field bg-black/60 px-3 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="ml-2 truncate text-xs font-medium text-white/90">{domain}</span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col overflow-hidden bg-teal p-6 md:p-8">
        <span className="pointer-events-none absolute -top-3 right-4 select-none text-[5rem] font-semibold leading-none text-white/5 md:-top-5 md:text-[6.5rem]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-white md:text-2xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
            Ver sitio
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}
