import { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>{}[]アイウエオカキクケコ'

function SplitText({ text, className, id }: { text: string; className?: string; id: string }) {
  return (
    <span className="inline-block">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`${id}-char inline-block ${className || ''}`}
          style={{ display: 'inline-block' }}
          data-char={char}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

function glitchText(selector: string, durationMs: number, resolve: boolean = true) {
  const chars = document.querySelectorAll(selector) as NodeListOf<HTMLElement>
  if (!chars.length) return null
  const originals = Array.from(chars).map(el => el.dataset.char || el.textContent || '')
  const startTime = Date.now()
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / durationMs, 1)
    chars.forEach((el, i) => {
      if (resolve) {
        const resolveAt = 0.3 + (i / chars.length) * 0.6
        if (progress >= resolveAt) {
          el.textContent = originals[i] === ' ' ? '\u00A0' : originals[i]
          el.style.textShadow = ''
          el.style.opacity = '1'
          return
        }
      }
      el.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      el.style.textShadow = Math.random() > 0.5
        ? '0 0 8px rgba(255,107,44,0.8), 0 0 20px rgba(255,107,44,0.3)'
        : '0 0 8px rgba(0,255,200,0.6), 0 0 20px rgba(0,255,200,0.2)'
      el.style.opacity = `${0.6 + Math.random() * 0.4}`
    })
    if (resolve && progress >= 1) {
      clearInterval(interval)
      chars.forEach((el, i) => {
        el.textContent = originals[i] === ' ' ? '\u00A0' : originals[i]
        el.style.textShadow = ''
        el.style.opacity = '1'
      })
    }
  }, 35)
  return interval
}

function createCharacterExplosion(charSelector: string = '.monkey-char') {
  const chars = document.querySelectorAll(charSelector) as NodeListOf<HTMLElement>
  if (!chars.length) return

  const firstChar = chars[0]?.getBoundingClientRect()
  const lastChar = chars[chars.length - 1]?.getBoundingClientRect()
  const cx = firstChar && lastChar ? (firstChar.left + lastChar.right) / 2 : window.innerWidth * 0.75
  const cy = firstChar ? (firstChar.top + firstChar.bottom) / 2 : window.innerHeight * 0.4

  // Brief white flash at epicenter
  const flash = document.createElement('div')
  Object.assign(flash.style, {
    position: 'fixed', left: `${cx}px`, top: `${cy}px`,
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,107,44,0.4) 50%, transparent 100%)',
    transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: '260',
  })
  document.body.appendChild(flash)
  gsap.to(flash, { scale: 8, opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => flash.remove() })

  // Matrix character explosion — spawn ~150 flying glitch characters
  const EXPLODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>{}[]アイウエオカキクケコサシスセソタチツテトナニヌネノ'
  const particleCount = 150
  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('span')
    const char = EXPLODE_CHARS[Math.floor(Math.random() * EXPLODE_CHARS.length)]
    el.textContent = char
    const fontSize = 10 + Math.random() * 40 // mix of sizes
    const isOrange = Math.random() > 0.3
    const isCyan = !isOrange && Math.random() > 0.5
    const color = isOrange
      ? `rgb(255,${(70 + Math.random() * 80) | 0},${(20 + Math.random() * 40) | 0})`
      : isCyan
        ? `rgb(0,${(200 + Math.random() * 55) | 0},${(180 + Math.random() * 75) | 0})`
        : `rgba(255,255,255,${0.5 + Math.random() * 0.5})`
    const glow = isOrange
      ? '0 0 12px rgba(255,107,44,0.9), 0 0 25px rgba(255,107,44,0.4)'
      : isCyan
        ? '0 0 10px rgba(0,255,200,0.8), 0 0 20px rgba(0,255,200,0.3)'
        : '0 0 8px rgba(255,255,255,0.5)'

    // Spread spawn origin across the MONKEY text area (not just center)
    const spawnX = firstChar && lastChar
      ? firstChar.left + Math.random() * (lastChar.right - firstChar.left)
      : cx + (Math.random() - 0.5) * 200
    const spawnY = firstChar
      ? firstChar.top + Math.random() * (firstChar.bottom - firstChar.top)
      : cy + (Math.random() - 0.5) * 40

    Object.assign(el.style, {
      position: 'fixed',
      left: `${spawnX}px`,
      top: `${spawnY}px`,
      fontSize: `${fontSize}px`,
      fontFamily: 'monospace',
      fontWeight: 'bold',
      color,
      textShadow: glow,
      pointerEvents: 'none',
      zIndex: '250',
      willChange: 'transform, opacity',
    })
    document.body.appendChild(el)

    // Explosion vector — spread in all directions, bias upward and outward
    const angle = Math.random() * Math.PI * 2
    const speed = 200 + Math.random() * 800
    const xDist = Math.cos(angle) * speed
    const yDist = Math.sin(angle) * speed - (100 + Math.random() * 200) // upward bias
    const spinDeg = (Math.random() - 0.5) * 1440 // wild rotation

    // Cycle through random chars while flying
    const charCycleInterval = setInterval(() => {
      el.textContent = EXPLODE_CHARS[Math.floor(Math.random() * EXPLODE_CHARS.length)]
    }, 50)

    gsap.to(el, {
      x: xDist,
      y: yDist,
      rotation: spinDeg,
      opacity: 0,
      scale: Math.random() * 0.5, // shrink as they fly
      duration: 0.8 + Math.random() * 1.5,
      ease: 'power3.out',
      onComplete: () => {
        clearInterval(charCycleInterval)
        el.remove()
      },
    })
  }

  // Extra: some characters "rain down" slowly like falling matrix code
  for (let i = 0; i < 30; i++) {
    const rain = document.createElement('span')
    rain.textContent = EXPLODE_CHARS[Math.floor(Math.random() * EXPLODE_CHARS.length)]
    const fontSize = 8 + Math.random() * 18
    const startX = firstChar && lastChar
      ? firstChar.left - 100 + Math.random() * (lastChar.right - firstChar.left + 200)
      : cx + (Math.random() - 0.5) * 400
    const startY = cy - 50 + Math.random() * 100

    Object.assign(rain.style, {
      position: 'fixed',
      left: `${startX}px`,
      top: `${startY}px`,
      fontSize: `${fontSize}px`,
      fontFamily: 'monospace',
      color: `rgba(255,107,44,${0.3 + Math.random() * 0.5})`,
      textShadow: '0 0 6px rgba(255,107,44,0.4)',
      pointerEvents: 'none',
      zIndex: '190',
    })
    document.body.appendChild(rain)

    const rainInterval = setInterval(() => {
      rain.textContent = EXPLODE_CHARS[Math.floor(Math.random() * EXPLODE_CHARS.length)]
    }, 80)

    gsap.to(rain, {
      y: 300 + Math.random() * 500,
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: 1.5 + Math.random() * 2.0,
      delay: Math.random() * 0.6,
      ease: 'power1.in',
      onComplete: () => {
        clearInterval(rainInterval)
        rain.remove()
      },
    })
  }
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLSpanElement>(null)
  const toRef = useRef<HTMLSpanElement>(null)
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const loopVideoRef = useRef<HTMLVideoElement>(null)
  const agenticRef = useRef<HTMLDivElement>(null)
  const monkeyGroupRef = useRef<HTMLDivElement>(null)
  const mascotRef = useRef<HTMLDivElement>(null)
  const platformRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const [introEnded, setIntroEnded] = useState(false)
  const splitTLRef = useRef<gsap.core.Timeline | null>(null)
  // Elevator scroll tracking
  const mascotLandingTopRef = useRef<number>(0)
  const mascotHasLandedRef = useRef<boolean>(false)
  const scrollTickerRef = useRef<gsap.TickerCallback | null>(null)
  const platOffsetRef = useRef<number>(0) // platform CSS top minus mascot CSS top at landing

  const handleIntroEnd = useCallback(() => {
    setIntroEnded(true)
    if (loopVideoRef.current) {
      loopVideoRef.current.currentTime = 0
      loopVideoRef.current.play()
    }
  }, [])

  useGSAP(() => {
    const navEl = document.querySelector('nav')
    if (navEl) {
      navEl.style.opacity = '0'
      navEl.style.transform = 'translateY(-20px)'
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // WELCOME flash
    tl.to(welcomeRef.current, { opacity: 1, duration: 0.2 })
      .to(welcomeRef.current, { opacity: 0, duration: 0.15, delay: 0.35 })

    // TO flash
    tl.to(toRef.current, { opacity: 1, duration: 0.2 })
      .to(toRef.current, { opacity: 0, duration: 0.15, delay: 0.3 })

    // Fade overlay → start video
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onStart: () => {
        if (introVideoRef.current) {
          introVideoRef.current.currentTime = 0
          introVideoRef.current.play()
        }
        const nav = document.querySelector('nav')
        if (nav) {
          setTimeout(() => {
            gsap.to(nav, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
          }, 2500)
        }
      },
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = 'none'
      },
    })

    // Text appears
    tl.from('.agentic-char', { y: 100, opacity: 0, duration: 0.5, stagger: 0.03 }, '-=0.2')
    tl.from('.monkey-char', { y: 100, opacity: 0, duration: 0.5, stagger: 0.03 }, '-=0.35')
    tl.from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.3 }, '-=0.25')
    tl.from('.hero-cta', { scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, '-=0.15')
    tl.from('.scroll-indicator', { opacity: 0, duration: 0.2 })

    // Fire split 1.5s after text appears
    tl.add(() => { splitTLRef.current?.play() }, '+=1.5')

    // ─── SPLIT TIMELINE ───
    const splitTL = gsap.timeline({ paused: true })
    splitTLRef.current = splitTL

    // Phase 1: AGENTIC slides LEFT, MONKEY+mascot slides RIGHT (0–1.2s)
    // Flags prevent double-firing between onUpdate (98%) and onComplete (fallback)
    let agenticExploded = false
    let monkeyExploded = false

    splitTL.to(agenticRef.current, {
      x: () => {
        const firstChar = document.querySelector('.agentic-char')
        if (!firstChar) return -500
        return -firstChar.getBoundingClientRect().left
      },
      duration: 1.0,
      ease: 'power4.in',
      onStart: () => { agenticExploded = false; glitchText('.agentic-char', 999999, false) },
      onUpdate: function(this: any) {
        // Fire at 98% progress — triggers AT wall impact, not 1 frame after
        if (!agenticExploded && this.progress() >= 0.98) {
          agenticExploded = true
          createCharacterExplosion('.agentic-char')
          gsap.set(agenticRef.current, { opacity: 0 })
        }
      },
      onComplete: () => {
        if (!agenticExploded) { // safety fallback
          agenticExploded = true
          createCharacterExplosion('.agentic-char')
          gsap.set(agenticRef.current, { opacity: 0 })
        }
      },
    }, 0)

    splitTL.to(monkeyGroupRef.current, {
      x: () => {
        const allChars = document.querySelectorAll('.monkey-char')
        const lastChar = allChars[allChars.length - 1]
        if (!lastChar) return 500
        return window.innerWidth - lastChar.getBoundingClientRect().right
      },
      duration: 1.0,
      ease: 'power4.in',
      onStart: () => { monkeyExploded = false; glitchText('.monkey-char', 999999, false) },
      onUpdate: function(this: any) {
        if (!monkeyExploded && this.progress() >= 0.98) {
          monkeyExploded = true
          createCharacterExplosion()
          gsap.set('.monkey-text', { opacity: 0 })
        }
      },
      onComplete: () => {
        if (!monkeyExploded) {
          monkeyExploded = true
          createCharacterExplosion()
          gsap.set('.monkey-text', { opacity: 0 })
        }
      },
    }, 0)

    // Fade out subtitle + CTA
    splitTL.to('.hero-subtitle', { opacity: 0, y: -20, duration: 0.3 }, 0)
    splitTL.to('.hero-cta', { opacity: 0, y: -20, duration: 0.3 }, 0)
    splitTL.to('.scroll-indicator', { opacity: 0, duration: 0.2 }, 0)

    // Mascot detaches and drops STRAIGHT DOWN onto platform — fires at 1.0s (when MONKEY hits edge)
    splitTL.add(() => {
      if (!mascotRef.current || !platformRef.current) return

      const mascotEl = mascotRef.current
      const mascotRect = mascotEl.getBoundingClientRect()

      // Reparent to body, lock at current screen position
      mascotEl.style.position = 'fixed'
      mascotEl.style.left = `${mascotRect.left}px`
      mascotEl.style.top = `${mascotRect.top}px`
      mascotEl.style.width = `${mascotRect.width}px`
      mascotEl.style.height = `${mascotRect.height}px`
      mascotEl.style.zIndex = '25'
      mascotEl.style.margin = '0'
      mascotEl.style.maxWidth = 'none'
      document.body.appendChild(mascotEl)
      gsap.set(mascotEl, { x: 0, y: 0 })

      // Move platform to be directly under the mascot (not the other way around)
      const platEl = platformRef.current
      // Platform is ~35% of mascot width, centered under the feet
      const platWidth = mascotRect.width * 0.35
      const platLeft = mascotRect.left + (mascotRect.width - platWidth) / 2 + 40
      platEl.style.left = `${platLeft}px`
      platEl.style.right = 'auto'
      platEl.style.bottom = 'auto'
      platEl.style.top = `${window.innerHeight * 0.82}px` // 82% down the viewport
      platEl.style.width = `${platWidth}px` // just under the feet

      const platRect = platEl.getBoundingClientRect()

      // Drop STRAIGHT DOWN — only animate top, keep left EXACTLY the same
      const landingY = platRect.top - mascotRect.height + 120
      gsap.to(mascotEl, {
        top: landingY,
        duration: 0.6,
        ease: 'power3.in', // accelerate downward like gravity
        onComplete: () => {
          // Bounce on impact
          gsap.to(mascotEl, {
            y: -20,
            duration: 0.1,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(mascotEl, {
                y: 0, duration: 0.35, ease: 'bounce.out',
                onComplete: () => {
                  // Lock in the final landing position for scroll-driven elevator descent
                  mascotLandingTopRef.current = parseFloat(mascotEl.style.top || '0')
                  // Store offset (transform stays active — no clearing needed)
                  const platEl = platformRef.current
                  if (platEl) {
                    platOffsetRef.current = parseFloat(platEl.style.top || '0') - mascotLandingTopRef.current
                  }
                  mascotHasLandedRef.current = true
                }
              })
            }
          })
        }
      })

      // Pre-position the tube at the exact landing geometry so it fades in glitch-free.
      // Without this, it briefly shows at the JSX default (500px tall, top:50%) before
      // the scroll ticker corrects it on the first frame after landing.
      {
        const mascotFeetAtLanding = landingY + mascotRect.height
        const tubeVisTop = mascotFeetAtLanding - 5
        const initTubeH = Math.max(10, window.innerHeight + 60 - tubeVisTop)
        platEl.style.top = `${tubeVisTop + initTubeH / 2}px`
        const initTubeEl = platEl.querySelector('.elevator-tube') as HTMLElement
        if (initTubeEl) initTubeEl.style.height = `${initTubeH}px`
      }

      // Platform appears just before mascot lands
      gsap.to(platEl, { opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.25 })

      // Platform is now a simple line — no animation needed
    }, 1.0)

    // Phase 3: Scrambled text block shoots from RIGHT → LEFT, resolves into tagline
    splitTL.add(() => {
      if (!taglineRef.current) return
      const tagEl = taglineRef.current

      // Make visible, position off-screen right
      tagEl.style.opacity = '1'
      gsap.set(tagEl, { x: window.innerWidth + 200 })

      // Start glitching all tagline chars immediately
      const tagChars = tagEl.querySelectorAll('.tagline-char') as NodeListOf<HTMLElement>
      const originals = Array.from(tagChars).map(el => el.dataset.char || el.textContent || '')

      // Start the scramble — all chars cycling randomly
      const glitchInterval = setInterval(() => {
        tagChars.forEach((el) => {
          el.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          el.style.textShadow = Math.random() > 0.5
            ? '0 0 8px rgba(255,107,44,0.8), 0 0 20px rgba(255,107,44,0.3)'
            : '0 0 8px rgba(0,255,200,0.6), 0 0 20px rgba(0,255,200,0.2)'
          el.style.opacity = `${0.6 + Math.random() * 0.4}`
        })
      }, 35)

      // Fade out AGENTIC text as tagline comes in
      gsap.to(agenticRef.current, { opacity: 0, duration: 0.4 })

      // Shoot from right to left position
      gsap.to(tagEl, {
        x: 0,
        duration: 0.8,
        ease: 'power4.out', // fast entry, decelerates into position
        onComplete: () => {
          // Now resolve characters RIGHT-TO-LEFT with stagger
          // Last char (end of "Workforce") resolves first, sweeps left to "Deploy"
          const resolveDuration = 1200 // 1.2s to resolve all chars
          const totalChars = tagChars.length
          const startTime = Date.now()

          const resolveInterval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / resolveDuration, 1)
            let allResolved = true

            tagChars.forEach((el, i) => {
              // Reverse: last char (totalChars-1) resolves at progress 0, first char resolves last
              const reverseIndex = totalChars - 1 - i
              const resolveAt = (reverseIndex / totalChars) * 0.85 // stagger across 85% of duration
              if (progress >= resolveAt) {
                el.textContent = originals[i] === ' ' ? '\u00A0' : originals[i]
                el.style.textShadow = ''
                el.style.opacity = '1'
                el.style.color = '' // reset to CSS color
              } else {
                allResolved = false
              }
            })

            if (allResolved || progress >= 1) {
              clearInterval(resolveInterval)
              clearInterval(glitchInterval)
              // Final cleanup — ensure all chars are correct
              tagChars.forEach((el, i) => {
                el.textContent = originals[i] === ' ' ? '\u00A0' : originals[i]
                el.style.textShadow = ''
                el.style.opacity = '1'
                el.style.color = ''
              })
              // Fade in subtext + CTA after resolve
              gsap.to('.tagline-sub', { opacity: 1, y: 0, duration: 0.5, delay: 0.2 })
              gsap.fromTo('.tagline-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.5 })
            }
          }, 35)
        }
      })
    }, 1.8) // fires 0.8s after explosion (gives mascot time to start dropping)

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
      },
    })

    // Hide tagline when scrolling past hero
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'bottom 80%',
      end: 'bottom top',
      onLeave: () => {
        gsap.to(taglineRef.current, { opacity: 0, duration: 0.3 })
      },
      onEnterBack: () => {
        gsap.to(taglineRef.current, { opacity: 1, duration: 0.3 })
      },
    })

    // ─── ELEVATOR SCROLL — mascot descends to PartnersMarquee, sticks to it ───
    const partnersEl = document.getElementById('partners-marquee')
    if (partnersEl) {
      const elevatorTicker: gsap.TickerCallback = () => {
        const mascotEl = mascotRef.current
        const platEl = platformRef.current
        if (!mascotEl || !mascotHasLandedRef.current) return

        const partnersRect = partnersEl.getBoundingClientRect()
        const mascotH = mascotEl.offsetHeight
        const landingTop = mascotLandingTopRef.current
        // Monkey stops 30px above section — only the top rim of the tube
        // will be visible above "POWERED BY" once the section scrolls up
        const sectionTrackingTop = partnersRect.top - mascotH - 30
        const scrollDrivenTop = landingTop + window.scrollY * 0.6

        // 1:1 descent until tracking position, then glue to section
        const newMascotTop = Math.min(scrollDrivenTop, sectionTrackingTop)
        mascotEl.style.top = `${newMascotTop}px`

        // Tube: top at mascot feet, always extends to viewport bottom + 60
        // so it looks like it goes into the floor.
        // Clip-path clips the tube at the section boundary — "sinking" effect.
        if (platEl) {
          const mascotFeetY = newMascotTop + mascotH
          const tubeVisualTop = mascotFeetY - 5         // slight overlap with feet
          const tubeH = Math.max(10, window.innerHeight + 60 - tubeVisualTop)
          // translateY(-50%) active → css_top = visualTop + height/2
          platEl.style.top = `${tubeVisualTop + tubeH / 2}px`
          // Clip at section boundary so tube appears to sink into the floor
          if (partnersRect.top < window.innerHeight) {
            const clipFromBottom = (tubeVisualTop + tubeH) - partnersRect.top
            platEl.style.clipPath = `inset(0 0 ${clipFromBottom}px 0)`
          } else {
            platEl.style.clipPath = 'none'
          }
          const tubeEl = platEl.querySelector('.elevator-tube') as HTMLElement
          if (tubeEl) tubeEl.style.height = `${tubeH}px`
        }

        // Fade out once section has fully scrolled past viewport
        if (partnersRect.bottom < -80) {
          mascotEl.style.opacity = '0'
          if (platEl) platEl.style.opacity = '0'
        } else if (partnersRect.top < window.innerHeight + 50) {
          mascotEl.style.opacity = '1'
          if (platEl) platEl.style.opacity = '1'
        }
      }

      gsap.ticker.add(elevatorTicker)
      scrollTickerRef.current = elevatorTicker
    }

    return () => {
      if (scrollTickerRef.current) gsap.ticker.remove(scrollTickerRef.current)
    }
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-black">
      {/* Intro overlay */}
      <div ref={overlayRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none">
        <span ref={welcomeRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase opacity-0">
          WELCOME
        </span>
        <span ref={toRef} className="text-white font-[var(--font-display)] text-[clamp(4rem,15vw,12rem)] font-bold uppercase absolute opacity-0">
          TO
        </span>
      </div>

      <div className="film-grain absolute inset-0 pointer-events-none z-40" />

      {/* Floating particles */}
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
        <div ref={agenticRef} className="agentic-text mb-4">
          <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
            <SplitText text="AGENTIC" id="agentic" className="text-[clamp(3rem,12vw,10rem)] text-white" />
          </h1>
        </div>

        {/* MONKEY + MASCOT group — moves right together */}
        <div ref={monkeyGroupRef}>
          {/* Mascot video — has its own ref so it can drop independently */}
          <div ref={mascotRef} className="mascot-video relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto -my-2 md:-my-4"
            style={{
              background: '#000000',
              overflow: 'hidden',
              mask: 'radial-gradient(ellipse 85% 80% at center 45%, black 50%, transparent 90%)',
              WebkitMask: 'radial-gradient(ellipse 85% 80% at center 45%, black 50%, transparent 90%)',
            }}
          >
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

          {/* MONKEY text */}
          <div className="monkey-text">
            <h1 className="font-[var(--font-display)] font-bold uppercase leading-[0.85] tracking-tighter">
              <SplitText text="MONKEY" id="monkey" className="text-[clamp(3rem,12vw,10rem)] gradient-text" />
            </h1>
          </div>
        </div>

        {/* Elevator tube — fixed container for mascot descent */}
        <div ref={platformRef} className="fixed z-20" style={{ right: '3%', top: '50%', transform: 'translateY(-50%)', opacity: 0 }}>
          <div className="elevator-tube relative" style={{ width: '100%', height: '500px' }}>
            {/* Tube glass walls — left */}
            <div className="absolute left-0 top-0 bottom-0" style={{
              width: '3px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,44,0.7) 15%, rgba(255,107,44,0.5) 50%, rgba(255,107,44,0.7) 85%, transparent 100%)',
              boxShadow: '0 0 15px rgba(255,107,44,0.4), 3px 0 30px rgba(255,107,44,0.15), 0 0 40px rgba(255,107,44,0.1)',
            }} />
            {/* Tube glass walls — right */}
            <div className="absolute right-0 top-0 bottom-0" style={{
              width: '3px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,44,0.7) 15%, rgba(255,107,44,0.5) 50%, rgba(255,107,44,0.7) 85%, transparent 100%)',
              boxShadow: '0 0 15px rgba(255,107,44,0.4), -3px 0 30px rgba(255,107,44,0.15), 0 0 40px rgba(255,107,44,0.1)',
            }} />
            {/* Top cap — elliptical ring */}
            <div className="absolute top-0 left-0 right-0" style={{
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(255,107,44,0.6)',
              background: 'linear-gradient(180deg, rgba(255,107,44,0.15) 0%, transparent 100%)',
              boxShadow: '0 0 25px rgba(255,107,44,0.3), 0 0 50px rgba(255,107,44,0.1)',
            }} />
            {/* Bottom cap — elliptical ring with glow */}
            <div className="absolute bottom-0 left-0 right-0" style={{
              height: '20px',
              borderRadius: '50%',
              border: '2px solid rgba(255,107,44,0.7)',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,44,0.2) 100%)',
              boxShadow: '0 0 30px rgba(255,107,44,0.4), 0 5px 40px rgba(255,107,44,0.2), 0 0 80px rgba(255,107,44,0.1)',
            }} />
            {/* Glass reflection — left side */}
            <div className="absolute top-6 bottom-6 left-3 pointer-events-none" style={{
              width: '1px',
              background: 'linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.04) 70%, transparent 90%)',
            }} />
            {/* Glass reflection — right side */}
            <div className="absolute top-6 bottom-6 right-3 pointer-events-none" style={{
              width: '1px',
              background: 'linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.03) 70%, transparent 90%)',
            }} />
            {/* Scan line animation — two lines offset by half cycle */}
            <div className="absolute left-0 right-0" style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,107,44,0.6), rgba(255,255,255,0.3), rgba(255,107,44,0.6), transparent)',
              boxShadow: '0 0 10px rgba(255,107,44,0.3)',
              animation: 'tube-scan 3s ease-in-out infinite',
            }} />
            <div className="absolute left-0 right-0" style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(255,107,44,0.4), rgba(255,255,255,0.2), rgba(255,107,44,0.4), transparent)',
              boxShadow: '0 0 8px rgba(255,107,44,0.2)',
              animation: 'tube-scan 3s ease-in-out infinite',
              animationDelay: '1.5s',
            }} />
            {/* Inner ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 80% 40% at center 60%, rgba(255,107,44,0.06) 0%, transparent 70%)',
            }} />
          </div>
        </div>

      </div>

      {/* Tagline — direct child of section so top:50vh = true viewport center */}
      <div ref={taglineRef} className="absolute z-30 text-left" style={{ opacity: 0, top: '50vh', left: '5vw', transform: 'translateY(-50%)' }}>
          <div className="flex flex-col gap-1">
            {/* Line 1: Deploy Your */}
            <div>
              {'Deploy Your'.split('').map((char, i) => (
                <span
                  key={`t1-${i}`}
                  className="tagline-char inline-block text-[clamp(1.5rem,3.5vw,3.5rem)] font-[var(--font-display)] font-bold text-white/60 uppercase tracking-wide"
                  data-char={char}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            {/* Line 2: AGENTIC — big and bold */}
            <div>
              {'Agentic'.split('').map((char, i) => (
                <span
                  key={`t2-${i}`}
                  className="tagline-char inline-block text-[clamp(3rem,8vw,7rem)] font-[var(--font-display)] font-bold text-white uppercase leading-[0.9] tracking-tighter"
                  data-char={char}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </div>
            {/* Line 3: WORKFORCE — big and bold */}
            <div>
              {'Workforce'.split('').map((char, i) => (
                <span
                  key={`t3-${i}`}
                  className="tagline-char inline-block text-[clamp(3rem,8vw,7rem)] font-[var(--font-display)] font-bold gradient-text uppercase leading-[0.9] tracking-tighter"
                  data-char={char}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          {/* Subtext appears after tagline resolves */}
          <p className="tagline-sub mt-6 text-[clamp(0.8rem,1.5vw,1.1rem)] text-white/40 max-w-md leading-relaxed opacity-0">
            Outpace the competition with custom AI agents.<br/>
            We turn manual bottlenecks into automated growth engines.
          </p>
          {/* CTA button */}
          <div className="tagline-cta mt-8 opacity-0">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-full text-base font-bold transition-all hover:scale-105 animate-pulse-glow">
              Let's Chat →
            </a>
          </div>
          {/* Slogan — below CTA */}
          <p className="tagline-sub mt-6 text-[clamp(0.7rem,1.2vw,0.9rem)] text-white/25 font-[var(--font-body)] tracking-[0.3em] uppercase opacity-0">
            Engineers of Autonomy
          </p>
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
