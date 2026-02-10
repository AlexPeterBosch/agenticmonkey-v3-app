# AgenticMonkey v3 — Premium Rebuild Plan ($15K Quality)

## Research Findings: ChainGPT Labs Tech Stack
- **Platform:** Webflow
- **Animation:** GSAP 3.11.5 + ScrollTrigger (8 scroll triggers, 46 animations)
- **Smooth Scroll:** Lenis
- **NO Three.js, NO WebGL, NO Canvas** — all CSS + GSAP
- **Design Grid:** 5 fixed vertical lines (1px, gray) spanning the full page
- **The "tube":** Orange-filled vertical line that draws down as you scroll (GSAP ScrollTrigger controlling scaleY or clip-path)
- **3D objects:** Pre-rendered images with glow/shadow effects (not real-time 3D)

## What We Need to Install

```bash
npm install gsap @gsap/react lenis
```

That's it. Three packages:
1. **gsap** — Industry-standard animation library (GreenSock)
2. **@gsap/react** — Official React integration (useGSAP hook)
3. **lenis** — Smooth scroll library (removes native scroll jank)

## What to REMOVE
- All `framer-motion` scroll animations (useScroll, useTransform)
- BackgroundShapes.tsx (CSS floating shapes — amateur)
- ScrollHeading.tsx (scroll-slide headings — replace with GSAP)
- Keep framer-motion ONLY for simple entrance animations (whileInView fade-ins) and AnimatePresence

## Architecture

### 1. Lenis Smooth Scroll (Global)
```tsx
// In App.tsx or a SmoothScroll.tsx wrapper
import Lenis from 'lenis'
// Initialize Lenis with GSAP ticker integration
// This alone transforms the feel of the entire site
```

### 2. Design Grid Lines (New Component: GridLines.tsx)
- 5 fixed vertical lines spanning full viewport height
- Very subtle (1px, rgba(255,255,255,0.05) on dark or rgba(0,0,0,0.05) on light)
- Creates that premium "designed" feel
- One center line fills with orange as you scroll (the "tube")

### 3. GSAP ScrollTrigger Animations

#### Hero Section
- Text splits: "AGENTIC" and "MONKEY" animate in with stagger (each letter)
- Mascot scales up from 0.5 to 1 with overshoot
- "Engineering Autonomy" fades in with y-translate
- CTA button pulses after everything else loads
- On scroll out: everything parallax-moves up at different speeds

#### Services Section  
- Numbers (01-06) slide in from left
- Titles slide in from right (opposite direction creates dynamism)
- Descriptions fade in with slight delay
- Each card triggers sequentially as you scroll (scrub: true)

#### MascotShowcase Section
- Pin the section (ScrollTrigger pin)
- Mascot slides in from left while pinned
- Text content reveals progressively as you scroll through the pinned section
- Stats count up during the pin
- After all content revealed, unpin and continue

#### HowItWorks Section
- The orange connector line DRAWS between steps as you scroll
- Each step card fades/slides in as the line reaches it
- SVG path with strokeDashoffset animated by ScrollTrigger

#### Industries Section
- Cards stagger in with 3D rotation (rotateY from 90deg to 0)
- Hover: GSAP-powered tilt with momentum

#### WhyChooseUs Section  
- Text reveal: clip-path wipe from left to right on each heading
- Numbers count up
- Border/glow effect animates on each card

#### CTA Section
- Parallax background
- Text scales up slightly as you scroll into it

### 4. Mascot Treatment
- Keep as pre-rendered image (like ChainGPT's 3D phone mockup)
- Add GSAP-powered effects:
  - Glow pulse (box-shadow animation)
  - Subtle rotation on scroll
  - Mouse-follow tilt (GSAP quickTo for smooth follow)
  - Dark backdrop circle/gradient behind it
- Consider: Generate a SHORT looping video/GIF of the mascot with slight animation
  - Could use CSS animation of multiple overlaid images
  - Or a Lottie animation

### 5. Typography Animation
- Split text into characters for stagger animations
- Use GSAP SplitText-style approach (or manual char splitting)
- Large headings animate char-by-char on scroll

### 6. Page Transitions
- Smooth section-to-section with ScrollTrigger snap (optional)
- Color theme transitions between sections (light → dark → light)

## Performance Rules
- GSAP is inherently more performant than Framer Motion for scroll
- Lenis provides 60fps smooth scroll
- Use `will-change: transform` sparingly (only during animation)
- Batch ScrollTrigger refreshes
- Lazy load images below fold

## Implementation Order
1. Install gsap, @gsap/react, lenis
2. Set up Lenis smooth scroll globally
3. Add GridLines component  
4. Replace Hero animations with GSAP
5. Add the "tube" scroll progress line
6. Convert each section to GSAP ScrollTrigger
7. Add text splitting for premium typography animation
8. Polish mascot treatment
9. Performance test
10. Build verification

## Key Insight
The difference between a $500 website and a $15K website is NOT the content or layout — it's the MOTION DESIGN. Specifically:
- Buttery smooth scroll (Lenis)
- Precise scroll-synced animations (GSAP ScrollTrigger)
- Typography animation (char-by-char reveals)
- Design grid lines (subtle visual structure)
- Pinned sections (scroll within a section)
- Connected visual elements (the "tube" linking sections)
