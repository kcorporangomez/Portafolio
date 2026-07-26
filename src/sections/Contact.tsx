import { AnimatePresence, motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { Blob } from '@/components/Blob'
import { useContactForm } from '@/hooks/useContactForm'
import accentSmall from '@/assets/blobs/accent-small.svg'

const TOOLTIPS = {
  nombre: 'Escribe tu nombre',
  correo: 'Escribe un correo válido',
  comentario: 'Escribe un comentario',
} as const

export function Contact() {
  const { values, invalid, status, isSubmitting, onChange, onSubmit } = useContactForm()

  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Blob
        src={accentSmall}
        className="absolute left-[-3%] top-10 hidden w-[6%] max-w-[110px] md:block"
        parallax={20}
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10"
      >
        <SectionHeading eyebrow="Hablemos" title="Contáctame" align="right" />

        <motion.form
          variants={fadeUp}
          onSubmit={onSubmit}
          noValidate
          className="relative mx-auto mt-12 max-w-xl rounded-panel bg-white p-6 shadow-panel md:mt-16 md:p-10"
        >
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => onChange('website', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-12">
            <Field
              id="nombre"
              label="Nombre"
              value={values.nombre}
              onChange={(v) => onChange('nombre', v)}
              invalid={invalid.has('nombre')}
              tooltip={TOOLTIPS.nombre}
              maxLength={100}
              required
            />
            <Field
              id="correo"
              label="Correo"
              type="email"
              value={values.correo}
              onChange={(v) => onChange('correo', v)}
              invalid={invalid.has('correo')}
              tooltip={TOOLTIPS.correo}
              maxLength={254}
              required
            />
            <Field
              id="comentario"
              label="Comentario"
              as="textarea"
              value={values.comentario}
              onChange={(v) => onChange('comentario', v)}
              invalid={invalid.has('comentario')}
              tooltip={TOOLTIPS.comentario}
              maxLength={3000}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-7 w-full justify-center">
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>

          <div role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-center text-sm">
            <AnimatePresence mode="wait">
              {status.type !== 'idle' && (
                <motion.p
                  key={status.type}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={status.type === 'success' ? 'text-success' : 'text-danger'}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      </motion.div>
    </section>
  )
}
