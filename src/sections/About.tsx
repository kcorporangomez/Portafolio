import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Blob } from '@/components/Blob'
import aboutBlob from '@/assets/blobs/about-blob.svg'
import accentSmall from '@/assets/blobs/accent-small.svg'
import websiteIcon from '@/assets/icons/website.png'
import softwareIcon from '@/assets/icons/software.png'

export function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Blob
        src={aboutBlob}
        className="absolute -left-[14%] top-10 w-[50%] max-w-[480px] opacity-60"
        parallax={45}
      />
      <Blob
        src={accentSmall}
        className="absolute bottom-0 right-[-3%] hidden w-[6%] max-w-[110px] md:block"
        parallax={20}
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10"
      >
        <SectionHeading
          eyebrow="Quién soy"
          title="Sobre Mí"
          lede="Llevo +8 años en el área, y en ese camino he construido la experiencia necesaria para entregar desarrollos de calidad."
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          <Card icon={websiteIcon} className="md:mt-10">
            Transformo ideas en soluciones tecnológicas estables y escalables.
          </Card>
          <Card icon={softwareIcon}>
            Me mueve la automatización de procesos y el diseño de sistemas eficientes que optimizan flujos de
            trabajo.
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
