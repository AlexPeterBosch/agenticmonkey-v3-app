# ChainGPT Website Technical Analysis

## Tech Stack
- **Platform:** Webflow (hosted on `cdn.prod.website-files.com`)
- **CSS:** Webflow shared CSS (`chain-gpt.shared.a72f5a58b.min.css`)
- **Fonts:** Roboto Mono (300-700 weights) via Google Fonts
- **Animation Engine:** GSAP (confirmed via `window.gsap`)
- **3D/WebGL:** Custom WebGL canvas (1518x630px) in hero — NOT Three.js (window.THREE is false)
- **Rive Animations:** 4 Rive animation canvases (1053x615px each) — used for interactive mascot/character animations throughout the page
- **Lottie:** Present (lottie-player detected)
- **Videos:** 3 pre-rendered MP4 videos:
  - `eyes_video-transcode.mp4` — eye animation (pre-rendered, not real-time)
  - `touch_video-transcode.mp4` — touch/interaction animation
  - `cgpt_coin_sequence-hevc-safari.mp4` — token coin spin
- **Framework:** NOT React/Next.js/Nuxt — it's pure Webflow with custom JS
- **No Spline** detected

## Hero Section
- Class: `.hero`
- Contains a WebGL canvas (1518x630px) — this is the 3D mascot in the hero
- The hero mascot is rendered via a CUSTOM WebGL implementation or a WebGL library (not Three.js)
- Alternatively, it could be a pre-rendered 3D animation played back via WebGL canvas

## Key Insight: Rive Animations
ChainGPT uses **Rive** (rive.app) for their character animations. Rive is:
- A real-time animation tool (like After Effects but for web)
- Creates interactive, state-machine-driven animations
- Exports to `.riv` files that play on canvas
- Supports mouse interaction, state transitions, bone animations
- Very lightweight and performant
- This is how they get the "moving character parts" effect — NOT Three.js, NOT CSS

## How They Achieve Premium Feel
1. **Rive** for character animations (eyes, movements, interactions)
2. **Pre-rendered MP4 videos** for complex 3D scenes (eyes close-up, touch effects)
3. **WebGL** for the hero 3D scene
4. **GSAP** for scroll animations and page transitions
5. **Webflow** for the layout and responsive design
6. Dark theme with accent glows (very similar to our approach)

## What This Means For Us
To match ChainGPT's mascot quality, we need EITHER:
1. **Rive animation** — Create a .riv file of our monkey mascot with bone animations (requires Rive editor — rive.app)
2. **Pre-rendered video** — Render the 3D monkey animation in Blender/similar and export as MP4 video that loops
3. **Spine/DragonBones** — Similar 2D bone animation tools
4. **Three.js with rigged model** — Our current approach, but the GLB needs bones/animations added in Blender

The FASTEST path to ChainGPT-quality animations:
- **Option A:** Use Rive (free tier available) to create an animated mascot → export .riv → embed in React
- **Option B:** Pre-render a turntable animation of the monkey in a 3D tool → embed as looping MP4 video
- **Option C:** Enhance our Three.js approach with better model + programmatic animations
