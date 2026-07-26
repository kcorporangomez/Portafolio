import { motion } from 'framer-motion'
import { SOCIALS } from '@/data/socials'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { LinkedinIcon } from '@/components/icons/LinkedinIcon'

const ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-teal py-10">
      <div className="mx-auto flex max-w-350 flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-10">
        <p className="text-xs text-white/65">© 2026 — Kelvin Corporán</p>

        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => {
            const Icon = ICONS[social.icon]
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.3)' }}
                transition={{ duration: 0.2 }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-white"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
