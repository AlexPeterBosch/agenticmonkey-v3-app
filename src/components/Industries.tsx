import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Stethoscope, Building2, GraduationCap, BarChart3, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'Automated customer support, inventory management, and personalized shopping experiences powered by AI.', color: 'from-orange/20 to-orange/5' },
  { icon: Stethoscope, title: 'Healthcare', desc: 'Patient intake automation, medical document processing, and intelligent scheduling systems.', color: 'from-orange/10 to-orange/5' },
  { icon: Building2, title: 'Real Estate', desc: 'Lead qualification bots, property matching algorithms, and automated market analysis.', color: 'from-orange/20 to-orange/5' },
  { icon: GraduationCap, title: 'Education', desc: 'AI tutoring systems, automated grading, and personalized learning path generation.', color: 'from-orange/10 to-orange/5' },
  { icon: BarChart3, title: 'Finance', desc: 'Fraud detection agents, automated reporting, and intelligent document processing pipelines.', color: 'from-orange/20 to-orange/5' },
  { icon: Truck, title: 'Logistics', desc: 'Route optimization, inventory forecasting, and automated dispatch systems that cut costs.', color: 'from-orange/10 to-orange/5' },
]

function TiltCard({ ind, index }: { ind: typeof industries[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    xTo.current = gsap.quickTo(cardRef.current, 'rotateY', { duration: 0.3, ease: 'power2.out' })
    yTo.current = gsap.quickTo(cardRef.current, 'rotateX', { duration: 0.3, ease: 'power2.out' })
  }, { scope: cardRef })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    xTo.current?.(x * 12)
    yTo.current?.(-y * 12)
  }, [])

  const handleMouseLeave = useCallback(() => {
    xTo.current?.(0)
    yTo.current?.(0)
  }, [])

  return (
    <div
      className="ind-card"
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative bg-[#0A0A0A] rounded-3xl p-8 border border-white/10 hover:border-orange/30 transition-shadow hover:shadow-[0_0_20px_rgba(255,107,44,0.1)] h-full`}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange/20 transition-all">
          <ind.icon className="w-6 h-6 text-orange" />
        </div>
        <h3 className="font-[var(--font-display)] text-xl font-bold mb-3">
          {ind.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed font-[var(--font-body)]">
          {ind.desc}
        </p>
      </div>
    </div>
  )
}

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading
    gsap.from('.ind-heading', {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: '.ind-heading',
        start: 'top 85%',
        end: 'top 50%',
        scrub: true,
      },
    })

    // Batch stagger cards
    ScrollTrigger.batch('.ind-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        })
      },
      start: 'top 90%',
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section id="industries" ref={sectionRef} className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="ind-heading mb-16">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            Industries
            <span className="text-stroke-visible block">We Serve</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <TiltCard key={ind.title} ind={ind} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
