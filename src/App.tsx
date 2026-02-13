import { useEffect, useRef } from 'react'
import SmoothScroll from './components/SmoothScroll'
import GridLines from './components/GridLines'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PartnersMarquee from './components/PartnersMarquee'
import ProblemSolution from './components/ProblemSolution'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Industries from './components/Industries'
import WhyChooseUs from './components/WhyChooseUs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen text-white relative selection:bg-orange selection:text-white overflow-hidden noise-overlay">
        <div ref={glowRef} className="cursor-glow hidden md:block" />
        <GridLines />
        <Navbar />
        <Hero />
        <PartnersMarquee />
        <ProblemSolution />
        <Services />
        <HowItWorks />
        <Industries />
        <WhyChooseUs />
        <CTASection />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
