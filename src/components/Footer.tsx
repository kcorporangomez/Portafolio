import { motion } from 'framer-motion'
import { Blob } from '@/components/Blob'
import { SOCIALS } from '@/data/socials'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { LinkedinIcon } from '@/components/icons/LinkedinIcon'
import footerBlob from '@/assets/blobs/footer-blob.svg'

const ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal py-10">
      <Blob
        src={footerBlob}
        className="absolute -bottom-10 right-[-6%] hidden w-[22%] max-w-[260px] opacity-60 md:block"
      />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-10">
        <p className="text-sm text-white/70">© 2026 - Kelvin Corporán</p>

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
                whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.22)' }}
                transition={{ duration: 0.2 }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-field bg-white/10 text-white"
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
