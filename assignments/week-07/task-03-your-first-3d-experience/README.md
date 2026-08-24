# Task 03: Your First 3D Experience on the Web

**Assignment:** Week 07 - FlyRank Frontend AI Engineering Internship
**Project:** Interactive 3D Scene with React Three Fiber
**Date:** 2026-08-24

## Overview

Built a production-quality interactive 3D experience using Next.js, TypeScript, React Three Fiber, and Three.js. The scene features a floating animated torus knot with real-time color changes, wireframe toggle, and camera controls.

## What Was Built

- **Interactive 3D Scene**: A torus knot geometry floating in space with stars background
- **Real-time Color Changes**: Click the shape or use color picker to change colors
- **Animation Controls**: Play/pause floating animation with keyboard or button
- **Wireframe Toggle**: Switch between solid and wireframe rendering
- **Camera Controls**: Orbit, zoom, and reset camera position
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Reduced Motion Support**: Respects `prefers-reduced-motion` system setting

## Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.12 | React framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Three.js | Latest | 3D rendering engine |
| @react-three/fiber | Latest | React renderer for Three.js |
| @react-three/drei | Latest | Useful helpers and abstractions |
| Tailwind CSS | 4.x | Styling |

## Features

### 3D Scene
- Torus knot geometry with metallic material
- Dynamic emissive glow on hover
- Stars background with fog effect
- Directional and point lighting with shadows

### Interactions
- **Click shape**: Cycles through 6 colors
- **Hover**: Glow effect + cursor change
- **Drag**: Orbit camera around scene
- **Scroll**: Zoom in/out
- **Keyboard shortcuts**:
  - `Space` - Toggle animation
  - `W` - Toggle wireframe
  - `R` - Reset camera

### Control Panel
- Animation toggle button
- Wireframe toggle button
- Reset camera button
- Color picker with 6 options
- Keyboard shortcuts reference

## Performance Optimization

| Optimization | Implementation |
|--------------|----------------|
| Lazy Loading | Canvas loaded via `React.lazy()` |
| Suspense | Loading fallback during chunk load |
| DPR Capping | `dpr={[1, 2]}` limits pixel ratio |
| Memoization | Material created with `useMemo` |
| Reduced Motion | Respects `prefers-reduced-motion` |
| WebGL Check | Fallback for unsupported browsers |

## Mobile Testing

| Device | Status |
|--------|--------|
| Desktop (Chrome) | Working |
| Desktop (Firefox) | Working |
| Desktop (Safari) | Working |
| Tablet (iPad) | Working |
| Mobile (iOS) | Working |
| Mobile (Android) | Working |

Touch interactions:
- Single finger drag: Orbit
- Pinch: Zoom
- Tap shape: Color change

## Accessibility

- WebGL fallback message for unsupported browsers
- ARIA labels on interactive elements
- Keyboard navigation support
- Skip-to-content link
- Semantic HTML structure
- Reduced motion respected

## Project Structure

```
task-03-your-first-3d-experience/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main 3D experience page
│   ├── globals.css             # Global styles
│   └── not-found.tsx           # 404 page
├── components/
│   ├── three/
│   │   ├── Scene.tsx           # R3F Canvas wrapper + lazy load
│   │   ├── FloatingShape.tsx   # Interactive animated geometry
│   │   ├── Lighting.tsx        # Scene lights + environment
│   │   └── SceneContent.tsx    # Combines all 3D elements
│   └── ui/
│       └── ControlPanel.tsx    # UI controls for interaction
├── data/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md
└── FE10_REPORT.md
```

## Future Improvements

1. **Custom 3D Models**: Load GLTF/GLB models instead of primitive shapes
2. **Physics**: Add physics simulation with @react-three/rapier
3. **Post-processing**: Add bloom, SSAO, and other effects
4. **Multi-object Scene**: Multiple interactive objects
5. **Drag & Drop**: Allow users to drag objects in scene
6. **VR/AR Support**: WebXR integration
7. **GSAP Integration**: Advanced animation sequences
8. **Shader Materials**: Custom GLSL shaders for unique effects

## Build Output

```
Route (app)
├ ○ /
└ ○ /_not-found

○  Static prerendered as static content
```

## Dependencies Added

```json
{
  "three": "^0.170.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.114.0",
  "@types/three": "^0.170.0"
}
```
