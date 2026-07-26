import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'
import { ButtonLink } from '@/components/ui/Button'
import logo from '@/assets/brand/logo.svg'

const LINKS = [
  { href: '#mision', label: 'Misión' },
  { href: '#sobre', label: 'Sobre mí' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    const sections = LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-white/80 shadow-tile backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#hero" className="flex items-center" aria-label="Kelvin Corporán, inicio">
          <img src={logo} alt="" className="h-6 w-auto" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Secciones">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-green"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="#contacto" className="px-6 py-2.5 text-sm">
            Contáctame
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 cursor-pointer p-2 lg:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={cn(
              'block h-0.5 w-6 bg-teal transition-transform duration-200',
              menuOpen && 'translate-y-[7px] rotate-45',
            )}
          />
          <span
            className={cn(
              'mt-[5px] block h-0.5 w-6 bg-teal transition-opacity duration-200',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'mt-[5px] block h-0.5 w-6 bg-teal transition-transform duration-200',
              menuOpen && '-translate-y-[7px] -rotate-45',
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden bg-white/95 shadow-tile backdrop-blur-md lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 pb-6" aria-label="Secciones (móvil)">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-ink/5 py-3 text-base font-medium text-ink last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <ButtonLink
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-4 justify-center"
              >
                Contáctame
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
