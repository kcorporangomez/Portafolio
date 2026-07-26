import type { SVGProps } from 'react'

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" />
      <path d="m2.5 13 9.5 5 9.5-5" />
      <path d="m2.5 18 9.5 5 9.5-5" />
    </svg>
  )
}
