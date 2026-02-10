# Design Inspiration Notes (from Dribbble Research)

## Sources Studied
- **Sigma Software Design** (42K followers, built ChainGPT Labs) — $10-15K per project
  - ChainGPT: Interactive 3D Motion System
  - Solidus AI Tech: Marketplace UI
  - WhiteBridge Network: AI Guardian Agent
  - LOOP: Fashion E-commerce (light theme)
  - Chromia: Blockchain Identity
  - Tenderly: Full-Stack Web3 Infrastructure
  - Natix: Smart Camera Mapping
- **BareMetal/Structure Network** — DePIN site Alex showed (video reference)
- **Owell** — Web3 DeFi Landing Page (dark, phone mockups, gradient orbs)
- **TSSF Shoes** — Scroll-triggered product animations
- **Stronger** — Performance platform, editorial typography

## Key Design Patterns (Premium $15K Level)

### 1. Hero Section
- 3D mascot/character AS the hero (not alongside text)
- Minimal text — brand name + one tagline
- Single CTA button with glow effect
- Announcement/promo bar above nav

### 2. Color
- Pure black (#000 or #0A0A0A) background
- ONE accent color with intense glow (green, cyan, orange)
- White text only
- Accent color used for: buttons, glows, highlights, particle effects

### 3. Typography
- Massive display font for hero (100px+)
- Character-split animations (each letter enters separately)
- Mix editorial serif + geometric sans-serif
- Text as art — oversized, cropped, overlapping

### 4. 3D & Visual Effects
- Pre-rendered 3D characters (NOT real-time WebGL)
- Glow/bloom effects behind 3D elements (CSS box-shadow + filters)
- Floating particles (CSS or canvas)
- Reflective/chrome surfaces on 3D assets

### 5. Layout
- Massive negative space (let art breathe)
- Pinned/sticky sections for storytelling
- Alternating full-width and contained sections
- Partner/exchange logo ticker at bottom

### 6. Animation
- GSAP ScrollTrigger for scroll-synced motion
- Lenis smooth scroll (kills native jank)
- SVG line drawing (strokeDashoffset)
- Staggered card entrances (alternating sides)
- Parallax at different speeds per element

### 7. Anti-Patterns (What NOT to do)
- No gradient backgrounds (looks cheap)
- No generic stock illustrations
- No template-looking card grids
- No multi-color schemes
- No Framer Motion fade-ins (too basic)
- No light gray backgrounds (#f5f5f5 screams template)
