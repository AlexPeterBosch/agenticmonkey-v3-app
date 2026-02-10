import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bot, Workflow, Database, Code2, Lightbulb, Plug } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Agents', 'Automation', 'Strategy']

const services = [
  { num: '01', title: 'AI Agent Development', desc: 'Custom autonomous agents that handle complex workflows, make decisions, and take action — without human intervention.', cat: 'Agents', icon: Bot, span: 'md:col-span-2 md:row-span-2' },
  { num: '02', title: 'Workflow Automation', desc: 'End-to-end automation pipelines that connect your tools and eliminate manual work.', cat: 'Automation', icon: Workflow, span: '' },
  { num: '03', title: 'RAG & Knowledge Systems', desc: 'Turn your documents into queryable, context-aware AI knowledge bases.', cat: 'Agents', icon: Database, span: '' },
  { num: '04', title: 'Full-Stack Development', desc: 'Modern web applications and APIs built with cutting-edge tech stacks, designed for scale.', cat: 'Automation', icon: Code2, span: 'md:col-span-2' },
  { num: '05', title: 'AI Strategy Consulting', desc: 'Expert guidance on where AI fits — practical roadmaps, not hype.', cat: 'Strategy', icon: Lightbulb, span: '' },
  { num: '06', title: 'Custom Integrations', desc: 'Seamless connections between your existing tools and new AI capabilities.', cat: 'Automation', icon: Plug, span: '' },
]

export default function Services() {
  const [active, setActive] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)
  const filtered = active === 'All' ? services : services.filter(s => s.cat === active)

  useGSAP(() => {
    gsap.from('.services-heading', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.services-heading',
        start: 'top 85%',
        end: 'top 50%',
        scrub: true,
      },
    })

    ScrollTrigger.batch('.service-card', {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        })
      },
      start: 'top 90%',
      once: true,
    })
  }, { scope: sectionRef, dependencies: [active] })

  return (
    <section id="services" ref={sectionRef} className="bg-black text-white py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="services-heading">
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight">
            What We
            <span className="text-orange block">Build</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-10 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all font-[var(--font-body)] ${
                active === cat
                  ? 'bg-orange text-white'
                  : 'bg-white/5 text-[#888] hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]">
          {filtered.map((service) => (
            <div
              key={service.num}
              className={`service-card group ${service.span}`}
            >
              <div className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-10 border border-white/10 hover:border-orange/30 transition-all hover:shadow-[0_0_30px_rgba(255,107,44,0.1)] h-full flex flex-col justify-between overflow-hidden">
                <span className="font-[var(--font-display)] text-7xl md:text-8xl font-bold text-white/[0.03] absolute -top-2 -right-2">
                  {service.num}
                </span>
                <div>
                  <div className="w-14 h-14 bg-orange/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange/20 group-hover:scale-110 transition-all">
                    <service.icon className="w-7 h-7 text-orange" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold mb-3 group-hover:text-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-base leading-relaxed font-[var(--font-body)]">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="text-white/20 group-hover:text-orange group-hover:translate-x-2 transition-all text-xl inline-block">
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
