import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  opacityDelta: number
  color: string
}

interface Props {
  count?: number
  className?: string
}

export default function ParticleField({ count = 40, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const colors = ['#FF6B2C', '#00E5FF']

    // Resize canvas to match display size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2, // Float upward
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        opacityDelta: (Math.random() - 0.5) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }
    initParticles()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const dpr = window.devicePixelRatio || 1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repulsionRadius = 100

        if (dist < repulsionRadius && dist > 0) {
          const force = (repulsionRadius - dist) / repulsionRadius
          p.vx += (dx / dist) * force * 0.5
          p.vy += (dy / dist) * force * 0.5
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Fade in/out
        p.opacity += p.opacityDelta
        if (p.opacity <= 0.1 || p.opacity >= 0.8) {
          p.opacityDelta *= -1
        }

        // Wrap around edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.y > h + 10) p.y = -10

        // Draw particle (scale for device pixel ratio)
        const px = p.x * dpr
        const py = p.y * dpr
        const psize = p.size * dpr
        
        ctx.beginPath()
        ctx.arc(px, py, psize, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`)
        ctx.fill()

        // Glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, psize * 4)
        gradient.addColorStop(0, p.color.replace(')', `, ${p.opacity * 0.3})`))
        gradient.addColorStop(1, p.color.replace(')', ', 0)'))
        ctx.fillStyle = gradient
        ctx.fillRect(px - psize * 4, py - psize * 4, psize * 8, psize * 8)
      })

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ willChange: 'transform' }}
    />
  )
}
