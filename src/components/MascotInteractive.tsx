import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
  glowColor?: string
}

export default function MascotInteractive({ 
  className = '', 
  glowColor = 'rgba(255, 107, 44, 0.25)' 
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  
  // Mouse position with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring physics (not just tilt - actual position offset)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  // Transform mouse position to rotation and translation
  const rotateX = useTransform(smoothMouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-15, 15])
  const translateX = useTransform(smoothMouseX, [-300, 300], [-20, 20])
  const translateY = useTransform(smoothMouseY, [-300, 300], [-20, 20])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scroll-triggered entrance animation
    gsap.fromTo(
      container,
      {
        scale: 0.5,
        opacity: 0,
        y: 100,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      }
    )

    // Glow pulse animation (syncs with breathing)
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Animated glow with pulse */}
      <div
        ref={glowRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        <div
          className="mascot-glow w-full h-full"
          style={{ 
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Mascot with spring physics and floating animation */}
      <motion.img
        src="/mascot-hero-v3.png"
        alt="AgenticMonkey — AI Automation Mascot"
        className={`mascot-float relative z-10 ${className}`}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          willChange: 'transform',
          filter: 'drop-shadow(0 15px 30px rgba(255, 107, 44, 0.3))',
        }}
      />
    </div>
  )
}
