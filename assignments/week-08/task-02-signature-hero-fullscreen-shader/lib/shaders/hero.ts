// ============================================================================
// Signature Hero Fragment Shader — embedded as TypeScript string
// ============================================================================
//
// The shader is embedded directly to avoid Turbopack loader configuration
// issues with .frag files. The GLSL source is fully commented and matches
// shaders/hero.frag.
//
// To edit the shader: modify shaders/hero.frag for reference, then
// update the string below to match.
// ============================================================================

export const heroFragmentShader = /* glsl */ `
// ============================================================================
// Signature Hero Fragment Shader
// A premium futuristic aurora-style shader for the portfolio hero section
// ============================================================================

#ifdef GL_ES
precision mediump float;
#endif

// ============================================================================
// Uniforms — passed from JavaScript via Three.js ShaderMaterial
// ============================================================================

// u_time: Elapsed time in seconds since the shader started rendering.
// Used to animate the aurora waves and noise patterns continuously.
uniform float u_time;

// u_resolution: The canvas width and height in pixels.
// Used to maintain correct aspect ratio so the shader looks the same
// on any screen size — stretched circles stay circular, not elliptical.
uniform vec2 u_resolution;

// u_mouse: Normalized mouse position (0.0 to 1.0 on each axis).
// The (.x, .y) coordinates influence the aurora flow direction and
// create a subtle parallax effect — the shader reacts to where
// the user points, making the visual feel alive and interactive.
uniform vec2 u_mouse;

// ============================================================================
// Varying — interpolated from vertex shader
// ============================================================================

// vUv: Normalized UV coordinates (0.0 at bottom-left, 1.0 at top-right).
// Every pixel on the fullscreen quad gets its own vUv, which we use as
// the base coordinate for all noise and color calculations.
varying vec2 vUv;

// ============================================================================
// Noise Functions — Simplex-style noise for organic movement
// ============================================================================

// Utility: generates a pseudo-random value from a 2D coordinate.
// Used as the foundation for procedural noise — gives each point
// in space a unique, repeatable "random" value.
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Value Noise: smoothly interpolates between random values at
// integer grid points. Creates the organic, flowing texture that
// forms the basis of the aurora movement. The "floor" function
// snaps to grid cells, and "smoothstep" creates soft transitions.
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

// Fractal Brownian Motion (fBm): layers multiple noise octaves at
// different frequencies and amplitudes. Each octave adds finer detail,
// creating the complex, natural-looking aurora waves. More octaves =
// more detail but more GPU cost. We use 5 octaves for a good balance.
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

// ============================================================================
// Color Palette — AI-inspired aurora colors
// ============================================================================

// Generates the aurora color at a given coordinate.
// Uses three color channels (blue, purple, cyan) that blend based on
// noise patterns. The time offset creates the flowing movement, and
// the noise layers create organic color variation across the screen.
vec3 auroraColor(vec2 uv, float time) {
  // Primary aurora band — deep blue to electric cyan
  float wave1 = fbm(uv * 2.0 + vec2(time * 0.15, time * 0.08));

  // Secondary aurora band — purple to magenta
  float wave2 = fbm(uv * 1.5 + vec2(-time * 0.1, time * 0.12) + 3.14);

  // Tertiary accent — subtle cyan highlights
  float wave3 = fbm(uv * 3.0 + vec2(time * 0.05, -time * 0.07) + 7.28);

  // Deep space base color (near-black with slight blue tint)
  vec3 deepSpace = vec3(0.02, 0.02, 0.06);

  // Aurora color palette
  vec3 blue   = vec3(0.1, 0.3, 0.8);   // Electric blue
  vec3 purple = vec3(0.4, 0.1, 0.7);   // Deep purple
  vec3 cyan   = vec3(0.1, 0.7, 0.9);   // Bright cyan
  vec3 pink   = vec3(0.6, 0.2, 0.5);   // Soft magenta

  // Blend aurora bands into the scene
  vec3 color = deepSpace;
  color += blue * wave1 * 0.35;
  color += purple * wave2 * 0.3;
  color += cyan * wave3 * 0.2;

  // Add subtle pink highlights at peaks
  float highlight = smoothstep(0.55, 0.85, wave1 * wave2);
  color += pink * highlight * 0.15;

  return color;
}

// ============================================================================
// Mouse Influence — subtle parallax and flow distortion
// ============================================================================

// Applies mouse position to the UV coordinates before color calculation.
// The effect is intentionally subtle — the aurora shifts direction based
// on where the user points, creating a sense of depth and responsiveness
// without being distracting or overwhelming.
vec2 applyMouseInfluence(vec2 uv, vec2 mouse) {
  // Calculate offset from screen center (range: -0.5 to 0.5)
  vec2 mouseOffset = mouse - 0.5;

  // Distort UV based on mouse — creates parallax flow
  uv.x += mouseOffset.x * 0.08;
  uv.y += mouseOffset.y * 0.05;

  // Add subtle wave distortion influenced by mouse position
  uv.x += sin(uv.y * 3.0 + mouseOffset.x * 2.0) * 0.02;
  uv.y += cos(uv.x * 2.5 + mouseOffset.y * 2.0) * 0.015;

  return uv;
}

// ============================================================================
// Main — compositing all layers into the final pixel color
// ============================================================================

void main() {
  // Normalize UV coordinates to 0.0–1.0 range.
  // gl_FragCoord is in pixels; dividing by resolution gives us
  // a consistent coordinate system regardless of canvas size.
  vec2 uv = vUv;

  // Maintain correct aspect ratio — without this, circles would
  // appear as ovals on non-square canvases. We scale the x-axis
  // by the width/height ratio.
  uv.x *= u_resolution.x / u_resolution.y;

  // Apply mouse influence for interactive parallax
  vec2 animatedUv = applyMouseInfluence(uv, u_mouse);

  // Generate the aurora color at this pixel
  vec3 color = auroraColor(animatedUv, u_time);

  // Add a subtle vignette — darkens edges to draw focus to center
  // where the hero text sits. Uses smoothstep for a soft gradient.
  float vignette = 1.0 - smoothstep(0.4, 1.4, length(vUv - 0.5) * 1.8);
  color *= mix(0.6, 1.0, vignette);

  // Add very subtle film grain for texture — prevents banding on
  // smooth gradients. The noise is based on pixel position and time,
  // so it shimmers slightly without being distracting.
  float grain = random(vUv * u_resolution + u_time) * 0.03;
  color += grain;

  // Clamp final color to valid range and output
  gl_FragColor = vec4(color, 1.0);
}
`
