import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GridLines() {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fillRef.current) return

    gsap.to(fillRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.body) t.kill()
      })
    }
  }, [])

  const lines = [0, 1, 2, 3, 4]

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="max-w-7xl mx-auto h-full relative px-6">
        {lines.map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i / 4) * 100}%`,
              width: '1px',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            {i === 2 && (
              <div
                ref={fillRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '0%',
                  backgroundColor: '#FF6B2C',
                  opacity: 0.15,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
