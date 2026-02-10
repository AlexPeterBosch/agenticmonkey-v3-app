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
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-6 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 md:px-6 md:py-3 flex items-center justify-between gap-6 md:gap-8 shadow-2xl shadow-black/50 w-full max-w-4xl">
          <a href="#" className="flex items-center gap-3">
            {/* <img src="/monkey-mascot.png" alt="AgenticMonkey" className="w-8 h-8 object-contain" /> */}
            <span className="font-[var(--font-display)] font-bold text-lg md:text-xl tracking-tight text-white">
              AGENTIC<span className="text-orange">MONKEY</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors font-[var(--font-body)]"
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
              className="bg-orange hover:bg-orange-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,44,0.4)]"
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
