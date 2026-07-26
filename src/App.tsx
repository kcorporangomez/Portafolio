import { useScrollbarReveal } from '@/hooks/useScrollbarReveal'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { Mission } from '@/sections/Mission'
import { About } from '@/sections/About'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'

export default function App() {
  useScrollbarReveal()

  return (
    <>
      <main>
        <Hero />
        <Mission />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
