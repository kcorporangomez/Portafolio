import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'
import { BentoCell } from '@/components/ui/BentoCell'
import { ButtonLink } from '@/components/ui/Button'
import { VapourText } from '@/components/ui/vapour-text-effect'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { LinkedinIcon } from '@/components/icons/LinkedinIcon'
import { ArrowUpRight } from '@/components/icons/ArrowUpRight'
import { RotatingGreeting } from './RotatingGreeting'
import { SkillsMarquee } from './SkillsMarquee'
import { SOCIALS } from '@/data/socials'
import { PROJECTS } from '@/data/projects'

const SOCIAL_ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const

const SERVICES = ['Frontend', 'Backend', 'APIs REST', 'Bases de datos', 'Automatización']
const SERVICE_ROTATIONS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']

export function Hero() {
  const nameRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress: vapourProgress } = useScroll({
    target: nameRef,
    offset: ['start start', 'end start'],
  })

  return (
    <section id="hero" className="relative pb-2 pt-3 md:pt-4">
      <motion.div
        variants={staggerContainer(0.06, 0.1)}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-350 flex-col gap-4 px-6 md:px-10"
      >
        {/* Row 1: social icons */}
        <div className="grid grid-cols-3 gap-4">
          {SOCIALS.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon]
            return (
              <BentoCell
                key={social.href}
                as="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                hover
                className="flex h-20 items-center justify-center p-0! md:h-24"
              >
                <span className="sr-only">{social.label}</span>
                <Icon className="h-6 w-6 text-teal md:h-7 md:w-7" aria-hidden="true" />
              </BentoCell>
            )
          })}
        </div>

        {/* Row 2: intro + avatar */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <BentoCell className="@container flex flex-col justify-center md:col-span-8">
            <h1
              aria-label="Hola, soy Kelvin Corporán"
              className="text-[clamp(1.5rem,8cqw,4rem)] font-extrabold leading-[1.05] tracking-tight text-teal"
            >
              <span className="inline-block align-baseline">
                <RotatingGreeting />
              </span>{' '}
              <VapourText
                ref={nameRef}
                text="Soy Kelvin Corporán"
                progress={vapourProgress}
                className="whitespace-nowrap"
              />
            </h1>
            <p className="mt-1 text-lg font-semibold text-muted">Desarrollador Fullstack</p>

            <div className="mt-4">
              <ButtonLink href="#contacto">Colaboremos</ButtonLink>
            </div>
          </BentoCell>

          <BentoCell tone="dark" className="hidden items-center justify-center md:col-span-4 md:flex">
            <span className="text-4xl font-semibold tracking-tight">KC</span>
          </BentoCell>
        </div>

        {/* Row 3: tools */}
        <BentoCell className="order-2 flex flex-col md:order-0">
          <p className="text-xs uppercase tracking-wide text-teal/80">Herramientas</p>
          <div className="-mx-6 mt-6 flex items-center overflow-hidden md:-mx-8">
            <SkillsMarquee />
          </div>
        </BentoCell>

        {/* Row 4: recent projects + services */}
        <div className="order-1 grid grid-cols-1 gap-4 md:order-0 md:grid-cols-2">
          <BentoCell as="a" href="#proyectos" hover>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-teal/80">Proyectos recientes</p>
              <ArrowUpRight className="h-4 w-4 text-teal" />
            </div>

            <div className="relative mt-6 h-24">
              {PROJECTS.map((project, i) => (
                <div
                  key={project.slug}
                  className="absolute top-0 flex h-20 w-28 items-end rounded-lg bg-linear-to-br from-teal-soft to-green p-2 shadow-tile"
                  style={{
                    left: `${i * 52}px`,
                    top: `${i * 8}px`,
                    transform: `rotate(${i % 2 === 0 ? -6 : 4}deg)`,
                  }}
                >
                  <span className="truncate text-[10px] font-medium text-white/80">{project.title}</span>
                </div>
              ))}
            </div>
          </BentoCell>

          <BentoCell>
            <p className="text-xs uppercase tracking-wide text-teal/80">Servicios</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SERVICES.map((service, i) => (
                <span
                  key={service}
                  className={`${SERVICE_ROTATIONS[i % SERVICE_ROTATIONS.length]} rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink`}
                >
                  {service}
                </span>
              ))}
            </div>
          </BentoCell>
        </div>
      </motion.div>
    </section>
  )
}
