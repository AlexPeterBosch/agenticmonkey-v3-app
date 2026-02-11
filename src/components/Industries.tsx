import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Stethoscope, Building2, GraduationCap, BarChart3, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'Automated customer support, inventory management, and personalized shopping experiences powered by AI.', num: '01', featured: true, span: 'md:col-span-2 md:row-span-2' },
  { icon: Stethoscope, title: 'Healthcare', desc: 'Patient intake automation, medical document processing, and intelligent scheduling systems.', num: '02', featured: false, span: '' },
  { icon: Building2, title: 'Real Estate', desc: 'Lead qualification bots, property matching algorithms, and automated market analysis.', num: '03', featured: false, span: '' },
  { icon: GraduationCap, title: 'Education', desc: 'AI tutoring systems, automated grading, and personalized learning path generation.', num: '04', featured: false, span: 'md:col-span-2' },
  { icon: BarChart3, title: 'Finance', desc: 'Fraud detection agents, automated reporting, and intelligent document processing pipelines.', num: '05', featured: false, span: '' },
  { icon: Truck, title: 'Logistics', desc: 'Route optimization, inventory forecasting, and automated dispatch systems that cut costs.', num: '06', featured: false, span: '' },
]

function TiltCard({ ind }: { ind: typeof industries[0] }) {
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
      className={`ind-card ${ind.span}`}
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-3xl p-8 md:p-10 border transition-all h-full flex flex-col justify-between overflow-hidden ${
          ind.featured
            ? 'bg-gradient-to-br from-[#0A0A0A] to-[#111] border-orange/20 hover:border-orange/50 shadow-[0_0_40px_rgba(255,107,44,0.08)] hover:shadow-[0_0_60px_rgba(255,107,44,0.15)]'
            : 'bg-[#0A0A0A] border-white/10 hover:border-orange/30 hover:shadow-[0_0_20px_rgba(255,107,44,0.1)]'
        }`}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        {/* Background number */}
        <span className={`font-[var(--font-display)] font-bold absolute -top-2 -right-2 select-none pointer-events-none ${
          ind.featured ? 'text-8xl md:text-9xl text-orange/[0.06]' : 'text-7xl md:text-8xl text-white/[0.03]'
        }`}>
          {ind.num}
        </span>

        <div>
          <div className={`rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all ${
            ind.featured ? 'w-16 h-16 bg-orange/15 group-hover:bg-orange/25' : 'w-14 h-14 bg-orange/10 group-hover:bg-orange/20'
          }`}>
            <ind.icon className={`text-orange ${ind.featured ? 'w-8 h-8' : 'w-7 h-7'}`} />
          </div>
          <h3 className={`font-[var(--font-display)] font-bold mb-3 group-hover:text-orange transition-colors ${
            ind.featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
          }`}>
            {ind.title}
          </h3>
          <p className={`text-muted leading-relaxed font-[var(--font-body)] ${
            ind.featured ? 'text-base md:text-lg' : 'text-base'
          }`}>
            {ind.desc}
          </p>
        </div>

        <div className="mt-6">
          <span className={`text-white/20 group-hover:text-orange group-hover:translate-x-2 transition-all inline-block ${
            ind.featured ? 'text-2xl' : 'text-xl'
          }`}>
            &rarr;
          </span>
        </div>
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
    <section id="industries" ref={sectionRef} className="py-24 md:py-32 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="ind-heading mb-16">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            Industries
            <span className="text-stroke-visible block">We Serve</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]">
          {industries.map((ind) => (
            <TiltCard key={ind.title} ind={ind} />
          ))}
        </div>
      </div>
    </section>
  )
}
