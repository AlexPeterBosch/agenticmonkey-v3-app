import { useRef, useState, useCallback } from 'react'

interface Props {
  className?: string
  glowColor?: string
}

export default function MascotInteractive({ className = '', glowColor = 'rgba(255, 107, 44, 0.25)' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) { rafRef.current = null; return }
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setTilt({ x: -dy * 10, y: dx * 10 })
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="mascot-glow"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />
      </div>

      <img
        src="/mascot-hero-v3.webp"
        alt="AgenticMonkey — AI Automation Mascot"
        className={`mascot-breathe relative z-10 ${className}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
          filter: 'drop-shadow(0 15px 30px rgba(255, 107, 44, 0.25))',
        }}
      />
    </div>
  )
}
