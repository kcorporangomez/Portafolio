import { useScrollbarReveal } from '@/hooks/useScrollbarReveal'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { Mission } from '@/sections/Mission'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'

export default function App() {
  useScrollbarReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mission />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
