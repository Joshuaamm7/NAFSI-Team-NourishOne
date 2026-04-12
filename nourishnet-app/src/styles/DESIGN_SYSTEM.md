# NourishNet Design System

Quick reference for all design tokens defined in `tailwind.config.js`. Use these instead of raw hex values or ad-hoc styles.

## Colors

### Primary (Green) — Navigation, buttons, primary actions

| Shade | Hex | Tailwind Class | Usage |
|-------|---------|----------------|-------|
| 50 | `#f0fdf4` | `bg-primary-50` | Lightest background tint |
| 100 | `#dcfce7` | `bg-primary-100` | Hover backgrounds |
| 200 | `#bbf7d0` | `bg-primary-200` | Light accents |
| 300 | `#86efac` | `border-primary-300` | Borders, dividers |
| 400 | `#4ade80` | `text-primary-400` | Icons, secondary elements |
| 500 | `#22c55e` | `bg-primary-500` | Primary buttons, links |
| 600 | `#16a34a` | `hover:bg-primary-600` | Hover state |
| 700 | `#15803d` | `active:bg-primary-700` | Active/pressed state |
| 800 | `#166534` | `text-primary-800` | Dark text on light bg |
| 900 | `#14532d` | `text-primary-900` | Darkest text |

### Warm (Amber) — Accents, CTAs, highlights

| Shade | Hex | Tailwind Class | Usage |
|-------|---------|----------------|-------|
| 50 | `#fffbeb` | `bg-warm-50` | Lightest warm tint |
| 100 | `#fef3c7` | `bg-warm-100` | Warm hover backgrounds |
| 200 | `#fde68a` | `bg-warm-200` | Light warm accents |
| 300 | `#fcd34d` | `border-warm-300` | Warm borders |
| 400 | `#fbbf24` | `text-warm-400` | Icons, badges |
| 500 | `#f59e0b` | `bg-warm-500` | CTA buttons, highlights |
| 600 | `#d97706` | `hover:bg-warm-600` | Hover state |
| 700 | `#b45309` | `active:bg-warm-700` | Active/pressed |
| 800 | `#92400e` | `text-warm-800` | Dark warm text |
| 900 | `#78350f` | `text-warm-900` | Darkest warm text |

### Neutral (Gray) — Text, borders, backgrounds

| Shade | Hex | Tailwind Class | Usage |
|-------|---------|----------------|-------|
| 50 | `#fafafa` | `bg-neutral-50` | Page background |
| 100 | `#f5f5f5` | `bg-neutral-100` | Card backgrounds |
| 200 | `#e5e5e5` | `border-neutral-200` | Borders, dividers |
| 300 | `#d4d4d4` | `text-neutral-300` | Disabled states |
| 400 | `#a3a3a3` | `placeholder:text-neutral-400` | Placeholder text |
| 500 | `#737373` | `text-neutral-500` | Secondary text |
| 600 | `#525252` | `text-neutral-600` | Body text |
| 700 | `#404040` | `text-neutral-700` | Headings |
| 800 | `#262626` | `text-neutral-800` | Dark headings |
| 900 | `#171717` | `text-neutral-900` | Darkest text |

### Semantic Colors — Status indicators

| Name | Hex | Tailwind Class | Usage |
|------|---------|----------------|-------|
| Success | `#22c55e` | `text-success`, `bg-success` | Positive status, confirmations |
| Warning | `#f59e0b` | `text-warning`, `bg-warning` | Caution, pending states |
| Danger | `#ef4444` | `text-danger`, `bg-danger` | Errors, destructive actions |

## Spacing

Tailwind's default spacing scale is fully available (not overridden). Common values:

| Class | Value | Use for |
|-------|-------|---------|
| `p-2` / `gap-2` | 0.5rem (8px) | Tight inner padding |
| `p-4` / `gap-4` | 1rem (16px) | Standard padding, grid gaps |
| `p-6` / `gap-6` | 1.5rem (24px) | Section padding |
| `p-8` / `gap-8` | 2rem (32px) | Large section spacing |
| `mt-4` / `mb-4` | 1rem (16px) | Vertical rhythm between elements |

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded` | 0.25rem (4px) | Subtle rounding (inputs) |
| `rounded-lg` | 0.5rem (8px) | Medium rounding (buttons) |
| `rounded-2xl` | 1rem (16px) | Large rounding (cards) |
| `rounded-card` | 1rem (16px) | **Custom** — consistent card rounding |
| `rounded-full` | 9999px | Circles, pills |

## Box Shadows

| Class | Value | Usage |
|-------|-------|-------|
| `shadow-soft` | Subtle diffused shadow | Cards at rest |
| `shadow-hover` | Elevated shadow | Interactive hover states |
| `shadow-sm` | Default Tailwind small | Inputs, small elements |
| `shadow-md` | Default Tailwind medium | Dropdowns |

## Fonts

Currently using the browser default system font stack. If Christian adds a custom `fontFamily` token, it will appear here.

## Breakpoints

Tailwind's default responsive breakpoints (mobile-first):

| Prefix | Min Width | Usage |
|--------|-----------|-------|
| (none) | 0px | Mobile base styles |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

## Quick Examples

```jsx
// Primary button
<button className="bg-primary-500 hover:bg-primary-600 text-white rounded-card px-4 py-2 shadow-soft hover:shadow-hover">
  Find Food
</button>

// Card component
<div className="bg-neutral-100 rounded-card shadow-soft p-6">
  <h2 className="text-neutral-800 text-xl font-bold">Card Title</h2>
  <p className="text-neutral-500">Card description</p>
</div>

// Status badge
<span className="bg-success text-white rounded-full px-3 py-1 text-sm">Open</span>
```
