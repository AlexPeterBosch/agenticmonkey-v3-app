import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "AgenticMonkey didn't just hand us a chatbot — they built a fully autonomous intake system that handles 80% of our inbound leads without human input. It paid for itself in week two.",
    name: 'Jordan Mills',
    title: 'COO, ScaleOps Ventures',
    initials: 'JM',
    accentColor: '#FF6B2C',
  },
  {
    quote:
      "The team understood our workflows better than we did. Within 30 days we had AI agents running document processing that used to take a full-time hire. Genuinely impressive execution.",
    name: 'Priya Nair',
    title: 'Head of Operations, MedLink AI',
    initials: 'PN',
    accentColor: '#00D4FF',
  },
  {
    quote:
      "I've worked with five AI agencies. Most sell decks. AgenticMonkey ships. Our logistics dispatch is now 24/7 autonomous and our ops team is focused on strategy instead of repetitive tasks.",
    name: 'Daniel Schreiber',
    title: 'Founder, FreightFlow Labs',
    initials: 'DS',
    accentColor: '#FF6B2C',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.test-heading', {
      x: -80,
      opacity: 0,
      scrollTrigger: {
        trigger: '.test-heading',
        start: 'top 85%',
        end: 'top 55%',
        scrub: true,
      },
    })

    ScrollTrigger.batch('.test-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        })
      },
      start: 'top 85%',
      once: true,
    })
  }, { scope: sectionRef })

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-32 relative z-10 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-orange/4 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="test-heading mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-4">
            Social Proof
          </p>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            What Our
            <span className="gradient-text block">Partners Say</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card group relative rounded-3xl p-8 md:p-10 border border-white/8 hover:border-orange/25 bg-[#080808] hover:bg-[#0A0A0A] transition-all duration-500 flex flex-col"
              style={{
                boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
              }}
            >
              {/* Hover accent top border */}
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, transparent, ${t.accentColor}80, transparent)` }}
              />

              {/* Large quote mark */}
              <div
                className="font-[var(--font-display)] text-8xl font-bold leading-none mb-4 select-none"
                style={{ color: `${t.accentColor}20` }}
              >
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-white/80 text-base md:text-lg leading-relaxed font-[var(--font-body)] flex-1">
                {t.quote}
              </p>

              {/* Divider */}
              <div
                className="w-12 h-px my-6 opacity-40"
                style={{ background: t.accentColor }}
              />

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-[var(--font-display)] font-bold text-sm"
                  style={{
                    background: `${t.accentColor}18`,
                    border: `1px solid ${t.accentColor}30`,
                    color: t.accentColor,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-[var(--font-display)] font-semibold text-white text-sm">
                    {t.name}
                  </p>
                  <p className="text-muted text-xs font-[var(--font-body)] mt-0.5">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
