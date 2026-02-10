import { Mail, ArrowUpRight, Twitter, Github } from 'lucide-react'

const BOOKING_URL = 'https://cal.com/alex-bosch-nodozz/30min'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Us', href: '#why-us' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/mascot-hero-v3.png" alt="AgenticMonkey" className="w-10 h-10 object-contain" />
              <span className="font-[var(--font-display)] font-bold text-xl">
                AGENTIC<span className="text-orange">MONKEY</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-[var(--font-body)] max-w-xs">
              AI automation studio building autonomous agents that actually work in production.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-wider mb-4 text-white/40">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors font-[var(--font-body)] flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-wider mb-4 text-white/40">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@agenticmonkey.party"
              className="text-white/60 hover:text-white text-sm transition-colors font-[var(--font-body)] flex items-center gap-2 mb-3"
            >
              <Mail className="w-4 h-4" />
              hello@agenticmonkey.party
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-orange hover:bg-orange-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              Book a Call
            </a>
            <div className="flex gap-4 mt-6">
              <a href="https://x.com/AlexPeterBosch" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-orange/20 flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4 text-white/50 hover:text-white" />
              </a>
              <a href="https://github.com/agenticmonkey" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-orange/20 flex items-center justify-center transition-all">
                <Github className="w-4 h-4 text-white/50 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs font-[var(--font-body)]">
            &copy; {new Date().getFullYear()} AgenticMonkey. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-[var(--font-body)]">
            Engineers of Autonomy
          </p>
        </div>
      </div>
    </footer>
  )
}
