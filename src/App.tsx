import SmoothScroll from './components/SmoothScroll'
import GridLines from './components/GridLines'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PartnersMarquee from './components/PartnersMarquee'
import ProblemSolution from './components/ProblemSolution'
import Services from './components/Services'
import MascotShowcase from './components/MascotShowcase'
import HowItWorks from './components/HowItWorks'
import Industries from './components/Industries'
import WhyChooseUs from './components/WhyChooseUs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen text-white relative selection:bg-orange selection:text-white noise-overlay">
        <GridLines />
        <Navbar />
        <Hero />
        <PartnersMarquee />
        <ProblemSolution />
        <Services />
        <MascotShowcase />
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
