export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'instagram' | 'linkedin'
}

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/kcorporangomez', icon: 'github' },
  { label: 'Instagram', href: 'https://www.instagram.com/kelvincorporangomez', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kcorporangomez', icon: 'linkedin' },
]
