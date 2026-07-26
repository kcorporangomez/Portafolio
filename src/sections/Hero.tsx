import { motion } from 'framer-motion'
import { EASE, fadeUp, staggerContainer } from '@/lib/motion'
import { Blob } from '@/components/Blob'
import { ButtonLink } from '@/components/ui/Button'
import { RotatingGreeting } from './RotatingGreeting'
import heroBlob from '@/assets/blobs/hero-blob.svg'
import heroAccent from '@/assets/blobs/hero-accent.svg'
import developerHero from '@/assets/illustrations/developer-hero.svg'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-16 md:flex md:min-h-[100dvh] md:items-center md:pt-24 md:pb-0"
    >
      <Blob
        src={heroBlob}
        className="absolute -top-16 right-[-20%] w-[85%] max-w-[890px] md:-top-8 md:right-[-4%] md:w-[52%]"
        parallax={90}
        rotate={4}
      />
      <Blob
        src={heroAccent}
        className="absolute left-[-4%] top-[46%] hidden w-[6%] max-w-[142px] md:block"
        parallax={30}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-10 px-6 md:grid-cols-2 md:items-center md:gap-6 md:px-10">
        <motion.div
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal/60"
          >
            +8 años construyendo software
          </motion.p>

          <h1
            aria-label="Hola, soy Kelvin Corporán"
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] text-teal"
          >
            <motion.span variants={fadeUp} className="inline-block overflow-hidden align-baseline">
              <RotatingGreeting />
            </motion.span>{' '}
            <motion.span variants={fadeUp} className="inline-block">
              Soy Kelvin Corporán
            </motion.span>
          </h1>

          <motion.p variants={fadeUp} className="mt-5 text-lg font-semibold text-muted md:text-xl">
            Desarrollador Fullstack
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <ButtonLink href="#contacto">Contáctame</ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE, delay: 0.5 } }}
          className="relative mx-auto w-full max-w-sm md:max-w-none"
        >
          <img
            src={developerHero}
            alt="Kelvin Corporán desarrollando"
            className="h-auto w-full"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
