import { AnimatePresence, motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { BentoCell } from '@/components/ui/BentoCell'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useContactForm } from '@/hooks/useContactForm'

const TOOLTIPS = {
  nombre: 'Escribe tu nombre',
  correo: 'Escribe un correo válido',
  comentario: 'Escribe un comentario',
} as const

export function Contact() {
  const { values, invalid, status, isSubmitting, onChange, onSubmit } = useContactForm()

  return (
    <section className="relative py-2">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-350 px-6 md:px-10"
      >
        <BentoCell id="contacto" tone="dark" className="relative scroll-mt-24">
          <h2 className="text-2xl font-extrabold tracking-tight">¡Hablemos!</h2>
          <p className="mt-2 text-sm text-white/70">Cuéntame tu proyecto y te responderé pronto.</p>

          <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
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

          <form onSubmit={onSubmit} noValidate className="mt-6">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field
                id="nombre"
                label="Nombre"
                value={values.nombre}
                onChange={(v) => onChange('nombre', v)}
                invalid={invalid.has('nombre')}
                tooltip={TOOLTIPS.nombre}
                maxLength={100}
                required
                labelClassName="text-white"
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
                labelClassName="text-white"
              />
            </div>

            <div className="mt-8">
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
                labelClassName="text-white"
              />
            </div>

            <Button
              type="submit"
              variant="light"
              disabled={isSubmitting}
              className="mt-7 w-full justify-center sm:w-auto"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>

            <div role="status" aria-live="polite" className="mt-4 min-h-6 text-sm">
              <AnimatePresence mode="wait">
                {status.type !== 'idle' && (
                  <motion.p
                    key={status.type}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={status.type === 'success' ? 'text-green-soft' : 'text-danger'}
                  >
                    {status.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </BentoCell>
      </motion.div>
    </section>
  )
}
