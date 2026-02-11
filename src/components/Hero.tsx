import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

function SplitText({ text, className, id }: { text: string; className?: string; id: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className || ''}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`${id}-char inline-block`}
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
  const mascotRef = useRef<HTMLImageElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // AGENTIC chars stagger in
    tl.from('.agentic-char', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
    })

    // Mascot scale in
    tl.from(mascotRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=0.5')

    // MONKEY chars stagger in
    tl.from('.monkey-char', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
    }, '-=0.5')

    // Subtitle
    tl.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, '-=0.3')

    // CTA
    tl.from('.hero-cta', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(2)',
    }, '-=0.2')

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
        gsap.set(mascotRef.current, { y: p * -200 })
        gsap.set('.hero-subtitle', { y: p * -40 })
        gsap.set('.hero-cta', { y: p * -30 })
      },
    })
  }, { scope: heroRef })

  // Mouse follow tilt
  useEffect(() => {
    if (!mascotRef.current) return
    xTo.current = gsap.quickTo(mascotRef.current, 'rotateY', { duration: 0.3, ease: 'power2.out' })
    yTo.current = gsap.quickTo(mascotRef.current, 'rotateX', { duration: 0.3, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      xTo.current?.(dx * 15)
      yTo.current?.(-dy * 10)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
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

      <div className="relative z-10 text-center max-w-7xl mx-auto w-full">
        {/* AGENTIC */}
        <div className="agentic-text">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText
              text="AGENTIC"
              id="agentic"
              className="text-[clamp(3rem,12vw,10rem)] text-white"
            />
          </h1>
        </div>

        {/* Mascot */}
        <div className="relative z-20 -my-4 md:-my-12" style={{ perspective: 1000 }}>
          {/* Pulsing glow behind mascot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="mascot-hero-glow animate-glow-pulse" />
          </div>
          <div className="animate-float">
            <img
              ref={mascotRef}
              src="/mascot-hero-v3.png"
              alt="AgenticMonkey — AI Automation Agency Mascot"
              className="mx-auto w-56 h-56 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] object-contain relative z-10"
              style={{
                willChange: 'transform',
                filter: 'drop-shadow(0 20px 60px rgba(255, 107, 44, 0.35))',
                mixBlendMode: 'lighten',
              }}
            />
          </div>
          <div className="mascot-pedestal" />
        </div>

        {/* MONKEY */}
        <div className="monkey-text">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText
              text="MONKEY"
              id="monkey"
              className="text-[clamp(3rem,12vw,10rem)] gradient-text"
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

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 animate-bounce-slow">
          <div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  )
}
