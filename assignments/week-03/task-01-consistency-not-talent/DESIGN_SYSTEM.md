# Design System

## Design Philosophy

The portfolio follows a "quiet design" philosophy where visual elements support content rather than compete with it. Every design decision prioritizes readability, professionalism, and project visibility. The system is built on consistency — using the same patterns repeatedly creates a cohesive experience that lets visitors focus on the work.

## Color Palette

### Primary Colors

| Role | Hex | Usage |
|------|-----|-------|
| Primary | #4C5FD5 | Buttons, links, interactive elements |
| Primary Hover | #3B4FC4 | Button hover states |
| Accent | #E8A33D | Highlights, badges, call-to-action emphasis |

### Neutral Colors

| Role | Hex | Usage |
|------|-----|-------|
| Background Light | #FFFFFF | Light mode background |
| Background Dark | #0A0A0A | Dark mode background |
| Foreground Light | #171717 | Light mode text |
| Foreground Dark | #EDEDED | Dark mode text |
| Zinc 50-950 | Tailwind zinc scale | Borders, subtle backgrounds, muted text |

### Color Decisions

- **Limited palette**: Only 2 brand colors (primary + accent) prevent visual chaos
- **Accessible contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Dark mode support**: Automatic switching based on system preference
- **Consistent usage**: Primary for actions, accent for emphasis only

## Typography System

### Font Choices

| Type | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | Space Grotesk | Bold (700) | Page titles, section headers |
| Body | Inter | Regular (400) | Paragraphs, descriptions |
| Code | Geist Mono | Regular (400) | Code snippets, technical content |

### Font Hierarchy

```
H1: 4xl/5xl/6xl (responsive) - Space Grotesk Bold
H2: 3xl/4xl (responsive) - Space Grotesk Bold
H3: 2xl - Space Grotesk Bold
H4: xl - Space Grotesk Bold
Body: base/lg - Inter Regular
Small: sm - Inter Regular
```

### Typography Decisions

- **Two font families**: Headings + body create clear hierarchy without excess
- **Responsive sizing**: Text scales appropriately across devices
- **Consistent line heights**: 1.5 for body, 1.2 for headings
- **Letter spacing**: Tight for headings, normal for body

## Spacing System

### Base Unit

All spacing uses Tailwind's 4px base unit scale:

```
p-1 = 4px    p-2 = 8px    p-3 = 12px
p-4 = 16px   p-5 = 20px   p-6 = 24px
p-8 = 32px   p-10 = 40px  p-12 = 48px
p-16 = 64px  p-20 = 80px  p-24 = 96px
```

### Spacing Rules

- **Component padding**: p-4 to p-6 (16-24px)
- **Section spacing**: py-20 to py-32 (80-128px)
- **Element gaps**: gap-4 to gap-8 (16-32px)
- **Container max-width**: max-w-6xl (1152px) with px-4 to px-8

## Border Radius

### Radius Scale

```
rounded-sm = 2px     rounded = 4px
rounded-md = 6px     rounded-lg = 8px
rounded-xl = 12px    rounded-2xl = 16px
rounded-full = 9999px
```

### Radius Rules

- **Buttons**: rounded-lg (8px) - consistent across all variants
- **Cards**: rounded-xl (12px) - slightly larger for container feel
- **Images**: rounded-full for avatars, rounded-xl for project screenshots
- **Inputs**: rounded-lg (8px) - matches button radius

## Shadow System

### Shadow Scale

```
shadow-sm = subtle depth
shadow-md = medium elevation
shadow-lg = prominent depth
shadow-xl = dramatic elevation
```

### Shadow Rules

- **Cards on hover**: shadow-lg - indicates interactivity
- **Dropdown menus**: shadow-xl - floats above content
- **Buttons**: No shadow - flat design with color for emphasis
- **Modals**: shadow-xl - clear visual hierarchy

## Component Consistency

### Buttons

- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **States**: default, hover, focus, disabled, loading
- **Consistent padding**: sm=3/1.5, md=4/2, lg=6/3

### Cards

- **Background**: white (light) / zinc-900 (dark)
- **Border**: 1px zinc-200 (light) / zinc-800 (dark)
- **Radius**: rounded-xl (12px)
- **Padding**: p-6 (24px)
- **Hover state**: shadow-lg + slight scale

### Forms

- **Input height**: h-10 (40px)
- **Input padding**: px-4
- **Input radius**: rounded-lg
- **Focus ring**: 2px primary color with offset
- **Error state**: red border + error message

### Navigation

- **Header height**: 4rem (64px)
- **Nav items**: Consistent padding and hover states
- **Mobile menu**: Slide-in with backdrop blur
- **Active state**: Primary color indicator

## Responsive Breakpoints

```
sm: 640px    md: 768px
lg: 1024px   xl: 1280px
2xl: 1536px
```

### Responsive Rules

- **Mobile first**: Design for smallest screen, enhance for larger
- **Container padding**: px-4 (mobile) → px-6 (tablet) → px-8 (desktop)
- **Grid columns**: 1 (mobile) → 2 (tablet) → 3-4 (desktop)
- **Typography**: Scale down heading sizes on mobile

## Dark Mode

### Implementation

- **System preference**: Automatic detection via prefers-color-scheme
- **Manual toggle**: Optional user override
- **Consistent tokens**: CSS variables switch between light/dark values
- **Component adaptation**: All components support both modes

### Dark Mode Colors

- **Background**: #0A0A0A (not pure black)
- **Foreground**: #EDEDED (not pure white)
- **Borders**: Zinc-800 (subtle but visible)
- **Shadows**: Reduced intensity in dark mode