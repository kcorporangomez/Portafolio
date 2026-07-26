import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { BentoCell } from '@/components/ui/BentoCell'
import { TargetIcon } from '@/components/icons/TargetIcon'
import { BoltIcon } from '@/components/icons/BoltIcon'

export function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 py-2">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-350 grid-cols-1 gap-4 px-6 md:grid-cols-12 md:grid-rows-2 md:px-10"
      >
        <BentoCell
          tone="dark"
          className="flex flex-col justify-center md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-2"
        >
          <p className="text-xs uppercase tracking-wide text-green-soft">Quién soy</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Sobre Mí</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Llevo +8 años en el área, y en ese camino he construido la experiencia necesaria para entregar
            desarrollos de calidad.
          </p>
        </BentoCell>

        <BentoCell hover className="md:col-start-1 md:col-span-8 md:row-start-1">
          <TargetIcon className="mb-4 h-8 w-8 text-teal" />
          <p className="text-sm leading-relaxed text-muted-soft md:text-base">
            Transformo ideas en soluciones tecnológicas estables y escalables.
          </p>
        </BentoCell>

        <BentoCell hover className="md:col-start-1 md:col-span-8 md:row-start-2">
          <BoltIcon className="mb-4 h-8 w-8 text-teal" />
          <p className="text-sm leading-relaxed text-muted-soft md:text-base">
            Me mueve la automatización de procesos y el diseño de sistemas eficientes que optimizan flujos de
            trabajo.
          </p>
        </BentoCell>
      </motion.div>
    </section>
  )
}
