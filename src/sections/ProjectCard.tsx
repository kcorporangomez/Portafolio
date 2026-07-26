import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Tag } from '@/components/ui/Tag'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import type { Project } from '@/data/projects'
import accentBlob from '@/assets/blobs/hero-accent.svg'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const domain = new URL(project.href).hostname.replace('www.', '')

  return (
    <motion.a
      variants={fadeUp}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative block cursor-pointer overflow-hidden rounded-card border border-white/10 bg-white/[0.03]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-soft to-green" />
        <img
          src={accentBlob}
          alt=""
          aria-hidden="true"
          className="absolute -right-10 -top-10 w-2/3 opacity-30 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-field bg-black/20 px-3 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="ml-2 truncate text-xs font-medium text-white/70">{domain}</span>
        </div>
      </div>

      <div className="relative overflow-hidden p-6 md:p-8">
        <span className="pointer-events-none absolute -top-3 right-4 select-none text-[5rem] font-extrabold leading-none text-white/5 md:-top-5 md:text-[6.5rem]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative">
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
