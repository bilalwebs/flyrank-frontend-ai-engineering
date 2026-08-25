# Shader Explanation

A detailed walkthrough of every section of the GLSL fragment shader powering the signature hero.

---

## Overview

The shader is a **fragment shader** — it runs on the GPU and computes the color of each pixel on the fullscreen quad. It receives three uniforms from JavaScript and produces a final `gl_FragColor` output.

```
Vertex Shader → passes vUv to fragment shader
Fragment Shader → computes color for each pixel
Three.js → handles WebGL setup, uniforms, animation loop
```

---

## 1. Precision and Uniforms

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
```

**What this does:**
- `precision mediump float` — Sets floating-point precision for mobile GPUs. Desktop GPUs default to high precision, but mobile needs explicit declaration.
- `u_time` — Elapsed seconds since the shader started. Drives all animation.
- `u_resolution` — Canvas dimensions in pixels. Used for aspect ratio correction.
- `u_mouse` — Normalized mouse position (0.0–1.0). Creates interactive parallax.

---

## 2. Varying: vUv

```glsl
varying vec2 vUv;
```

**What this does:**
- `vUv` is interpolated from the vertex shader across the entire quad.
- Coordinates range from `(0.0, 0.0)` at bottom-left to `(1.0, 1.0)` at top-right.
- This is the base coordinate system for all noise and color calculations.

**Why it matters:**
Without UV coordinates, we wouldn't know where each pixel is on the quad. UVs are the foundation of all 2D shader effects.

---

## 3. Random Function

```glsl
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
```

**What this does:**
- Takes a 2D coordinate and returns a pseudo-random value between 0.0 and 1.0.
- Uses the classic `sin(dot(...))` hash — a well-known GPU noise technique.
- The magic numbers (`12.9898`, `78.233`, `43758.5453123`) are arbitrary constants that produce good distribution.

**Why it matters:**
This is the building block for all procedural noise. Every other noise function in the shader depends on this randomness.

---

## 4. Value Noise

```glsl
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
```

**What this does:**
1. `floor(st)` — Snaps to the integer grid cell (e.g., `(2.3, 5.7)` → `(2, 5)`).
2. `fract(st)` — Gets the fractional position within the cell (e.g., `(0.3, 0.7)`).
3. Gets random values at the 4 corners of the grid cell.
4. `f * f * (3.0 - 2.0 * f)` — Smoothstep interpolation curve (Hermite interpolation).
5. `mix(...)` — Bilinearly interpolates between the 4 corner values.

**Why it matters:**
Raw `random()` produces harsh, grainy noise. Value noise smooths it out by interpolating between grid points, creating the organic flowing texture needed for aurora effects.

---

## 5. Fractal Brownian Motion (fBm)

```glsl
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(st * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return value;
}
```

**What this does:**
- Layers 5 octaves of noise at increasing frequencies and decreasing amplitudes.
- Each octave doubles the frequency (finer detail) and halves the amplitude (less influence).
- The result is a rich, complex texture that looks natural — like clouds, fire, or aurora.

**Why 5 octaves:**
- Fewer octaves → too smooth, looks artificial
- More octaves → diminishing visual returns, higher GPU cost
- 5 is the sweet spot for aurora-style effects

**The math:**
```
Octave 0: amplitude=0.5, frequency=1.0  (large shapes)
Octave 1: amplitude=0.25, frequency=2.0 (medium detail)
Octave 2: amplitude=0.125, frequency=4.0 (fine detail)
Octave 3: amplitude=0.0625, frequency=8.0 (very fine)
Octave 4: amplitude=0.03125, frequency=16.0 (micro detail)
```

---

## 6. Aurora Color Generation

```glsl
vec3 auroraColor(vec2 uv, float time) {
  float wave1 = fbm(uv * 2.0 + vec2(time * 0.15, time * 0.08));
  float wave2 = fbm(uv * 1.5 + vec2(-time * 0.1, time * 0.12) + 3.14);
  float wave3 = fbm(uv * 3.0 + vec2(time * 0.05, -time * 0.07) + 7.28);

  vec3 deepSpace = vec3(0.02, 0.02, 0.06);
  vec3 blue   = vec3(0.1, 0.3, 0.8);
  vec3 purple = vec3(0.4, 0.1, 0.7);
  vec3 cyan   = vec3(0.1, 0.7, 0.9);
  vec3 pink   = vec3(0.6, 0.2, 0.5);

  vec3 color = deepSpace;
  color += blue * wave1 * 0.35;
  color += purple * wave2 * 0.3;
  color += cyan * wave3 * 0.2;

  float highlight = smoothstep(0.55, 0.85, wave1 * wave2);
  color += pink * highlight * 0.15;

  return color;
}
```

**What this does:**

Three noise waves are generated at different scales and speeds:

| Wave | Scale | Speed | Direction | Color |
|------|-------|-------|-----------|-------|
| `wave1` | 2.0x | 0.15s | Right + up | Blue |
| `wave2` | 1.5x | 0.10s | Left + up | Purple |
| `wave3` | 3.0x | 0.05s | Right + down | Cyan |

Each wave is a different `fbm()` call with:
- Different UV scale (controls size of noise features)
- Different time speed (controls animation speed)
- Different direction offset (creates flowing motion)
- Phase offset (`3.14`, `7.28`) to prevent waves from being in sync

The waves are blended additively:
- `deepSpace` — Near-black base with slight blue tint
- `blue * wave1 * 0.35` — Primary aurora band
- `purple * wave2 * 0.3` — Secondary band
- `cyan * wave3 * 0.2` — Accent highlights
- `pink * highlight * 0.15` — Subtle pink at wave peaks

**Why it looks like aurora:**
The additive blending of multiple noise waves at different scales creates the layered, flowing appearance of real aurora borealis. The color palette (blue/purple/cyan) matches the most common aurora colors.

---

## 7. Mouse Influence

```glsl
vec2 applyMouseInfluence(vec2 uv, vec2 mouse) {
  vec2 mouseOffset = mouse - 0.5;

  uv.x += mouseOffset.x * 0.08;
  uv.y += mouseOffset.y * 0.05;

  uv.x += sin(uv.y * 3.0 + mouseOffset.x * 2.0) * 0.02;
  uv.y += cos(uv.x * 2.5 + mouseOffset.y * 2.0) * 0.015;

  return uv;
}
```

**What this does:**
1. Calculates mouse offset from screen center (range: -0.5 to 0.5).
2. Shifts UV coordinates based on mouse position — creates parallax.
3. Adds sinusoidal distortion influenced by mouse — creates wave-like flow.

**Why the effect is subtle:**
The multipliers (`0.08`, `0.05`, `0.02`, `0.015`) are intentionally small. Large values would make the aurora jump around distractingly. Small values create a gentle, responsive feel.

**Why sine/cosine:**
Using `sin(uv.y * 3.0 + mouseOffset.x * 2.0)` creates waves that flow differently based on mouse position. The `sin`/`cos` pair ensures horizontal and vertical distortions are offset, preventing uniform movement.

---

## 8. Main Function

```glsl
void main() {
  vec2 uv = vUv;
  uv.x *= u_resolution.x / u_resolution.y;

  vec2 animatedUv = applyMouseInfluence(uv, u_mouse);
  vec3 color = auroraColor(animatedUv, u_time);

  float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 1.8);
  color *= mix(0.6, 1.0, vignette);

  float grain = random(vUv * u_resolution + u_time) * 0.03;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}
```

**Step by step:**

1. **UV normalization** — `vUv` is already 0–1, but we scale x by aspect ratio so circles stay circular.

2. **Mouse influence** — Applies parallax distortion to the UV coordinates.

3. **Aurora color** — Generates the flowing aurora color at the distorted UV.

4. **Vignette** — Darkens edges:
   - `length(vUv - 0.5)` — Distance from screen center
   - `smoothstep(0.4, 1.4, ...)` — Smooth transition from bright center to dark edges
   - `mix(0.6, 1.0, vignette)` — Center stays full brightness, edges dim to 60%

5. **Film grain** — Subtle noise based on pixel position and time:
   - Prevents color banding on smooth gradients
   - `0.03` multiplier keeps it barely visible
   - Time-based so it shimmers slightly

6. **Output** — Final color with alpha=1.0 (fully opaque).

---

## Uniform Interaction Summary

| Uniform | Type | Effect |
|---------|------|--------|
| `u_time` | `float` | Drives animation — increases continuously, wrapping at ~24 hours |
| `u_resolution` | `vec2` | Aspect ratio correction + grain texture scale |
| `u_mouse` | `vec2` | Parallax shift + wave distortion direction |

---

## Performance Considerations

- **5 fBm octaves** — Each octave is a `noise()` call with `floor`, `fract`, 4 `random()` calls, and `mix`. Total: ~100 GPU operations per pixel per frame.
- **3 aurora waves** — Each is a separate fBm call. Total: ~300 operations per pixel.
- **Film grain** — 1 `random()` call per pixel.
- **Total**: ~300-350 GPU operations per pixel per frame — well within budget for modern GPUs.

On a 1920x1080 display, that's ~650 million operations per frame. At 60fps, that's ~39 billion operations per second — but GPU parallelism handles this easily since each pixel is computed independently.
