# GSAP Quick Reference for AgenticMonkey v3

## Common ScrollTrigger Mistakes (from GSAP docs)
1. DON'T put ScrollTrigger on tweens nested in a timeline — put it on the timeline itself
2. DON'T create to() logic issues — use fromTo() or immediateRender: false for chained ScrollTriggers
3. Use function-based start/end values for viewport-dependent calculations
4. Use gsap.context() for React cleanup (or useGSAP hook)

## gsap.quickTo() for Mouse Follow
```js
let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" })
let yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" })
container.addEventListener("mousemove", (e) => { xTo(e.pageX); yTo(e.pageY) })
```

## Lenis + GSAP Integration
```js
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

## Pinned Section Pattern
```js
ScrollTrigger.create({
  trigger: '.section',
  pin: true,
  start: 'top top',
  end: '+=500',
  scrub: 1,
})
```

## Text Split Stagger
```js
// Manual char split: wrap each char in a span
gsap.from('.char', {
  y: 100, opacity: 0, stagger: 0.05, duration: 0.8, ease: 'back.out(1.7)',
  scrollTrigger: { trigger: '.heading', start: 'top 80%' }
})
```

## SVG Line Draw
```js
const path = document.querySelector('.draw-line')
const length = path.getTotalLength()
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
gsap.to(path, { strokeDashoffset: 0, scrollTrigger: { trigger: '.section', scrub: true } })
```

## ChainGPT Labs Stats
- 46 GSAP animations
- 8 ScrollTrigger instances
- 5 grid lines (fixed, 1px, full height)
- Webflow + jQuery + GSAP 3.11.5 + ScrollTrigger + Lenis
- NO Three.js, NO WebGL, NO Canvas
