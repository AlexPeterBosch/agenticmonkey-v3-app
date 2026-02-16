import { useRef, useState, useCallback } from 'react'
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
  const toRef = useRef<HTMLSpanElement>(null)
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const loopVideoRef = useRef<HTMLVideoElement>(null)
  const [introEnded, setIntroEnded] = useState(false)

  const handleIntroEnd = useCallback(() => {
    setIntroEnded(true)
    if (loopVideoRef.current) {
      loopVideoRef.current.currentTime = 0
      loopVideoRef.current.play()
    }
  }, [])

  useGSAP(() => {
    // Hide navbar initially, fade in after 2.5s of video playing
    const navEl = document.querySelector('nav')
    if (navEl) {
      navEl.style.opacity = '0'
      navEl.style.transform = 'translateY(-20px)'
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Step 1: "WELCOME" flash — faster
    tl.to(welcomeRef.current, {
      opacity: 1,
      duration: 0.3,
    })
    .to(welcomeRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.6,
    })

    // Step 2: "TO" flash — faster
    tl.to(toRef.current, {
      opacity: 1,
      duration: 0.3,
    })
    .to(toRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.5,
    })

    // Fade out overlay — start video + text immediately
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onStart: () => {
        if (introVideoRef.current) {
          introVideoRef.current.currentTime = 0
          introVideoRef.current.play()
        }
        // Fade in navbar 2.5s after video starts
        const navEl = document.querySelector('nav')
        if (navEl) {
          setTimeout(() => {
            gsap.to(navEl, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
          }, 2500)
        }
      },
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none'
        }
      },
    })

    // AGENTIC + MONKEY appear immediately as overlay fades — no gap
    tl.from('.agentic-char', {
      y: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.04,
    }, '-=0.3')

    tl.from('.monkey-char', {
      y: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.04,
    }, '-=0.4')

    // Subtitle
    tl.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.4,
    }, '-=0.3')

    // CTA
    tl.from('.hero-cta', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)',
    }, '-=0.2')

    // Scroll indicator
    tl.from('.scroll-indicator', {
      opacity: 0,
      duration: 0.3,
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
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Intro overlay — WELCOME TO */}
      <div ref={overlayRef} className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center pointer-events-none">
        <span ref={welcomeRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase opacity-0">
          WELCOME
        </span>
        <span ref={toRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase absolute opacity-0">
          TO
        </span>
      </div>

      {/* Ambient background glow */}
      <div className="hero-ambient" />
      
      {/* Subtle grid */}
      <div className="hero-grid" />

      {/* Film grain overlay */}
      <div className="film-grain absolute inset-0 pointer-events-none z-40" />

      {/* Floating particles — z-30 so they render OVER the video */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-orange/60 z-30 pointer-events-none"
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
        <div className="agentic-text mb-4">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText
              text="AGENTIC"
              id="agentic"
              className="text-[clamp(3rem,12vw,10rem)] text-white"
            />
          </h1>
        </div>

        {/* Mascot animation video */}
        <div className="mascot-video relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto -my-2 md:-my-4"
          style={{
            mask: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)',
            WebkitMask: 'radial-gradient(ellipse 90% 90% at center, black 60%, transparent 100%)',
          }}
        >
          {/* Intro — plays once */}
          <video
            ref={introVideoRef}
            muted
            playsInline
            preload="auto"
            autoPlay
            onEnded={handleIntroEnd}
            className="w-full h-auto"
            style={{ display: introEnded ? 'none' : 'block' }}
          >
            <source src="/mascot-intro.mp4?v=6" type="video/mp4" />
          </video>
          {/* Loop — plays forever after intro ends */}
          <video
            ref={loopVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-auto"
            style={{ display: introEnded ? 'block' : 'none' }}
          >
            <source src="/mascot-loop.mp4?v=6" type="video/mp4" />
          </video>
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
