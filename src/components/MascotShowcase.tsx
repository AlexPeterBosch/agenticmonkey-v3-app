import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MascotInteractive from './MascotInteractive'

gsap.registerPlugin(ScrollTrigger)

export default function MascotShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
      },
    })

    // 1. Mascot slides in from left
    tl.from('.showcase-mascot', {
      x: -200,
      opacity: 0,
      duration: 1,
    })

    // 2. "We Don't Just Build AI" text reveals
    tl.from('.showcase-line-1', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1,
    }, '+=0.2')

    // 3. "We Engineer Autonomy"
    tl.from('.showcase-line-2', {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 1,
    }, '+=0.1')

    // 4. Stats count up
    tl.from('.showcase-stats', {
      opacity: 0,
      y: 30,
      duration: 0.5,
    })

    // Counter animations
    const counters = [
      { el: '.counter-1', target: 50 },
      { el: '.counter-2', target: 10 },
      { el: '.counter-3', target: 24 },
    ]

    counters.forEach(({ el, target }) => {
      tl.to(el, {
        textContent: target,
        duration: 1,
        snap: { textContent: 1 },
        ease: 'power2.out',
      }, '<')
    })

    // 5. Description fades in
    tl.from('.showcase-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '+=0.2')
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="min-h-screen overflow-hidden relative z-10 bg-black">
      <div ref={pinWrapRef} className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Mascot */}
            <div className="showcase-mascot relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-orange/5 rounded-3xl blur-3xl scale-110" />
              <div className="relative bg-[#0A0A0A] rounded-3xl p-8 md:p-12 border border-white/10">
                <MascotInteractive className="w-full max-w-md mx-auto drop-shadow-xl" />
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange font-[var(--font-display)] font-medium mb-4">
                Meet Your AI Partner
              </p>

              <h2 className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.9]">
                <span className="showcase-line-1 block" style={{ clipPath: 'inset(0 0 0 0)' }}>
                  We Don't Just
                  <span className="gradient-text block mt-2">Build AI.</span>
                </span>
                <span className="showcase-line-2 block mt-2" style={{ clipPath: 'inset(0 0 0 0)' }}>
                  We Engineer
                  <span className="text-stroke-visible block mt-2">Autonomy.</span>
                </span>
              </h2>

              <div className="showcase-desc">
                <p className="mt-8 text-lg text-muted leading-relaxed font-[var(--font-body)] max-w-lg">
                  AgenticMonkey is a lean AI implementation studio. We take businesses from
                  "we should probably use AI" to fully autonomous workflows — fast,
                  practical, no BS.
                </p>
                <p className="mt-4 text-lg text-muted leading-relaxed font-[var(--font-body)] max-w-lg">
                  Our agents don't just chat. They execute.
                </p>
              </div>

              <div className="showcase-stats mt-10 flex flex-wrap gap-6">
                <div>
                  <p className="font-[var(--font-display)] text-4xl font-bold text-orange">
                    <span className="counter-1">0</span>+
                  </p>
                  <p className="text-sm text-muted mt-1">Agents Deployed</p>
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-4xl font-bold text-orange">
                    <span className="counter-2">0</span>x
                  </p>
                  <p className="text-sm text-muted mt-1">Avg. Efficiency Gain</p>
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-4xl font-bold text-white">
                    <span className="counter-3">0</span>/7
                  </p>
                  <p className="text-sm text-muted mt-1">Autonomous Operation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
