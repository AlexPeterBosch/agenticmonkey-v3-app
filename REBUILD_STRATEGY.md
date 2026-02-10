# AgenticMonkey v3 — $15K Premium Website Rebuild Strategy

## What I Learned From 30+ Dribbble Designs

### The $15K Formula (Every Premium Site Has These)
1. **Pure black background** (#000 or #0A0A0A) — NOT dark gray
2. **ONE accent color** with intense glow/bloom — used sparingly (3-5% of visual space)
3. **3D mascot as the hero** — the character IS the brand identity
4. **Massive negative space** — let art breathe, stop cramming
5. **Editorial typography** — huge display font, tight tracking, character animations
6. **Scroll-triggered reveals** — GSAP ScrollTrigger with scrub
7. **Atmospheric effects** — particles, glow, grain, fog, chromatic aberration
8. **Bento grid layouts** — for services/features (not boring card rows)
9. **Stats/social proof** — numbers that build trust
10. **Minimal nav** — pill-shaped, semi-transparent, one standout CTA

### What Makes Our Current Version Look $500
- Light gray backgrounds (screams template)
- No atmospheric effects
- Generic card layouts
- Too much text, not enough visual impact
- Mascot is an afterthought, not the hero
- No glow, no particles, no depth
- Standard nav bar

## Design Direction

### Color Palette
- **Background:** #000000 (pure black)
- **Primary Accent:** #FF6B2C (burnt orange) — for CTAs, glows, highlights
- **Secondary Accent:** #00D4FF (cyan) — for code/tech elements, subtle accents
- **Text:** #FFFFFF (white), #999999 (muted gray for secondary)
- **Surface:** #0A0A0A (slightly lighter black for cards), #111111 (borders)

### Typography
- **Display/Hero:** Inter or Space Grotesk at 120px+ — "AGENTIC" and "MONKEY" on separate lines
- **Body:** Inter at 16-18px
- **Code/Tech accents:** JetBrains Mono for any code references

### The Mascot (Critical)
- NOT a cyborg monkey, NOT a cartoon
- A **3D rendered character** — cute but sophisticated (like Cipher AI's robot)
- Oversized head, compact body, expressive eyes
- Orange/amber accent glow on dark body
- Standing on a glowing pedestal/platform
- Circuit board textures, data stream effects on face/visor
- The mascot should feel like a premium vinyl collectible figure
- Generate with NanoBanana using detailed prompt

## Section-by-Section Plan

### 1. Navbar
- Semi-transparent pill-shaped container (backdrop-filter: blur)
- Logo left, links center, "Book a Call" CTA right (orange fill, pill shape)
- Scroll: becomes solid dark on scroll (GSAP)
- Position: fixed, z-index 50

### 2. Hero Section (The Money Shot)
- Full viewport height, pure black
- CENTER: 3D mascot image (large, 60% of viewport)
- BEHIND mascot: Radial gradient glow (orange → transparent)
- BEHIND glow: Subtle floating particles (CSS animation)
- BOTTOM of hero: "AGENTIC" in massive display font (120px+), character-split animation
- BELOW: "MONKEY" same treatment, slight delay
- BELOW: One-liner tagline "Engineering Autonomy" in muted gray
- BELOW: Orange "Book a Consultation" CTA + ghost "See Our Work" button
- Film grain overlay (CSS noise texture, very subtle)
- Mouse-follow parallax on mascot (GSAP quickTo)

### 3. Logo Ticker Bar
- Horizontal auto-scrolling marquee
- "Trusted by forward-thinking businesses" label
- Tech partner logos: OpenAI, LangChain, Python, React, etc.
- Subtle fade at edges (CSS mask-image gradient)

### 4. Problem → Solution Section
- Split layout: left text, right visual
- "Most AI agencies sell features. We engineer systems that think."
- Text reveals with clip-path wipe (ScrollTrigger)
- Right side: Abstract visual or mascot in different pose

### 5. Services — Bento Grid
- Irregular grid layout (not equal cards)
- One large feature card (spans 2 cols) + smaller cards
- Each card: dark surface (#0A0A0A), subtle border (#222), hover glow
- Icon + title + short description
- Services: AI Agents, Workflow Orchestration, Data Processing, Conversational AI, Custom Integrations, AI Strategy
- On hover: card border glows orange, subtle scale

### 6. Mascot Showcase (Pinned Section)
- ScrollTrigger pin: true
- Progressive reveals while pinned:
  1. Mascot slides in from left
  2. "We Don't Just Build AI" clip-path wipe
  3. "We Engineer Autonomy" same treatment
  4. Stats count up: "50+ Agents Deployed" / "99.9% Uptime" / "10x Faster"
  5. Description paragraph fades in
- Section unpins, continue scrolling

### 7. How It Works — 3 Steps
- Vertical SVG line connecting steps (draws on scroll)
- Step 1: Discovery → Step 2: Build → Step 3: Deploy
- Each step card fades in as line reaches it
- Orange line, dark cards with glowing step numbers

### 8. Why Choose Us — Feature Grid
- 4 features in 2x2 grid
- Each with icon, title, description
- Text reveals with stagger (ScrollTrigger)
- "Speed Over Perfection" / "Production-Grade" / "Full Ownership" / "AI-Native Team"

### 9. CTA Section
- Full-width dark section with atmospheric glow
- "Ready to Engineer Your Autonomy?"
- Two buttons: "Book a Consultation" (orange fill) + "View Case Studies" (ghost)
- Mascot peeking from side or corner (playful)
- Parallax on background elements

### 10. Footer
- Dark, minimal
- Logo + nav links + social icons
- "© 2026 AgenticMonkey. Engineering Autonomy."
- Grid lines fade out at footer

## CSS Effects Checklist
- [ ] Film grain overlay (pseudo-element with noise texture)
- [ ] Radial gradient glow behind mascot
- [ ] Floating particles (CSS keyframes, 20-30 small dots)
- [ ] Glassmorphic nav (backdrop-filter: blur(20px))
- [ ] Card hover glow (box-shadow transition)
- [ ] Marquee scroll animation (CSS translateX)
- [ ] Text clip-path reveal (polygon wipe)
- [ ] Grid lines (5 fixed vertical, subtle)
- [ ] Orange fill line (scroll-synced)
- [ ] Cursor glow effect (optional, radial gradient follows mouse)

## Mascot Generation Prompt (NanoBanana)
"Hyper-realistic 3D rendered robot character, vinyl collectible figure style, oversized rounded rectangular head with dark screen face showing two glowing white diamond-shaped eyes, warm amber/orange metallic shell, compact matte black body with orange rim lighting, small antenna nubs on top, circular dial on side of head, standing on a glowing orange translucent cube pedestal, dark black background with subtle orange backlight glow, studio lighting, octane render quality, 4K, centered composition"

## Implementation Order
1. Generate mascot image with NanoBanana
2. Full CSS dark theme reskin (index.css + all components)
3. Hero section rebuild with mascot + glow + particles
4. Navbar glassmorphic redesign
5. Services bento grid
6. All other sections
7. Film grain + atmospheric effects
8. Build test
9. Screenshot + critique
10. Fix issues
11. Final build

## What's Different This Time
- **Research-driven:** Every decision based on 30+ analyzed premium sites
- **Single accent color:** Orange only (no cyan-orange split)
- **Mascot-first:** Hero is 80% mascot, 20% text
- **Atmospheric depth:** Grain, glow, particles create $15K feel
- **Editorial typography:** Huge, bold, character-animated
- **Bento layout:** Irregular grids, not template rows
- **Less is more:** Half the text, double the visual impact
