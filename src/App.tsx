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
      <div className="bg-black min-h-screen text-white relative selection:bg-orange selection:text-white overflow-hidden">
        {/* Global film grain overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.12]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />
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
