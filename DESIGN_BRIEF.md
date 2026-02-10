# AgenticMonkey v3 — Complete Redesign Brief

## Reference Sites (Study These)
1. **https://labs.chaingpt.org/** — Web3 incubator site. Key design elements:
   - Bold typography with large counter animations (spinning numbers)
   - 3D product renders/mockups as hero visuals
   - Orange accent on dark background
   - Tab-based navigation for categories (AI, DeFi, DePin, L1/L2)
   - Testimonial carousel with real photos
   - Team grid with clean cards
   - Expandable FAQ accordion
   - Blog/news section at bottom
   - Clean, professional, with subtle animations

2. **https://shieldeum.net/** — Cybersecurity/DePIN site. Key design elements:
   - Neon green (#00FF88 style) on pure black
   - Heavy glassmorphism cards with green glow borders
   - 3D hero visual (shield/helmet render)
   - Animated particle backgrounds
   - Stats counters (670 tokens, 8000+ partners, etc.)
   - Feature cards with numbered sections (01, 02, 03)
   - Gradient borders on cards
   - Roadmap/adoption timeline
   - Partners logo grid
   - FAQ accordion with hover states
   - Very cyberpunk/tech aesthetic

## Current AgenticMonkey Services
- **Autonomous AI Agents** — Context-aware agents for support, sales, data analysis
- **Workflow Orchestration** — End-to-end business automation (CRM, ERP, comms)
- **Intelligent Data Processing** — Unstructured data extraction, API bridging
- **Conversational AI Systems** — 24/7 chatbots, email automation, lead qualification

## Brand Identity
- **Name:** AgenticMonkey
- **Domain:** agenticmonkey.party
- **Email:** hello@agenticmonkey.party
- **Tagline:** "Engineers of Autonomy"
- **Target:** Small and mid-market businesses wanting AI automation
- **CTA Link:** https://cal.com/alex-bosch-nodozz/30min

## Design Direction
- **NO purple gradients** — the current site is literally purple gradient AI slop
- **NO Inter/system fonts** — use distinctive display + body font pairing
- **Aesthetic:** Dark, premium, cyberpunk-meets-corporate. Think futuristic AI lab.
- **Color scheme:** Deep black/dark backgrounds with a striking accent (cyan, electric blue, or emerald — NOT purple/violet)
- **Typography:** Bold, technical display font + clean readable body
- **Animations:** Heavy — parallax scrolling, scroll-triggered reveals, floating elements, counter animations, particle effects, glowing borders, hover transformations
- **Layout:** Asymmetric, breaking grid conventions, overlapping elements

## Tech Stack
- React + TypeScript + Vite (same as current)
- Tailwind CSS (build-time, NOT CDN)
- Framer Motion for animations
- Three.js or CSS-only for 3D effects
- No unnecessary dependencies

## Required Sections
1. **Hero** — Massive animated hero with 3D visual element, bold headline, CTA button, animated stats
2. **Services** — 4 service cards with numbered labels, hover effects, glow borders
3. **How It Works** — Step-by-step process visualization (animated timeline or flowchart)
4. **Why AgenticMonkey** — Trust signals, differentiators, animated counters
5. **Case Studies / Use Cases** — Real-world scenarios showing AI agent impact
6. **Tech Stack / Integration Partners** — Logo grid of tools we integrate with (n8n, OpenAI, etc.)
7. **Testimonials** — (placeholder for future)
8. **FAQ** — Expandable accordion
9. **CTA Section** — Final call-to-action with cal.com link
10. **Footer** — Links, social, legal

## Critical Requirements
- Mobile-first responsive design
- All CTAs link to: https://cal.com/alex-bosch-nodozz/30min
- SEO meta tags, Open Graph, JSON-LD structured data
- Fast loading (no CDN Tailwind, proper code splitting)
- Accessible (aria labels, semantic HTML, keyboard navigation)
