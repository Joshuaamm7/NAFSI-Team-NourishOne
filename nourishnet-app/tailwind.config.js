/**
 * NourishNet Design System — Tailwind CSS Configuration
 *
 * Design token categories:
 *   • Colors   — primary (green), warm (amber), neutral (gray), semantic (success/warning/danger)
 *   • Shadows  — soft (cards), hover (interactive states)
 *   • Radii    — card (consistent card rounding)
 *
 * All tokens are added via `theme.extend` so default Tailwind utilities remain available.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Green) — navigation, buttons, primary actions
        primary: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Warm (Amber) — accents, CTAs, highlights
        warm: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutral (Gray) — text, borders, backgrounds
        neutral: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Semantic — status indicators across portals
        success: '#22c55e',
        warning: '#f59e0b',
        danger:  '#ef4444',
      },
      // Shadows — soft for cards at rest, hover for interactive lift
      boxShadow: {
        soft:  '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        hover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      // Radii — consistent card rounding (16px)
      borderRadius: {
        card: '1rem',
      },
    },
  },
  plugins: [],
}
