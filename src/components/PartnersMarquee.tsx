const partners = [
  'OpenAI',
  'Anthropic',
  'Google Cloud',
  'LangChain',
  'Python',
  'React',
  'TypeScript',
  'Vercel',
  'Supabase',
  'PostgreSQL',
  'Redis',
  'Docker',
]

export default function PartnersMarquee() {
  const items = [...partners, ...partners, ...partners]

  return (
    <section className="py-10 border-y border-white/5 bg-black relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-5">
        <p className="text-xs uppercase tracking-[0.3em] text-muted font-[var(--font-display)] font-medium">
          Powered By
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((name, i) => (
            <span key={i} className="mx-8 md:mx-12 flex-shrink-0 flex items-center gap-8 md:gap-12 select-none">
              <span className="text-lg md:text-2xl font-[var(--font-display)] font-bold tracking-tight text-white/30 hover:text-orange/60 transition-colors duration-300 cursor-default">
                {name}
              </span>
              {i < items.length - 1 && (
                <span className="text-orange/20 text-xs">◆</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
