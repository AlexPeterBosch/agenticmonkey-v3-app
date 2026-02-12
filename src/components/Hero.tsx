import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleField from './ParticleField'
import AnimatedMascot from './AnimatedMascot'
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
  const mascotRef = useRef<HTMLDivElement>(null)
  const tubeRef = useRef<HTMLDivElement>(null)
  const tubeTrackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // AGENTIC chars stagger in
    tl.from('.agentic-char', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
    })

    // Mascot dramatic entrance (scale from 0.5 → 1, opacity 0 → 1, with overshoot)
    tl.from(mascotRef.current, {
      scale: 0.5,
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'back.out(2)',
    }, '-=0.5')

    // Tube lights up
    tl.from(tubeRef.current, {
      opacity: 0,
      duration: 0.8,
    }, '-=0.8')

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

  }, { scope: heroRef })

  // Mascot rides down the tube on scroll with parallax depth effect
  useEffect(() => {
    if (!mascotRef.current || !tubeTrackRef.current) return

    // Parallax: mascot moves slower than background (0.6x speed)
    const parallaxSpeed = 0.6
    
    const st = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        if (!mascotRef.current || !tubeTrackRef.current) return
        const trackHeight = tubeTrackRef.current.clientHeight
        const mascotHeight = mascotRef.current.clientHeight
        const maxTravel = trackHeight - mascotHeight - 40 // 40px padding
        const y = self.progress * maxTravel * parallaxSpeed // Slower movement
        gsap.set(mascotRef.current, { y })
      },
    })

    return () => st.kill()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 px-4">
      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none z-40" />

      {/* Particle field behind mascot */}
      <ParticleField count={45} className="z-20" />

      {/* Atmospheric glow blurs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-orange/8 rounded-full blur-[120px]" />
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

      {/* ============ THE TUBE (fixed right side) ============ */}
      <div
        ref={tubeRef}
        className="fixed right-[4%] top-0 h-screen z-30 pointer-events-none hidden lg:block"
        style={{ width: '180px' }}
      >
        {/* Tube structure */}
        <div className="absolute inset-0 flex justify-between">
          {/* Left wall */}
          <div
            className="w-[3px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 2%, rgba(255, 107, 44, 0.4) 10%, rgba(255, 107, 44, 0.6) 50%, rgba(255, 107, 44, 0.4) 90%, transparent 98%)',
              boxShadow: '0 0 12px rgba(255, 107, 44, 0.3), 0 0 30px rgba(255, 107, 44, 0.1)',
            }}
          />
          {/* Right wall */}
          <div
            className="w-[3px] h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 2%, rgba(255, 107, 44, 0.4) 10%, rgba(255, 107, 44, 0.6) 50%, rgba(255, 107, 44, 0.4) 90%, transparent 98%)',
              boxShadow: '0 0 12px rgba(255, 107, 44, 0.3), 0 0 30px rgba(255, 107, 44, 0.1)',
            }}
          />
        </div>

        {/* Tube inner glow */}
        <div
          className="absolute inset-x-[3px] inset-y-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 5%, rgba(255, 107, 44, 0.03) 20%, rgba(255, 107, 44, 0.05) 50%, rgba(255, 107, 44, 0.03) 80%, transparent 95%)',
          }}
        />

        {/* Horizontal light bars (like elevator markers) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-[1px]"
            style={{
              top: `${12.5 * (i + 1)}%`,
              background: 'linear-gradient(to right, rgba(255,107,44,0.3) 0%, rgba(255,107,44,0.08) 30%, rgba(255,107,44,0.08) 70%, rgba(255,107,44,0.3) 100%)',
            }}
          />
        ))}

        {/* Green status dots along the tube (like Shieldeum) */}
        <div className="absolute right-[-20px] top-[15%] w-2.5 h-2.5 rounded-full bg-orange/80 shadow-[0_0_8px_rgba(255,107,44,0.6)]" />
        <div className="absolute right-[-20px] top-[35%] w-2.5 h-2.5 rounded-full bg-orange/80 shadow-[0_0_8px_rgba(255,107,44,0.6)]" />
        <div className="absolute right-[-20px] top-[55%] w-2.5 h-2.5 rounded-full bg-orange/60 shadow-[0_0_8px_rgba(255,107,44,0.4)]" />
        <div className="absolute right-[-20px] top-[75%] w-2.5 h-2.5 rounded-full bg-orange/60 shadow-[0_0_8px_rgba(255,107,44,0.4)]" />

        {/* Mascot track area */}
        <div ref={tubeTrackRef} className="absolute inset-x-[6px] top-[8%] bottom-[8%]">
          {/* The mascot inside the tube */}
          <div
            ref={mascotRef}
            className="w-full aspect-square relative"
          >
            <AnimatedMascot className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT (left-aligned) ============ */}
      <div className="relative z-10 max-w-5xl mx-auto w-full lg:pr-[220px]">
        {/* AGENTIC */}
        <div className="agentic-text text-center lg:text-left">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText
              text="AGENTIC"
              id="agentic"
              className="text-[clamp(3rem,12vw,10rem)] text-white"
            />
          </h1>
        </div>

        {/* MONKEY */}
        <div className="monkey-text text-center lg:text-left">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText
              text="MONKEY"
              id="monkey"
              className="text-[clamp(3.5rem,13vw,11rem)] gradient-text"
            />
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 text-lg md:text-2xl text-[#888] font-[var(--font-body)] tracking-[0.25em] uppercase text-center lg:text-left">
          Engineers of Autonomy
        </p>

        {/* CTA buttons */}
        <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
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

        {/* Mobile mascot (no tube on small screens) */}
        <div className="lg:hidden mt-12 flex justify-center">
          <div className="w-56 h-56 md:w-72 md:h-72">
            <AnimatedMascot className="w-full h-full" />
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
