import { useRef } from 'react'
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

      {/* ============ TWO-COLUMN LAYOUT ============ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - BIG MASCOT */}
          <div className="w-full lg:w-[45%] order-1 lg:order-1">
            <div
              ref={mascotRef}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative"
            >
              <AnimatedMascot className="w-full h-full" />
            </div>
          </div>

          {/* RIGHT COLUMN - TEXT CONTENT */}
          <div className="w-full lg:w-[55%] order-2 lg:order-2 text-center lg:text-left">
            {/* AGENTIC */}
            <div className="agentic-text">
              <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
                <SplitText
                  text="AGENTIC"
                  id="agentic"
                  className="text-[clamp(2.5rem,10vw,7rem)] text-white"
                />
              </h1>
            </div>

            {/* MONKEY */}
            <div className="monkey-text">
              <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
                <SplitText
                  text="MONKEY"
                  id="monkey"
                  className="text-[clamp(3rem,11vw,8rem)] gradient-text"
                />
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle mt-6 text-base md:text-xl lg:text-2xl text-[#888] font-[var(--font-body)] tracking-[0.25em] uppercase">
              WE DON'T JUST BUILD AI.<br />
              WE ENGINEER AUTONOMY.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-orange">50+</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-1">Agents</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-orange">10x</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-1">Efficiency</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-orange">24/7</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-1">Operation</div>
              </div>
            </div>

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
