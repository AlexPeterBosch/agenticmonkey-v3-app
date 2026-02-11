import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Stethoscope, Building2, GraduationCap, BarChart3, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'Automated customer support, inventory sync, and personalized shopping experiences.', accent: '#FF6B2C' },
  { icon: Stethoscope, title: 'Healthcare', desc: 'Patient intake automation, document processing, and intelligent scheduling.', accent: '#00D4FF' },
  { icon: Building2, title: 'Real Estate', desc: 'Lead qualification bots, property matching, and automated market analysis.', accent: '#FF6B2C' },
  { icon: GraduationCap, title: 'Education', desc: 'AI tutoring systems, automated grading, and personalized learning paths.', accent: '#00D4FF' },
  { icon: BarChart3, title: 'Finance', desc: 'Fraud detection agents, automated reporting, and intelligent document processing.', accent: '#FF6B2C' },
  { icon: Truck, title: 'Logistics', desc: 'Route optimization, inventory forecasting, and automated dispatch systems.', accent: '#00D4FF' },
]

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.ind-heading', {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ind-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    ScrollTrigger.batch('.ind-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
        })
      },
      start: 'top 90%',
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section id="industries" ref={sectionRef} className="py-20 md:py-28 relative z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange/3 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="ind-heading mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-4">
            Built for Every Vertical
          </p>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            Industries
            <span className="gradient-text block">We Serve</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => {
            const Icon = ind.icon
            return (
              <div key={ind.title} className="ind-card group">
                <div
                  className="bg-[#080808] rounded-3xl p-8 border border-white/5 hover:border-white/15 transition-all duration-500 h-full hover:bg-[#0A0A0A]"
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${ind.accent}12` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300"
                    style={{ background: `${ind.accent}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: ind.accent }} />
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl font-bold mb-3 group-hover:text-orange transition-colors duration-300">
                    {ind.title}
                  </h3>
                  <p className="text-muted text-base leading-relaxed font-[var(--font-body)]">
                    {ind.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
