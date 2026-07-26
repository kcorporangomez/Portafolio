import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  )
}
