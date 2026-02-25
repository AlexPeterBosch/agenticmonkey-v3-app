import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Us', href: '#why-us' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 md:px-6 flex justify-center pointer-events-none" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
        <div className="navbar-glass pointer-events-auto bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] rounded-full flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] w-full max-w-4xl" style={{ padding: 'clamp(6px, 0.6vw, 12px) clamp(12px, 1.2vw, 24px)', gap: 'clamp(12px, 1.5vw, 32px)' }}>
          <a href="#" className="flex items-center gap-2">
            <span className="font-[var(--font-display)] font-bold tracking-tight" style={{ fontSize: 'clamp(12px, 1.1vw, 18px)' }}>
              <span className="logo-shimmer">AGENTIC</span><span className="logo-shimmer-orange">MONKEY</span>
            </span>
          </a>

          <div className="hidden md:flex items-center" style={{ gap: 'clamp(10px, 1.2vw, 24px)' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-medium text-white/70 hover:text-white font-[var(--font-body)]"
                style={{ fontSize: 'clamp(11px, 0.85vw, 14px)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
             <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange hover:bg-orange-dark text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,44,0.4)]"
              style={{ fontSize: 'clamp(11px, 0.85vw, 14px)', padding: 'clamp(4px, 0.5vw, 8px) clamp(10px, 1.2vw, 20px)' }}
            >
              Book a Call
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 z-40 bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl md:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-white/90"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-white px-6 py-3 rounded-full text-center font-semibold mt-2 shadow-[0_0_20px_rgba(255,107,44,0.3)]"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
