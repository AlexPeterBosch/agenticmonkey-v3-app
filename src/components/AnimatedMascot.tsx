import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface AnimatedMascotProps {
  className?: string
}

export default function AnimatedMascot({ className = '' }: AnimatedMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const chestGlowRef = useRef<HTMLDivElement>(null)
  const platformGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current || !leftEyeRef.current || !rightEyeRef.current || !chestGlowRef.current || !platformGlowRef.current) return

    const image = imageRef.current
    const leftEye = leftEyeRef.current
    const rightEye = rightEyeRef.current
    const chestGlow = chestGlowRef.current
    const platformGlow = platformGlowRef.current

    // ===== FLOATING/BOBBING =====
    gsap.to(image, {
      y: -8,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    // ===== EYE BLINK =====
    const blinkEyes = () => {
      const tl = gsap.timeline()
      tl.to([leftEye, rightEye], {
        scaleY: 0,
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

    // ===== CHEST EMBLEM GLOW PULSE =====
    gsap.to(chestGlow, {
      opacity: 0.8,
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    // ===== PLATFORM GLOW BREATHING =====
    gsap.to(platformGlow, {
      opacity: 0.9,
      scale: 1.1,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    // ===== MOUSE PARALLAX =====
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height

      gsap.to(image, {
        x: deltaX * 15,
        y: deltaY * 10 - 8, // Keep the floating offset
        rotationY: deltaX * 10,
        rotationX: -deltaY * 10,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    // ===== HOVER: SCALE UP + ENHANCED GLOW =====
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
      gsap.to(chestGlow, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
      })
      gsap.to(platformGlow, {
        opacity: 1,
        scale: 1.3,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(chestGlow, {
        opacity: 0.4,
        scale: 1,
        duration: 0.5,
      })
      gsap.to(platformGlow, {
        opacity: 0.6,
        scale: 1,
        duration: 0.5,
      })
    }

    // ===== CLICK: BOUNCE =====
    const handleClick = () => {
      const tl = gsap.timeline()
      tl.to(image, {
        y: -20,
        duration: 0.2,
        ease: 'power2.out',
      })
      tl.to(image, {
        y: 0,
        duration: 0.4,
        ease: 'bounce.out',
      })
    }

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)
      containerRef.current.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
        containerRef.current.removeEventListener('click', handleClick)
      }
      gsap.killTweensOf([image, leftEye, rightEye, chestGlow, platformGlow])
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${className} relative cursor-pointer`}
      style={{
        perspective: '1000px',
      }}
    >
      {/* The actual mascot PNG */}
      <img
        ref={imageRef}
        src="/mascot-hero-v3.png"
        alt="AgenticMonkey Mascot"
        className="w-full h-full object-contain"
        style={{
          willChange: 'transform',
          filter: 'drop-shadow(0 0 30px rgba(255, 107, 44, 0.3))',
        }}
      />

      {/* === OVERLAY: LEFT EYE GLOW === */}
      <div
        ref={leftEyeRef}
        className="absolute pointer-events-none"
        style={{
          top: '17%',
          left: '33%',
          width: '10%',
          height: '7%',
          willChange: 'transform',
        }}
      >
        {/* Star shape glow */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="eye-glow-left">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Four-pointed star */}
          <path
            d="M 50 10 L 55 45 L 90 50 L 55 55 L 50 90 L 45 55 L 10 50 L 45 45 Z"
            fill="url(#eye-glow-left)"
            filter="blur(2px)"
          />
        </svg>
      </div>

      {/* === OVERLAY: RIGHT EYE GLOW === */}
      <div
        ref={rightEyeRef}
        className="absolute pointer-events-none"
        style={{
          top: '17%',
          left: '57%',
          width: '10%',
          height: '7%',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="eye-glow-right">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M 50 10 L 55 45 L 90 50 L 55 55 L 50 90 L 45 55 L 10 50 L 45 45 Z"
            fill="url(#eye-glow-right)"
            filter="blur(2px)"
          />
        </svg>
      </div>

      {/* === OVERLAY: CHEST EMBLEM GLOW === */}
      <div
        ref={chestGlowRef}
        className="absolute pointer-events-none"
        style={{
          top: '43%',
          left: '40%',
          width: '20%',
          height: '15%',
          opacity: 0.4,
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 44, 0.8) 0%, rgba(255, 107, 44, 0.4) 40%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* === OVERLAY: PLATFORM GLOW === */}
      <div
        ref={platformGlowRef}
        className="absolute pointer-events-none"
        style={{
          bottom: '2%',
          left: '20%',
          width: '60%',
          height: '12%',
          opacity: 0.6,
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255, 107, 44, 0.9) 0%, rgba(255, 107, 44, 0.5) 40%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />
      </div>

      {/* === FLOATING PARTICLES === */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            background: '#FF6B2C',
            opacity: 0.3 + Math.random() * 0.4,
            boxShadow: '0 0 6px rgba(255, 107, 44, 0.6)',
            animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-12px) translateX(3px);
          }
        }
      `}</style>
    </div>
  )
}
