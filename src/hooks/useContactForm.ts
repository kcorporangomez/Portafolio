import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT_ENDPOINT } from '@/lib/constants'

export type FieldName = 'nombre' | 'correo' | 'comentario'

interface FormValues {
  nombre: string
  correo: string
  comentario: string
  website: string
}

const EMPTY: FormValues = { nombre: '', correo: '', comentario: '', website: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AUTO_CLEAR_MS = 10000

type Status = { type: 'idle' } | { type: 'success'; message: string } | { type: 'error'; message: string }

function validate(values: FormValues): Set<FieldName> {
  const errors = new Set<FieldName>()
  if (!values.nombre.trim()) errors.add('nombre')
  if (!EMAIL_RE.test(values.correo.trim())) errors.add('correo')
  if (!values.comentario.trim()) errors.add('comentario')
  return errors
}

export function useContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [invalid, setInvalid] = useState<Set<FieldName>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const clearTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(
    () => () => {
      clearTimeout(clearTimer.current)
      abortRef.current?.abort()
    },
    [],
  )

  const onChange = useCallback((field: FieldName | 'website', value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (field === 'website') return
    setInvalid((prev) => {
      if (!prev.has(field)) return prev
      const next = new Set(prev)
      next.delete(field)
      return next
    })
  }, [])

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const errors = validate(values)
      setInvalid(errors)
      if (errors.size > 0) return

      setIsSubmitting(true)
      setStatus({ type: 'idle' })
      clearTimeout(clearTimer.current)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.nombre,
            email: values.correo,
            comment: values.comentario,
            website: values.website,
          }),
          signal: controller.signal,
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error ?? 'Ocurrió un error, intenta de nuevo.')
        }

        setValues(EMPTY)
        setStatus({ type: 'success', message: '¡Mensaje enviado! Te responderé pronto.' })
        clearTimer.current = setTimeout(() => setStatus({ type: 'idle' }), AUTO_CLEAR_MS)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        if (err instanceof TypeError) {
          setStatus({
            type: 'error',
            message: 'No se pudo conectar. Revisa tu conexión a internet e intenta de nuevo.',
          })
        } else {
          setStatus({
            type: 'error',
            message: err instanceof Error ? err.message : 'Ocurrió un error, intenta de nuevo.',
          })
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [values],
  )

  return { values, invalid, status, isSubmitting, onChange, onSubmit }
}
