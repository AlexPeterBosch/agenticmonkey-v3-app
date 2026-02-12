import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface AnimatedMascotProps {
  className?: string
}

export default function AnimatedMascot({ className = '' }: AnimatedMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const head = svg.querySelector('#head') as SVGGElement
    const leftEye = svg.querySelector('#left-eye') as SVGGElement
    const rightEye = svg.querySelector('#right-eye') as SVGGElement
    const leftEar = svg.querySelector('#left-ear') as SVGGElement
    const rightEar = svg.querySelector('#right-ear') as SVGGElement
    const body = svg.querySelector('#body') as SVGGElement
    const leftArm = svg.querySelector('#left-arm') as SVGGElement
    const rightArm = svg.querySelector('#right-arm') as SVGGElement
    const tail = svg.querySelector('#tail') as SVGGElement
    const chestEmblem = svg.querySelector('#chest-emblem') as SVGGElement
    const mascotContainer = svg.querySelector('#mascot-container') as SVGGElement

    // Set transform origins
    gsap.set(head, { transformOrigin: '50% 100%' })
    gsap.set([leftEye, rightEye], { transformOrigin: '50% 50%' })
    gsap.set([leftEar, rightEar], { transformOrigin: '50% 100%' })
    gsap.set(body, { transformOrigin: '50% 30%' })
    gsap.set(leftArm, { transformOrigin: '80% 20%' })
    gsap.set(rightArm, { transformOrigin: '20% 20%' })
    gsap.set(tail, { transformOrigin: '50% 0%' })
    gsap.set(mascotContainer, { transformOrigin: '50% 100%' })

    // Breathing (body)
    gsap.to(body, {
      scaleY: 1.02,
      scaleX: 0.99,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Floating/bobbing (whole character)
    gsap.to(mascotContainer, {
      y: -5,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Tail swish
    gsap.to(tail, {
      rotation: 15,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Eye blink (random interval)
    const blinkEyes = () => {
      const tl = gsap.timeline()
      tl.to([leftEye, rightEye], {
        scaleY: 0.1,
        duration: 0.08,
        ease: 'power2.in',
      })
      tl.to([leftEye, rightEye], {
        scaleY: 1,
        duration: 0.08,
        ease: 'power2.out',
      })
      gsap.delayedCall(gsap.utils.random(3, 5), blinkEyes)
    }
    gsap.delayedCall(gsap.utils.random(2, 4), blinkEyes)

    // Head tilt (random subtle rotations)
    const headTilt = () => {
      gsap.to(head, {
        rotation: gsap.utils.random(-3, 3),
        duration: 1.5,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(4, 6), headTilt)
        },
      })
    }
    gsap.delayedCall(2, headTilt)

    // Ear wiggle
    const earWiggle = () => {
      const tl = gsap.timeline()
      tl.to([leftEar, rightEar], {
        rotation: 8,
        duration: 0.2,
        ease: 'power2.out',
      })
      tl.to([leftEar, rightEar], {
        rotation: -8,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      tl.to([leftEar, rightEar], {
        rotation: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.delayedCall(gsap.utils.random(5, 7), earWiggle)
    }
    gsap.delayedCall(3, earWiggle)

    // Chest emblem pulse
    gsap.to(chestEmblem, {
      opacity: 1,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Mouse follow
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !svgRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      
      mousePos.current = { x: deltaX, y: deltaY }
      
      // Head and eyes follow (subtle)
      gsap.to(head, {
        rotation: deltaX * 8,
        duration: 0.3,
        ease: 'power2.out',
      })
      
      gsap.to([leftEye, rightEye], {
        x: deltaX * 4,
        y: deltaY * 3,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Hover reaction (wave)
    const handleMouseEnter = () => {
      const waveTL = gsap.timeline()
      waveTL.to(leftArm, {
        rotation: -30,
        duration: 0.3,
        ease: 'back.out(2)',
      })
      waveTL.to(leftArm, {
        rotation: -20,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
      })
      waveTL.to(leftArm, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }

    // Click reaction (jump)
    const handleClick = () => {
      const jumpTL = gsap.timeline()
      jumpTL.to(mascotContainer, {
        y: -20,
        duration: 0.3,
        ease: 'power2.out',
      })
      jumpTL.to(mascotContainer, {
        y: 0,
        duration: 0.4,
        ease: 'bounce.out',
      })
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter)
      containerRef.current.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current.removeEventListener('click', handleClick)
      }
      gsap.killTweensOf([
        head, leftEye, rightEye, leftEar, rightEar, body, 
        leftArm, rightArm, tail, chestEmblem, mascotContainer
      ])
    }
  }, [])

  return (
    <div ref={containerRef} className={`${className} cursor-pointer`}>
      <svg
        ref={svgRef}
        viewBox="0 0 300 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 107, 44, 0.3))',
        }}
      >
        <defs>
          {/* Glowing gradient for eyes */}
          <radialGradient id="eye-glow">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
          </radialGradient>
          
          {/* Orange glow gradient */}
          <radialGradient id="orange-glow">
            <stop offset="0%" stopColor="#FF6B2C" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.3" />
          </radialGradient>

          {/* Glossy shine for head */}
          <linearGradient id="glossy-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="50%" stopColor="#0A0A0A" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
        </defs>

        <g id="mascot-container" style={{ willChange: 'transform' }}>
          {/* Tail */}
          <g id="tail" style={{ willChange: 'transform' }}>
            <path
              d="M 240 280 Q 270 250 280 200 Q 285 180 282 160"
              stroke="#1A1A1A"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="282" cy="160" r="10" fill="#FF6B2C" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Legs */}
          <g id="left-leg" style={{ willChange: 'transform' }}>
            <rect x="110" y="280" width="30" height="60" rx="15" fill="#0A0A0A" />
            <ellipse cx="125" cy="345" rx="22" ry="18" fill="#1A1A1A" />
            <line x1="125" y1="295" x2="125" y2="305" stroke="#FF6B2C" strokeWidth="2" opacity="0.6" />
          </g>
          <g id="right-leg" style={{ willChange: 'transform' }}>
            <rect x="160" y="280" width="30" height="60" rx="15" fill="#0A0A0A" />
            <ellipse cx="175" cy="345" rx="22" ry="18" fill="#1A1A1A" />
            <line x1="175" y1="295" x2="175" y2="305" stroke="#FF6B2C" strokeWidth="2" opacity="0.6" />
          </g>

          {/* Body (torso) */}
          <g id="body" style={{ willChange: 'transform' }}>
            <ellipse cx="150" cy="220" rx="65" ry="70" fill="url(#glossy-shine)" />
            <path
              d="M 95 200 Q 90 220 95 240"
              stroke="#FF6B2C"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 205 200 Q 210 220 205 240"
              stroke="#FF6B2C"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
            
            {/* Chest emblem (circuit brain) */}
            <g id="chest-emblem" opacity="0.6" style={{ willChange: 'transform' }}>
              <circle cx="150" cy="220" r="25" fill="none" stroke="#FF6B2C" strokeWidth="2" />
              <circle cx="150" cy="220" r="6" fill="#FF6B2C" />
              <line x1="150" y1="220" x2="165" y2="210" stroke="#FF6B2C" strokeWidth="2" />
              <line x1="150" y1="220" x2="135" y2="210" stroke="#FF6B2C" strokeWidth="2" />
              <line x1="150" y1="220" x2="150" y2="235" stroke="#FF6B2C" strokeWidth="2" />
              <circle cx="165" cy="210" r="4" fill="#FF6B2C" />
              <circle cx="135" cy="210" r="4" fill="#FF6B2C" />
              <circle cx="150" cy="235" r="4" fill="#FF6B2C" />
            </g>
          </g>

          {/* Arms */}
          <g id="left-arm" style={{ willChange: 'transform' }}>
            <ellipse cx="88" cy="200" rx="18" ry="50" fill="#0A0A0A" transform="rotate(-20 88 200)" />
            <circle cx="88" cy="175" r="8" fill="#FF6B2C" opacity="0.7" />
            <g id="left-hand">
              <ellipse cx="75" cy="240" rx="16" ry="20" fill="#1A1A1A" />
              <circle cx="75" cy="240" r="5" fill="#FF6B2C" opacity="0.5" />
            </g>
          </g>
          <g id="right-arm" style={{ willChange: 'transform' }}>
            <ellipse cx="212" cy="200" rx="18" ry="50" fill="#0A0A0A" transform="rotate(20 212 200)" />
            <circle cx="212" cy="175" r="8" fill="#FF6B2C" opacity="0.7" />
            <g id="right-hand">
              <ellipse cx="225" cy="240" rx="16" ry="20" fill="#1A1A1A" />
              <circle cx="225" cy="240" r="5" fill="#FF6B2C" opacity="0.5" />
            </g>
          </g>

          {/* Head */}
          <g id="head" style={{ willChange: 'transform' }}>
            <circle cx="150" cy="130" r="70" fill="url(#glossy-shine)" />
            
            {/* Panel seams (orange lines) */}
            <path d="M 150 60 Q 170 70 180 90" stroke="#FF6B2C" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 150 60 Q 130 70 120 90" stroke="#FF6B2C" strokeWidth="1.5" fill="none" opacity="0.6" />
            <line x1="150" y1="60" x2="150" y2="90" stroke="#FF6B2C" strokeWidth="1.5" opacity="0.4" />
            
            {/* Glossy highlight */}
            <ellipse cx="130" cy="100" rx="20" ry="25" fill="#2A2A2A" opacity="0.3" />

            {/* Ears */}
            <g id="left-ear" style={{ willChange: 'transform' }}>
              <ellipse cx="90" cy="110" rx="25" ry="30" fill="#1A1A1A" />
              <ellipse cx="90" cy="110" rx="15" ry="20" fill="#0A0A0A" />
              <ellipse cx="90" cy="110" rx="10" ry="15" fill="none" stroke="#FF6B2C" strokeWidth="2" opacity="0.7">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
              </ellipse>
            </g>
            <g id="right-ear" style={{ willChange: 'transform' }}>
              <ellipse cx="210" cy="110" rx="25" ry="30" fill="#1A1A1A" />
              <ellipse cx="210" cy="110" rx="15" ry="20" fill="#0A0A0A" />
              <ellipse cx="210" cy="110" rx="10" ry="15" fill="none" stroke="#FF6B2C" strokeWidth="2" opacity="0.7">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Eyes (four-pointed stars) */}
            <g id="left-eye" style={{ willChange: 'transform' }}>
              <path
                d="M 120 125 L 125 130 L 120 135 L 115 130 Z 
                   M 120 121 L 120 139 
                   M 112 130 L 128 130"
                fill="url(#eye-glow)"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <circle cx="120" cy="130" r="18" fill="#FFFFFF" opacity="0.1" />
            </g>
            <g id="right-eye" style={{ willChange: 'transform' }}>
              <path
                d="M 180 125 L 185 130 L 180 135 L 175 130 Z 
                   M 180 121 L 180 139 
                   M 172 130 L 188 130"
                fill="url(#eye-glow)"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <circle cx="180" cy="130" r="18" fill="#FFFFFF" opacity="0.1" />
            </g>

            {/* Nose */}
            <ellipse cx="150" cy="145" rx="6" ry="8" fill="#0A0A0A" />

            {/* Mouth */}
            <path d="M 140 160 Q 150 165 160 160" stroke="#FF6B2C" strokeWidth="2" fill="none" opacity="0.5" />
          </g>
        </g>
      </svg>
    </div>
  )
}
