import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PARTICLE_COUNT = 7

export default function MascotHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  })

  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 15])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.6])
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) { rafRef.current = null; return }
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setTilt({ x: -dy * 15, y: dx * 15 })
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative z-20 -my-8 md:-my-16 mascot-hero-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        rotate: scrollRotate,
        scale: scrollScale,
        y: scrollY,
        opacity: scrollOpacity,
        willChange: 'transform',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mascot-spotlight" />
      </div>

      {/* Cyan glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mascot-glow" />
      </div>

      {/* Orbiting particles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="mascot-particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="mascot-particle"
              style={{
                animationDelay: `${-(i * (20 / PARTICLE_COUNT))}s`,
                animationDuration: `${18 + i * 2}s`,
                // @ts-expect-error CSS custom property
                '--orbit-radius': `${100 + i * 15}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mascot image with 3D tilt */}
      <motion.img
        src="/mascot-hero-v3.png"
        alt="AgenticMonkey Mascot"
        className="mx-auto w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain mascot-breathe relative z-10"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
          filter: 'drop-shadow(0 20px 40px rgba(255, 107, 44, 0.3))',
        }}
      />

      {/* Platform/pedestal */}
      <div className="mascot-pedestal" />
    </motion.div>
  )
}
