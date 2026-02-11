import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Stethoscope, Building2, GraduationCap, BarChart3, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    num: '01',
    desc: 'Automated customer support, inventory management, and personalized shopping experiences powered by AI.',
    bullets: ['Conversational product discovery', 'Autonomous cart recovery agents', 'Real-time inventory sync'],
    color: 'from-orange/20 to-orange/5',
    iconBg: 'bg-orange/15',
    accent: '#FF6B2C',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    num: '02',
    desc: 'Patient intake automation, medical document processing, and intelligent scheduling systems.',
    bullets: ['AI-powered triage routing', 'HIPAA-compliant document agents', 'Automated appointment logic'],
    color: 'from-cyan/20 to-cyan/5',
    iconBg: 'bg-cyan/15',
    accent: '#00D4FF',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    num: '03',
    desc: 'Lead qualification bots, property matching algorithms, and automated market analysis reports.',
    bullets: ['24/7 lead nurturing agents', 'AI property valuation pipelines', 'Automated client follow-ups'],
    color: 'from-orange/20 to-orange/5',
    iconBg: 'bg-orange/15',
    accent: '#FF6B2C',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    num: '04',
    desc: 'AI tutoring systems, automated grading, and personalized learning path generation at scale.',
    bullets: ['Adaptive curriculum agents', 'Essay feedback automation', 'Enrollment & admin workflows'],
    color: 'from-cyan/20 to-cyan/5',
    iconBg: 'bg-cyan/15',
    accent: '#00D4FF',
  },
  {
    icon: BarChart3,
    title: 'Finance',
    num: '05',
    desc: 'Fraud detection agents, automated reporting pipelines, and intelligent document processing.',
    bullets: ['Real-time anomaly detection', 'Regulatory doc automation', 'Intelligent reconciliation'],
    color: 'from-orange/20 to-orange/5',
    iconBg: 'bg-orange/15',
    accent: '#FF6B2C',
  },
  {
    icon: Truck,
    title: 'Logistics',
    num: '06',
    desc: 'Route optimization, inventory forecasting, and automated dispatch systems that cut overhead.',
    bullets: ['AI dispatch & route agents', 'Demand forecasting pipelines', 'Automated vendor comms'],
    color: 'from-cyan/20 to-cyan/5',
    iconBg: 'bg-cyan/15',
    accent: '#00D4FF',
  },
]

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading animation
    gsap.from('.ind-heading', {
      x: -80,
      opacity: 0,
      scrollTrigger: {
        trigger: '.ind-heading',
        start: 'top 85%',
        end: 'top 55%',
        scrub: true,
      },
    })

    // Each row fades in on scroll
    gsap.utils.toArray<HTMLElement>('.ind-row').forEach((row, i) => {
      const isReverse = i % 2 !== 0
      gsap.from(row, {
        opacity: 0,
        x: isReverse ? 60 : -60,
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.8,
        },
      })
    })

    // Connector lines draw on scroll
    gsap.utils.toArray<HTMLElement>('.ind-connector').forEach((line) => {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: line,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="industries" ref={sectionRef} className="py-24 md:py-32 relative z-10 bg-black overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange/3 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="ind-heading mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-4">
            Built for Every Vertical
          </p>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            Industries
            <span className="gradient-text block">We Serve</span>
          </h2>
        </div>

        {/* Industry Rows */}
        <div className="relative">
          {industries.map((ind, i) => {
            const isReverse = i % 2 !== 0
            const Icon = ind.icon

            return (
              <div key={ind.title}>
                {/* Connecting line between rows */}
                {i > 0 && (
                  <div className="ind-connector flex justify-center my-2">
                    <div
                      className="w-px h-10 opacity-30"
                      style={{ background: `linear-gradient(to bottom, transparent, ${ind.accent}, transparent)` }}
                    />
                  </div>
                )}

                {/* Row */}
                <div
                  className={`ind-row group flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 p-8 md:p-10 bg-[#050505] hover:bg-[#080808]`}
                >
                  {/* Icon side */}
                  <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
                    <div className="relative">
                      {/* Large number background */}
                      <span className="font-[var(--font-display)] font-bold text-[120px] md:text-[160px] leading-none select-none pointer-events-none absolute -top-8 -left-4 text-white/[0.025] z-0">
                        {ind.num}
                      </span>

                      {/* Icon container */}
                      <div
                        className={`relative z-10 rounded-3xl ${ind.iconBg} flex items-center justify-center group-hover:scale-105 transition-all duration-500`}
                        style={{
                          width: 160,
                          height: 160,
                          boxShadow: `0 0 60px ${ind.accent}18`,
                        }}
                      >
                        <Icon
                          className="w-20 h-20 transition-all duration-500"
                          style={{ color: ind.accent }}
                        />
                      </div>

                      {/* Glow ring on hover */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          boxShadow: `0 0 80px ${ind.accent}25`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`flex-1 ${isReverse ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}
                    style={isReverse ? { textAlign: 'right' } : undefined}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isReverse ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                      <span
                        className="text-xs font-[var(--font-display)] font-bold uppercase tracking-[0.2em] opacity-60"
                        style={{ color: ind.accent }}
                      >
                        {ind.num}
                      </span>
                      <span className="w-8 h-px opacity-30" style={{ background: ind.accent }} />
                    </div>

                    <h3 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 group-hover:text-orange transition-colors duration-300">
                      {ind.title}
                    </h3>

                    <p className="text-muted text-lg leading-relaxed font-[var(--font-body)] max-w-xl mb-6"
                      style={isReverse ? { marginLeft: 'auto' } : undefined}
                    >
                      {ind.desc}
                    </p>

                    {/* Bullet points */}
                    <ul className={`space-y-2 ${isReverse ? 'lg:items-end' : 'lg:items-start'} flex flex-col items-center`}
                      style={isReverse ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }}
                    >
                      {ind.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-sm font-[var(--font-body)] text-white/60"
                          style={isReverse ? { flexDirection: 'row-reverse' } : undefined}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: ind.accent }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
