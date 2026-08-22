import { AnimatePresence, motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '@/lib/motion'
import { BentoCell } from '@/components/ui/BentoCell'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useContactForm, SERVICE_OPTIONS } from '@/hooks/useContactForm'

const TOOLTIPS = {
  nombre: 'Escribe tu nombre',
  correo: 'Escribe un correo válido',
  servicio: 'Selecciona un servicio',
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
        <BentoCell id="contacto" className="relative scroll-mt-24">
          <p className="text-xs uppercase tracking-wide text-teal/80">Contacto</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-teal">¡Hablemos!</h2>
          <p className="mt-2 text-sm text-muted">Cuéntame tu proyecto y te responderé pronto.</p>

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
            </div>

            <div className="mt-8">
              <Field
                id="servicio"
                label="Servicio de interés"
                as="select"
                options={[...SERVICE_OPTIONS]}
                placeholder="¿Qué servicio necesitas?"
                value={values.servicio}
                onChange={(v) => onChange('servicio', v)}
                invalid={invalid.has('servicio')}
                tooltip={TOOLTIPS.servicio}
                required
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
              />
            </div>

            <Button
              type="submit"
              variant="solid"
              disabled={isSubmitting}
              className="mt-7 w-full justify-center sm:w-auto"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>

            <div role="status" aria-live="polite" className="mt-2 text-sm">
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
          </form>
        </BentoCell>
      </motion.div>
    </section>
  )
}
