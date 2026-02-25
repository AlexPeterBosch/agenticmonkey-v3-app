import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Wrench, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We dig into your workflows, find the bottlenecks, and map out exactly where AI agents can make the biggest impact.',
  },
  {
    num: '02',
    icon: Wrench,
    title: 'Build',
    desc: 'We design, develop, and rigorously test custom AI agents tailored to your specific use cases and systems.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Deploy',
    desc: 'Launch into production with monitoring, iteration, and ongoing optimization to ensure peak performance.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.hiw-heading', {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hiw-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // SVG line draw
    const line = document.querySelector('.hiw-line') as SVGLineElement
    if (line) {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hiw-steps',
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: true,
        },
      })
    }

    gsap.utils.toArray<HTMLElement>('.hiw-step').forEach((step) => {
      gsap.from(step, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 md:py-24 bg-black relative z-10 overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/4 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="hiw-heading text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-4">
            Meet Your AI Partner
          </p>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="mt-6 text-lg text-muted font-[var(--font-body)] max-w-2xl mx-auto">
            From discovery to deployment in weeks, not months. Our battle-tested process gets AI agents into production fast.
          </p>
        </div>

        <div className="hiw-steps relative max-w-4xl mx-auto">
          {/* SVG connecting line — left side on desktop */}
          <svg
            className="absolute left-[2.25rem] top-0 h-full w-4 hidden md:block"
            preserveAspectRatio="none"
          >
            <line
              className="hiw-line"
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#FF6B2C"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step) => (
              <div
                key={step.num}
                className="hiw-step md:pl-24"
              >
                <div className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-10 border border-white/10 hover:border-orange/30 transition-all hover:shadow-[0_0_30px_rgba(255,107,44,0.1)]">
                  {/* Step number dot on the line */}
                  <div className="hidden md:flex absolute -left-16 top-8 w-8 h-8 rounded-full bg-orange items-center justify-center text-xs font-bold text-white shadow-[0_0_20px_rgba(255,107,44,0.4)]">
                    {step.num}
                  </div>

                  <span className="font-[var(--font-display)] text-7xl md:text-8xl font-bold text-white/[0.04] absolute top-4 right-6">
                    {step.num}
                  </span>
                  <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-orange" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted text-base leading-relaxed font-[var(--font-body)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
