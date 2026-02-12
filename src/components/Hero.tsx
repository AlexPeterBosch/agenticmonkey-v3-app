import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

function SplitText({ text, className, id }: { text: string; className?: string; id: string }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`${id}-char inline-block ${className || ''}`}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const agenticRef = useRef<HTMLDivElement>(null)
  const monkeyBlockRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hide navbar immediately — force it hidden even if it mounted late
    const navEl = document.querySelector('nav')
    if (navEl) {
      navEl.style.opacity = '0'
      navEl.style.transform = 'translateY(-20px)'
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Step 1: Welcome Flash (perfect — don't touch)
    tl.to(welcomeRef.current, {
      opacity: 1,
      duration: 0.3,
    })
    .to(welcomeRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 1.0,
    })

    // Step 2: "TO" flash (perfect — don't touch)
    tl.to(countRef.current, {
      opacity: 1,
      duration: 0.3,
    })
    .to(countRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.8,
    })

    // Fade out the overlay — immediate, no dead pause
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none'
        }
      },
    })

    // Step 3: "AGENTIC" slides DOWN from top — SLOW elevator
    // duration 4s so it crawls down gracefully
    tl.to(agenticRef.current, {
      y: 0,
      duration: 4,
      ease: 'power2.inOut',
    }, '-=0.3')

    // Step 4: "MONKEY" rises UP — starts as soon as AGENTIC becomes visible
    // AGENTIC starts at -100vh, so ~0.8s in it peeks onto screen → MONKEY starts
    tl.to(monkeyBlockRef.current, {
      y: 0,
      duration: 4,
      ease: 'power2.inOut',
    }, '<0.8')

    // Step 5: BOUNCE impact when MONKEY arrives
    tl.to('.monkey-text', {
      y: -20,
      scaleY: 0.9,
      scaleX: 1.05,
      duration: 0.15,
      ease: 'power2.in',
    })
    .to('.monkey-text', {
      y: 0,
      scaleY: 1,
      scaleX: 1,
      duration: 0.6,
      ease: 'bounce.out',
    })

    // Step 6: Subtitle + CTA settle
    tl.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    }, '<0.1')
    .from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    }, '<0.1')

    // Step 7: Navbar fades in AFTER monkey bounce
    tl.to('nav', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })

    // Scroll indicator
    tl.from('.scroll-indicator', {
      opacity: 0,
      duration: 0.5,
    })

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set('.agentic-text', { y: p * -80 })
        gsap.set('.monkey-text', { y: p * -60 })
        gsap.set('.hero-subtitle', { y: p * -40 })
        gsap.set('.hero-cta', { y: p * -30 })
      },
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Intro overlay */}
      <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center pointer-events-none">
        <span ref={welcomeRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase opacity-0">
          WELCOME
        </span>
        <span ref={countRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase absolute opacity-0">
          TO
        </span>
      </div>

      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none z-40" />

      {/* Atmospheric glow blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px]" />
      <div className="absolute top-10 right-20 w-48 h-48 bg-orange/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-orange/3 rounded-full blur-[100px]" />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-orange/60"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-random ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(255, 107, 44, 0.4)`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* AGENTIC - slides from top */}
        <div 
          ref={agenticRef} 
          className="agentic-text"
          style={{ transform: 'translateY(-100vh)', willChange: 'transform' }}
        >
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter text-[clamp(3rem,12vw,10rem)] text-white">
            <SplitText
              text="AGENTIC"
              id="agentic"
            />
          </h1>
        </div>
        
        {/* Space for mascot video (Phase 2 — Veo 3 or new approach) */}
        <div className="h-32 md:h-48 lg:h-64" />
        
        {/* MONKEY + subtitle + CTA - rises from bottom */}
        <div 
          ref={monkeyBlockRef}
          style={{ transform: 'translateY(100vh)', willChange: 'transform' }}
        >
          <div className="monkey-text" style={{ willChange: 'transform' }}>
            <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter text-[clamp(3.5rem,13vw,11rem)]">
              <SplitText
                text="MONKEY"
                id="monkey"
                className="gradient-text"
              />
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle mt-8 text-lg md:text-2xl text-[#888] font-[var(--font-body)] tracking-[0.25em] uppercase">
            Engineers of Autonomy
          </p>

          {/* CTA buttons */}
          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange hover:bg-orange-dark text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 animate-pulse-glow"
            >
              Book a Consultation
            </a>
            <a
              href="#services"
              className="inline-block border border-white/20 hover:border-orange/50 text-white/80 hover:text-white px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 animate-bounce-slow">
          <div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
