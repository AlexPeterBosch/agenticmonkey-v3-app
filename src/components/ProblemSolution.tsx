import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const themItems = ['Chatbot templates', 'Cookie-cutter workflows', 'Monthly retainers']
const usItems = ['Custom autonomous agents', 'Production-grade systems', 'You own everything']

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Left text clip-path reveal from left
    gsap.from('.ps-headline', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ps-headline',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.ps-subline', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.ps-subline',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Right comparison boxes
    gsap.from('.ps-them-box', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.ps-them-box',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.ps-us-box', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.15,
      scrollTrigger: {
        trigger: '.ps-us-box',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="problem-section py-20 md:py-28 relative z-10 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Bold statement */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-8">
              The Reality Check
            </p>
            <h2
              className="ps-headline font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              Most AI agencies<br />
              <span className="text-white/40">sell features.</span>
            </h2>
            <h2
              className="ps-subline font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mt-4"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              We engineer<br />
              <span className="gradient-text">systems that think.</span>
            </h2>
            <p className="mt-8 text-white/50 text-lg leading-relaxed font-[var(--font-body)] max-w-md">
              There's a difference between bolting on a chatbot and building intelligence into the core of your operations.
            </p>
          </div>

          {/* Right — Comparison */}
          <div className="flex flex-col gap-4">
            {/* THEM box */}
            <div className="ps-them-box relative rounded-2xl p-6 md:p-8 border border-white/10 bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-white/40 font-[var(--font-display)]">
                  THEM
                </span>
              </div>
              <ul className="space-y-3">
                {themItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <X className="w-3 h-3 text-red-400" />
                    </span>
                    <span className="text-white/40 font-[var(--font-body)] line-through decoration-white/20">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* US box */}
            <div className="ps-us-box relative rounded-2xl p-6 md:p-8 border border-orange/20 bg-gradient-to-br from-[#0A0A0A] to-[#111] shadow-[0_0_40px_rgba(255,107,44,0.08)]">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-xs font-bold tracking-[0.2em] uppercase text-orange font-[var(--font-display)]">
                  US
                </span>
              </div>
              <ul className="space-y-3">
                {usItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center">
                      <Check className="w-3 h-3 text-orange" />
                    </span>
                    <span className="text-white font-[var(--font-body)] font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
