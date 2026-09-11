import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80 md:px-3 md:py-1 md:text-xs">
      {children}
    </span>
  )
}
