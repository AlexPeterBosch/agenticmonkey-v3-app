import { lazy, Suspense } from 'react'
import SmoothScroll from './components/SmoothScroll'
import GridLines from './components/GridLines'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const PartnersMarquee = lazy(() => import('./components/PartnersMarquee'))
const ProblemSolution = lazy(() => import('./components/ProblemSolution'))
const Services = lazy(() => import('./components/Services'))
const MascotShowcase = lazy(() => import('./components/MascotShowcase'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const Industries = lazy(() => import('./components/Industries'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const CTASection = lazy(() => import('./components/CTASection'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen text-white relative selection:bg-orange selection:text-white noise-overlay">
        <GridLines />
        <Navbar />
        <Hero />
        <Suspense fallback={null}>
          <PartnersMarquee />
          <ProblemSolution />
          <Services />
          <MascotShowcase />
          <HowItWorks />
          <Industries />
          <WhyChooseUs />
          <CTASection />
          <Footer />
        </Suspense>
      </div>
    </SmoothScroll>
  )
}

export default App
