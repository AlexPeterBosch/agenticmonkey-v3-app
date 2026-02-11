import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MascotInteractive from './MascotInteractive'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading
    gsap.from('.cta-heading', {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-heading',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Text and button
    gsap.from('.cta-text', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.cta-text',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.cta-button', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3,
      scrollTrigger: {
        trigger: '.cta-button',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    // Mascot parallax
    gsap.from('.cta-mascot', {
      y: 60,
      rotate: 10,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Text scale on approach
    gsap.from('.cta-heading h2', {
      scale: 0.9,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'top 30%',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden z-10 bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-orange/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <div className="cta-heading">
              <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                Ready To
                <span className="gradient-text block mt-2">Build?</span>
              </h2>
            </div>
            <p className="cta-text mt-8 text-lg md:text-xl text-muted font-[var(--font-body)] max-w-xl">
              Let's talk about your automation goals. No pitch decks, no fluff —
              just a real conversation about what AI can do for your business.
            </p>
            <div className="cta-button mt-10">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange hover:bg-orange-dark text-white px-12 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 animate-pulse-glow"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>

          <div className="cta-mascot lg:col-span-2 flex justify-center lg:justify-end">
            <MascotInteractive className="w-64 md:w-80 lg:w-96 drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
