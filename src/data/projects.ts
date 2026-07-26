export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  href: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'portafolio-v2',
    title: 'Portafolio v2',
    description:
      'Mi portafolio personal, rediseñado y reconstruido desde cero en React, TypeScript y Tailwind, con animaciones a medida y despliegue continuo.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    href: 'https://kelvincorporan.com',
  },
  {
    slug: 'calculacredi',
    title: 'CalculaCredi',
    description:
      'Simulador de préstamos hipotecarios, personales y de vehículo. Genera la tabla de amortización, desglosa capital e intereses, modela el ahorro por abonos extraordinarios y calcula de forma inversa cuánto puedes prestar.',
    tags: ['Amortización', 'Abonos extraordinarios', 'Cálculo inverso', 'Gráficas'],
    href: 'https://calculacredi.com',
  },
]
