import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  className?: string
}

export default function AnimatedMascot({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const eyeLeftRef = useRef<HTMLDivElement>(null)
  const eyeRightRef = useRef<HTMLDivElement>(null)
  const chestGlowRef = useRef<HTMLDivElement>(null)
  const platformGlowRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const rotateX = useTransform(smoothY, [-200, 200], [8, -8])
  const rotateY = useTransform(smoothX, [-200, 200], [-8, 8])
  const translateX = useTransform(smoothX, [-200, 200], [-10, 10])
  const translateY = useTransform(smoothY, [-200, 200], [-10, 10])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scroll entrance
    gsap.fromTo(container, 
      { scale: 0.5, opacity: 0, y: 60 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: container, start: 'top 85%', once: true }
      }
    )

    // Floating/bobbing on the image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -8, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })
    }

    // Eye blink (random interval 3-6s)
    const blinkEyes = () => {
      const delay = 3 + Math.random() * 3
      gsap.timeline({ delay })
        .to([eyeLeftRef.current, eyeRightRef.current], {
          scaleY: 0.1, duration: 0.08, ease: 'power2.in'
        })
        .to([eyeLeftRef.current, eyeRightRef.current], {
          scaleY: 1, duration: 0.12, ease: 'power2.out', onComplete: blinkEyes
        })
    }
    blinkEyes()

    // Chest emblem glow pulse
    if (chestGlowRef.current) {
      gsap.to(chestGlowRef.current, {
        opacity: 0.9, scale: 1.2, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })
    }

    // Platform glow breathing
    if (platformGlowRef.current) {
      gsap.to(platformGlowRef.current, {
        opacity: 0.8, scaleX: 1.15, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const handleClick = () => {
    if (imageRef.current) {
      gsap.timeline()
        .to(imageRef.current, { y: -25, duration: 0.2, ease: 'power2.out' })
        .to(imageRef.current, { y: 0, duration: 0.6, ease: 'bounce.out' })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: 1000, cursor: 'pointer' }}
    >
      {/* Platform glow */}
      <div ref={platformGlowRef} className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[60%] h-[8%] rounded-full opacity-50" 
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,44,0.6) 0%, transparent 70%)', filter: 'blur(8px)', willChange: 'transform, opacity' }} />

      {/* Main mascot image with parallax */}
      <motion.img
        ref={imageRef}
        src="/mascot-hero-v3.png"
        alt="AgenticMonkey Mascot"
        className="relative z-10 w-full h-full object-contain"
        style={{ rotateX, rotateY, x: translateX, y: translateY, willChange: 'transform',
          filter: 'drop-shadow(0 10px 30px rgba(255,107,44,0.3))' }}
      />

      {/* Eye glow overlays - positioned over the eyes */}
      <div ref={eyeLeftRef} className="absolute z-20 pointer-events-none"
        style={{ top: '28%', left: '36%', width: '8%', height: '6%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0) 70%)',
          filter: 'blur(2px)', willChange: 'transform' }} />
      <div ref={eyeRightRef} className="absolute z-20 pointer-events-none"
        style={{ top: '28%', right: '33%', width: '8%', height: '6%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0) 70%)',
          filter: 'blur(2px)', willChange: 'transform' }} />

      {/* Chest emblem glow */}
      <div ref={chestGlowRef} className="absolute z-20 pointer-events-none"
        style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)', width: '15%', height: '10%',
          background: 'radial-gradient(circle, rgba(255,107,44,0.7) 0%, transparent 70%)',
          filter: 'blur(6px)', opacity: 0.4, willChange: 'transform, opacity' }} />

      {/* Ambient glow behind mascot */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,107,44,0.08) 0%, transparent 60%)' }} />
    </div>
  )
}
