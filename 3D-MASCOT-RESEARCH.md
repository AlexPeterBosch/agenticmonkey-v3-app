# 3D Animated Mascot Research — AgenticMonkey

## Goal
Achieve ChainGPT / Shieldeum level 3D animated mascot for the website.

## What ChainGPT & Shieldeum Do
- Professional 3D character models (rigged, textured)
- Embedded via **Spline** (interactive 3D in browser) or **Rive** (2D with 3D feel)
- Idle animations (breathing, floating, looking around)
- Scroll-triggered animations
- Mouse-follow interactions (character looks at cursor)
- Lightweight runtime (Spline exports as iframe or @splinetool/react)

## Options Evaluated

### 1. Spline (spline.design) ⭐ RECOMMENDED
- **Free tier:** Unlimited projects, 50MB file size, Spline branding on viewer
- **How:** Design 3D character in browser tool, export as embed/React component
- **Pros:** Browser-based editor, real-time collab, interactive animations, mouse tracking built-in
- **Cons:** Free tier has Spline watermark, learning curve for character creation
- **Integration:** `@splinetool/react` npm package or iframe embed
- **Best path:** Find a Spline community character to remix, or commission one on Fiverr ($50-200)
- **What Shieldeum likely uses:** This or similar tool

### 2. Rive (rive.app)
- **Free tier:** Yes, generous
- **How:** Design animated vector characters, export .riv file, use runtime
- **Pros:** Tiny runtime (200KB), buttery smooth, state machine animations
- **Cons:** 2D-focused (can fake 3D), steep learning curve for character design
- **Integration:** `@rive-app/react-canvas` npm package

### 3. Ready Player Me + Three.js
- **Free:** Yes, avatar generation
- **How:** Generate humanoid 3D avatar, load in Three.js with animations
- **Cons:** Human avatars, not custom mascot characters

### 4. Mixamo + Three.js
- **Free:** Yes (Adobe)
- **How:** Upload 3D model → auto-rig → apply animations → export
- **Pros:** Free, huge animation library (2000+ animations)
- **Cons:** Need a 3D model first (chicken-and-egg), human-focused rigging
- **Could work if:** We get a proper 3D model from somewhere

### 5. Sketchfab → Three.js
- **Free models:** Yes, many CC-licensed
- **How:** Find similar robot/monkey character, download GLB, animate in Three.js
- **Pros:** Immediate, high quality models available
- **Cons:** Won't be our exact mascot design

### 6. Commission a 3D Artist
- **Fiverr:** $50-300 for a simple rigged character
- **Upwork:** $100-500
- **Turbosquid/CGTrader:** Buy existing model $10-50, modify
- **Timeline:** 3-7 days

### 7. AI-Generated 3D (Current Tech)
- **Meshy.ai:** Good quality but needs Pro ($13.33/mo) for downloads
- **TripoSR:** Free but low quality on CPU (tested, rejected)
- **Tripo3D:** Free tier available, better quality than TripoSR
- **Rodin by Hyperhuman:** Free tier, high quality
- **CSM.ai:** Free tier available
- **Verdict:** Could get a decent base model, but won't be animated/rigged

## Recommended Strategy (Zero Budget)

### Phase 1: TONIGHT
1. Search Sketchfab for free CC robot/monkey characters
2. Find closest match to our mascot aesthetic
3. Download GLB, integrate with Three.js
4. Add idle animation (floating, breathing via GSAP/Three.js)
5. Add mouse-follow (character rotation follows cursor)
6. This gets us 70% of the way to ChainGPT quality

### Phase 2: THIS WEEK  
1. Sign up for Spline free tier
2. Either remix a community character or build from scratch
3. Spline gives us interactive 3D with zero Three.js complexity
4. Export as embed/React component

### Phase 3: WHEN REVENUE COMES
1. Commission proper 3D mascot on Fiverr ($100-200)
2. Get it rigged + animated in Spline or Mixamo
3. Full ChainGPT-level integration

## Sketchfab Models Found (2026-02-11)

Best candidates for placeholder/inspiration:
1. **BOT Z16 by Oscar Creativo** — Animated, downloadable, cute robot character
   - URL: https://sketchfab.com/3d-models/bot-z16-animation-by-oscar-creativo-22a665407d8948d98c8a38bd7c317582
   - 4.8K views, 351 likes
2. **BOT ZUN by Oscar Creativo** — Animated, downloadable
   - URL: https://sketchfab.com/3d-models/bot-zun-animation-by-oscar-creativo-c0e0b640363345fa9ac0973d90537978
   - 3.1K views, 326 likes
3. **Cyborg model 001** — Downloadable, high quality
   - URL: https://sketchfab.com/3d-models/cyborg-model-001-af071bc3fe274e39aff2a22b5700bdcf
   - 23.5K views, 591 likes
4. **Cube Robot - Animated** — Animated, downloadable
   - URL: https://sketchfab.com/3d-models/cube-robot-animated-30a8e15725cf4feb9a3c8423f89d7df8
   - 8.6K views, 239 likes

Oscar Creativo's bots are closest to the AgenticMonkey vibe (cute, techy, animated).

## Quick Win: Three.js Animated Placeholder
Even without a custom model, we can create an impressive effect:
- Load any robot/tech character GLB from Sketchfab
- GSAP for scroll-triggered rotation/position
- PointLight that follows mouse cursor
- Floating/bobbing idle animation
- Glow/bloom post-processing effects
- This alone would be 10x better than the current static PNG
