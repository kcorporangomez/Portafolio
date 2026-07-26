import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { BentoCell } from '@/components/ui/BentoCell'
import { GlobeIcon } from '@/components/icons/GlobeIcon'
import { LayersIcon } from '@/components/icons/LayersIcon'

export function Mission() {
  return (
    <section id="mision" className="relative scroll-mt-24 py-2">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-350 grid-cols-1 gap-4 px-6 md:grid-cols-12 md:grid-rows-2 md:px-10"
      >
        <BentoCell
          tone="dark"
          className="flex flex-col justify-center md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-2"
        >
          <p className="text-xs uppercase tracking-wide text-green-soft">Lo que persigo</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Mi Misión</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Alcanzar la excelencia en la ingeniería de software y destacar por la calidad de cada solución que
            construyo.
          </p>
        </BentoCell>

        <BentoCell hover className="md:col-start-5 md:col-span-8 md:row-start-1">
          <GlobeIcon className="mb-4 h-8 w-8 text-teal" />
          <p className="text-sm leading-relaxed text-muted-soft md:text-base">
            Sitios web modernos, veloces y optimizados, alineados con los estándares y las tendencias actuales de la
            industria.
          </p>
        </BentoCell>

        <BentoCell hover className="md:col-start-5 md:col-span-8 md:row-start-2">
          <LayersIcon className="mb-4 h-8 w-8 text-teal" />
          <p className="text-sm leading-relaxed text-muted-soft md:text-base">
            Aplicaciones confiables, pensadas y ejecutadas cuidando cada fase de la implementación.
          </p>
        </BentoCell>
      </motion.div>
    </section>
  )
}
