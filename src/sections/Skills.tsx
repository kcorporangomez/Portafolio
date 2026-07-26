import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillsMarquee } from './SkillsMarquee'
import developerSkills from '@/assets/illustrations/developer-skills.svg'

export function Skills() {
  return (
    <section id="habilidades" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10"
      >
        <SectionHeading eyebrow="Con lo que trabajo" title="Habilidades" />

        <motion.div variants={fadeUp} className="mt-12 md:mt-16">
          <SkillsMarquee />
        </motion.div>

        <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-md md:mt-16">
          <img
            src={developerSkills}
            alt="Kelvin Corporán trabajando"
            className="h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
