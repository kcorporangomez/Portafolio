# Portafolio Kelvin Corporán

Sitio personal de Kelvin Corporán — desarrollador fullstack. Landing de una sola página con misión, sobre mí, habilidades, proyectos y contacto.

En vivo: [kelvincorporan.com](https://kelvincorporan.com)

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev)

## Estructura

```
src/
├── components/   # Nav, Footer, Blob, ui/*, icons/*
├── sections/     # Hero, Mission, About, Skills, Projects, Contact
├── data/         # skills, projects, socials (contenido tipado)
├── hooks/        # useContactForm, useScrollbarReveal, useMediaQuery
├── lib/          # motion presets, wrap(), cn(), constants
├── assets/       # logos, blobs, ilustraciones, íconos de tecnologías
└── styles/       # tokens de marca (@theme) y estilos base
```

## Desarrollo

```
npm install
npm run dev        # servidor de desarrollo
npm run typecheck  # tsc -b
npm run build      # build de producción a dist/
npm run preview    # sirve el build de producción localmente
```

## Redes sociales

- GitHub: [github.com/kcorporangomez](https://github.com/kcorporangomez)
- Instagram: [instagram.com/kelvincorporangomez](https://www.instagram.com/kelvincorporangomez)
- LinkedIn: [linkedin.com/in/kcorporangomez](https://www.linkedin.com/in/kcorporangomez)
