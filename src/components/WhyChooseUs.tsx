import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Shield, Key, Brain } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { title: 'Speed Over Perfection', desc: 'We ship fast. Your first agent prototype is ready in days, not months.', accent: 'text-orange', num: '01', Icon: Zap },
  { title: 'Production-Grade', desc: 'No science experiments. Everything we build is production-ready from day one.', accent: 'text-orange', num: '02', Icon: Shield },
  { title: 'Full Ownership', desc: 'Your code. Your agents. Your IP. We build it and hand over the keys.', accent: 'text-orange', num: '03', Icon: Key },
  { title: 'AI-Native Team', desc: "We don't \"also do AI\". AI agents are all we do, every day, all day.", accent: 'text-orange', num: '04', Icon: Brain },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading with clip-path wipe
    gsap.from('.wcu-heading', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.wcu-heading',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Cards stagger up
    ScrollTrigger.batch('.wcu-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
        })
      },
      start: 'top 90%',
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section id="why-us" ref={sectionRef} className="bg-black text-white py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="wcu-heading mb-20" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            Why
            <span className="gradient-text block">Choose Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason) => (
            <div key={reason.num} className="wcu-card relative group">
              <div className="bg-[#0A0A0A] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-orange/30 hover:shadow-[0_0_30px_rgba(255,107,44,0.1)] transition-all">
                <span className="font-[var(--font-display)] text-6xl font-bold text-white/[0.04] absolute top-6 right-8">
                  {reason.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-orange/10 group-hover:bg-orange/20 flex items-center justify-center mb-6 transition-all group-hover:scale-110">
                  <reason.Icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className={`font-[var(--font-display)] text-2xl md:text-4xl font-bold ${reason.accent} mb-4`}>
                  {reason.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed font-[var(--font-body)]">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
