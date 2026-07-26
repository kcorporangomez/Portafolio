import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Blob } from '@/components/Blob'
import missionBlob from '@/assets/blobs/mission-blob.svg'
import missionAccent from '@/assets/blobs/mission-accent.svg'
import websiteIcon from '@/assets/icons/website.png'
import softwareIcon from '@/assets/icons/software.png'

export function Mission() {
  return (
    <section id="mision" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Blob
        src={missionBlob}
        className="absolute -right-[12%] top-0 w-[55%] max-w-[520px] opacity-70"
        parallax={50}
      />
      <Blob
        src={missionAccent}
        className="absolute bottom-10 left-[-4%] hidden w-[7%] max-w-[120px] md:block"
        parallax={25}
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10"
      >
        <SectionHeading
          eyebrow="Lo que persigo"
          title="Mi Misión"
          align="right"
          lede="Alcanzar la excelencia en la ingeniería de software y destacar por la calidad de cada solución que construyo."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          <Card icon={websiteIcon}>
            Sitios web modernos, veloces y optimizados, alineados con los estándares y las tendencias actuales de la
            industria.
          </Card>
          <Card icon={softwareIcon} className="md:mt-10">
            Aplicaciones confiables, pensadas y ejecutadas cuidando cada fase de la implementación.
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
