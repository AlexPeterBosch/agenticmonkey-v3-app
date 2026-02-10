# AgenticMonkey v3 — Scroll Animations + Intensive Critique Fix

## CRITIQUE (Issues to Fix)

### Critical
1. **No scroll-synced animations** — Every animation is basic `whileInView` fade-in. Boring. Needs scroll-progress-based transforms using Framer Motion's `useScroll` + `useTransform`.
2. **Mascot is static** — Only has CSS `animate-float`. Must animate with scroll (parallax, rotate, scale based on scroll position).
3. **Monotonous section structure** — Every section: big heading → grid of cards. Needs variety (sticky sections, horizontal scroll, etc.)
4. **Fake testimonials** — Remove the testimonials section entirely OR replace with a "Trusted by" logos section. No fake people.
5. **"MONKEY" text nearly invisible** — `text-stroke` on light background barely visible. Needs more contrast.
6. **PartnersMarquee empty** — Says "Powered by leading AI platforms" but shows no logos.

### Medium
7. **No scroll progress indicator** — Add a progress bar at top of page showing scroll position
8. **Stats don't animate** — 50+, 10x, 24/7 should count up when scrolled into view
9. **No interactive depth** — Cards lack meaningful hover effects or 3D transforms
10. **Section transitions are flat** — No parallax between sections, no overlapping, no depth

## TASK: Add Scroll-Synced Animations

Use Framer Motion's `useScroll`, `useTransform`, `useMotionValueEvent` — these are already available (framer-motion is installed).

### 1. Scroll Progress Bar (New Component)
- Fixed top bar showing page scroll progress
- Thin (3px), orange-to-cyan gradient
- `useScroll()` → `scaleX` transform

### 2. Hero Mascot Parallax
- As user scrolls DOWN from hero:
  - Mascot rotates slightly (0 → 15deg)
  - Mascot scales down (1 → 0.6)
  - Mascot translateY moves up (parallax effect, faster than scroll)
  - Opacity fades (1 → 0.3)
- Use `useScroll({ target: heroRef })` with `useTransform`

### 3. Section Headings — Horizontal Slide
- Large headings slide in from left/right based on scroll progress
- Not just fade-in — actual horizontal translate tied to scroll position
- Alternate directions per section (left, right, left, right)

### 4. Services Cards — Staggered Parallax
- Each card has slightly different scroll speed (creates depth)
- Cards in left column move slightly slower, right column slightly faster
- Use `useTransform` with different scroll ranges per card

### 5. MascotShowcase — Sticky Section
- Make this section sticky (the mascot stays pinned while content scrolls past)
- As user scrolls through the sticky range:
  - Mascot rotates from -5deg to 5deg
  - Stats count up (0 → 50+, 0 → 10x)
  - Content text fades in paragraph by paragraph

### 6. HowItWorks — Horizontal Scroll
- Instead of vertical grid, make the 3 steps scroll HORIZONTALLY as user scrolls vertically
- Common pattern: vertical scroll → horizontal content movement
- Each step card slides in from right as you scroll

### 7. Industries Cards — 3D Tilt on Hover
- Add perspective/3D rotation on hover (tilt toward mouse position)
- Use `onMouseMove` to calculate tilt angle
- Subtle (max 5-8 degrees)

### 8. Animated Number Counters
- Stats (50+, 10x, 24/7) count up from 0 when scrolled into view
- Use `useInView` + `useMotionValue` + `animate`

### 9. Background Parallax Elements
- Add subtle floating geometric shapes (circles, lines) in backgrounds
- These move at different scroll speeds than content (depth effect)
- Low opacity (5-10%), decorative only

### 10. Remove Testimonials Section
- Delete Testimonials.tsx entirely
- Remove import from App.tsx
- Replace with nothing (or a simple "Trusted by leading companies" text)

### 11. Fix PartnersMarquee
- Add actual tech partner logos: OpenAI, Anthropic, Google, LangChain, Vercel, Supabase
- Use simple SVG icons or text with brand colors
- Infinite horizontal scroll marquee

### 12. Fix "MONKEY" Text Visibility
- Make the text-stroke thicker or add a subtle fill color
- Or use a gradient fill instead of transparent

## CONSTRAINTS
- Use ONLY framer-motion (already installed) — no additional scroll libraries
- Keep performance tight — use `willChange: 'transform'` where needed
- All animations must respect `prefers-reduced-motion`
- Don't break existing responsive layouts
- Production build must still pass with zero errors
- Tailwind v4 syntax (using @theme, not tailwind.config.js)

## FILES TO MODIFY
- `src/components/Hero.tsx` — mascot parallax
- `src/components/Services.tsx` — staggered parallax
- `src/components/MascotShowcase.tsx` — sticky section + counter
- `src/components/HowItWorks.tsx` — horizontal scroll
- `src/components/Industries.tsx` — 3D tilt
- `src/components/WhyChooseUs.tsx` — parallax
- `src/components/CTASection.tsx` — mascot parallax
- `src/components/PartnersMarquee.tsx` — add logos
- `src/components/Navbar.tsx` — add scroll progress bar (or new ScrollProgress.tsx)
- `src/App.tsx` — remove Testimonials import, add ScrollProgress
- `src/index.css` — any new keyframes/utilities

## DELETE
- `src/components/Testimonials.tsx`

## REFERENCE
- Framer Motion scroll docs: https://www.framer.com/motion/scroll-animations/
- `useScroll()` returns `scrollY`, `scrollYProgress`
- `useTransform(scrollY, [inputRange], [outputRange])`
- For element-specific scroll: `useScroll({ target: ref, offset: ["start end", "end start"] })`
