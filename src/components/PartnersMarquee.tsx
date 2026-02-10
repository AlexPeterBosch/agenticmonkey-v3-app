const partners = ['OpenAI', 'Anthropic', 'Google', 'LangChain', 'Vercel', 'Supabase', 'Python', 'React', 'TypeScript']

export default function PartnersMarquee() {
  const items = [...partners, ...partners, ...partners]

  return (
    <section className="py-12 border-y border-white/5 bg-black relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted font-[var(--font-display)] font-medium">
          Powered by leading AI platforms
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((name, i) => (
            <span key={i} className="mx-6 md:mx-10 flex-shrink-0 flex items-center gap-6 md:gap-10 select-none">
              <span className="text-2xl md:text-3xl font-[var(--font-display)] font-bold tracking-tight text-white/25 hover:text-white/50 transition-colors">
                {name}
              </span>
              {i < items.length - 1 && (
                <span className="text-white/10 text-xl">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
