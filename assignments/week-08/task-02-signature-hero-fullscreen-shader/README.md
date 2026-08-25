# Signature Hero: Fullscreen Shader

A premium fullscreen GLSL fragment shader powering the hero section of the FlyRank developer portfolio. Renders an animated aurora-style visual with noise-based flowing energy waves, mouse-reactive parallax, and a futuristic AI-inspired color palette.

---

## What Was Built

The hero section of the portfolio has been replaced with a fullscreen WebGL shader background. The shader renders directly behind the hero text content (name, title, tagline, CTA buttons) creating an immersive, visually distinctive first impression.

### Key Features

- **Custom GLSL fragment shader** with simplex noise and fractal Brownian motion
- **Fullscreen WebGL canvas** rendered via React Three Fiber
- **Mouse-reactive parallax** — the aurora shifts based on cursor position
- **Touch support** for mobile devices
- **Reduced motion fallback** — static gradient for users who prefer reduced motion
- **Tab visibility detection** — animation pauses when browser tab is hidden
- **WebGL detection** — graceful fallback if WebGL is unavailable
- **DPR capping** at `[1, 2]` for performance on high-DPI screens

---

## Why This Shader Design

The aurora design was chosen for several reasons:

1. **Visual Distinction** — Most developer portfolios use static gradients or stock images. An animated shader immediately signals technical capability.

2. **AI Technology Feeling** — The blue/purple/cyan aurora palette evokes the aesthetic of AI research labs, neural networks, and futuristic technology — aligning with the "Frontend AI Engineer" title.

3. **Professional Appearance** — The dark background with subtle flowing colors is elegant without being distracting. The hero text remains highly readable against the dark shader.

4. **Technical Demonstration** — A custom GLSL shader demonstrates knowledge of GPU programming, linear algebra, and creative coding — skills that differentiate a frontend engineer.

5. **Interactivity** — Mouse-reactive parallax creates a sense of depth and responsiveness that static images cannot match.

---

## Technology Used

| Technology | Purpose |
|------------|---------|
| **GLSL** | Fragment shader language for GPU-based rendering |
| **Three.js** | WebGL abstraction layer for material and geometry management |
| **React Three Fiber** | Declarative React renderer for Three.js |
| **Tailwind CSS** | Styling for hero text content |
| **Next.js 16** | Framework with App Router and Turbopack |

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

The shader hero appears on the homepage. Move your mouse over the hero area to see the parallax effect.

---

## Architecture Overview

```
components/hero/
├── ShaderHero.tsx       # Main orchestrator — combines canvas + content
├── ShaderCanvas.tsx     # Three.js Canvas with WebGL shader rendering
└── HeroContent.tsx      # Text overlay (name, title, tagline, buttons)

lib/shaders/
└── hero.ts              # GLSL fragment shader (embedded as TypeScript string)

shaders/
└── hero.frag            # Reference GLSL source file (not imported directly)
```

### Component Hierarchy

```
Hero (components/sections/Hero.tsx)
└── ShaderHero (lazy-loaded)
    ├── ShaderCanvas
    │   ├── Canvas (React Three Fiber)
    │   │   └── AuroraMesh
    │   │       └── shaderMaterial (heroFragmentShader)
    │   └── Mouse/touch event handlers
    └── HeroContent
        ├── h1 (name)
        ├── p (tagline)
        ├── p (description)
        └── Button[] (CTA links)
```

### Data Flow

```
Mouse/Touch Event → mouseRef.current (THREE.Vector2)
                          ↓
Canvas useFrame loop → lerps mouse toward target
                          ↓
ShaderMaterial uniforms → u_mouse updated each frame
                          ↓
GLSL fragment shader → aurora color shifted by mouse offset
```

---

## Performance Decisions

| Decision | Reason |
|----------|--------|
| DPR capped at `[1, 2]` | Prevents GPU overload on 3x/4x displays |
| `frameloop="never"` when hidden | Stops rendering when tab is not visible |
| `powerPreference: "high-performance"` | Requests dedicated GPU on hybrid systems |
| `antialias: false` | Fullscreen quads don't need antialiasing |
| Lazy-loaded via `React.lazy` | Shader canvas doesn't block initial paint |
| Static fallback for reduced motion | Respects user OS preference |
| `depthWrite: false`, `depthTest: false` | Fullscreen quad doesn't need depth buffer |

---

## Reduced Motion Fallback

When the user's OS has `prefers-reduced-motion: reduce` enabled:

- The WebGL canvas is **not rendered**
- A **static CSS gradient** is shown instead
- The gradient uses the same color palette (blue/purple/cyan) as the shader
- No animation occurs

This ensures the portfolio is comfortable for users with vestibular disorders or motion sensitivity.

---

## Files

| File | Purpose |
|------|---------|
| `components/hero/ShaderHero.tsx` | Main hero component with Suspense |
| `components/hero/ShaderCanvas.tsx` | WebGL canvas and shader rendering |
| `components/hero/HeroContent.tsx` | Hero text overlay |
| `components/sections/Hero.tsx` | Lazy-loads ShaderHero |
| `lib/shaders/hero.ts` | GLSL fragment shader source |
| `shaders/hero.frag` | Reference GLSL file |
| `types/shaders.d.ts` | TypeScript declarations for shader imports |
| `SHADER_EXPLANATION.md` | Detailed GLSL code walkthrough |
| `PERFORMANCE_NOTE.md` | Performance analysis and decisions |
