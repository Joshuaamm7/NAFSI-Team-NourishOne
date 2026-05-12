# 🥦 NourishOne

## Project Context

This project was originally built by Team NourishOne for the NourishNet Data Challenge 2026 Hackathon.  
My primary contribution was data engineering, including cleaning, merging, geocoding, schema design, enrichment, and documentation for 737 verified food pantry locations.

**One Tool. One Community. One Mission.**

Connecting families, donors, and volunteers to food resources across metropolitan Washington, DC.

[![Deploy to GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)](https://github.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)](https://leafletjs.com/)

---

## What is NourishOne?

NourishOne is a static React web app that helps people in the DC, Maryland, and Virginia region find food assistance. It aggregates **737 verified food pantry locations** into a searchable, filterable, map-driven interface with three dedicated portals:

- **Find Food** — Families search for nearby pantries by food type, dietary need, and distance
- **Donate** — Donors see wishlists and high-need areas to direct their contributions
- **Volunteer** — Volunteers find missions matching their skills and languages

Built in 72 hours for the **NourishNet Data Challenge 2026** at the University of Maryland.

---

## Features

- **737 verified food assistance locations** across MD, DC, and VA
- **Interactive Leaflet map** with color-coded markers (green/orange/blue by portal type) and rich popups
- **Heatmap overlay** showing food insecurity density with urgency legend
- **Smart filtering** by food type, 7 dietary attributes, distance radius, and AND/OR filter mode
- **Voice search** — speak your needs via Web Speech API with English and Spanish keyword mappings
- **6 languages** — English, Spanish, Chinese, French, Amharic, Tagalog
- **First-visit language selector** — full-screen language picker on first launch
- **"Near Me" geolocation** — find the closest pantries with configurable radius (1/5/10/25 mi)
- **Donor wishlists** — see what each pantry needs, sort by highest community need
- **Impact calculator** — estimate CO₂ saved, meals provided, and water conserved from donations
- **Volunteer missions** — filter by required skills and languages, see urgency and nearby opportunities
- **Persistent preferences** — dietary filters, language, search query, and filter mode survive page refresh
- **Fully static** — no backend, no API keys, no cloud services required
- **100% real data** — every location traceable to a verified public source

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/Joshuaamm7/NAFSI-Team-NourishOne.git
cd NAFSI-Team-NourishSync/nourishnet-app
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is needed because some packages have peer dependency conflicts. This is safe and expected.

### 3. Start the development server

```bash
npm start
```

The app opens automatically at **http://localhost:3000**.

---

## Available Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Starts the dev server at localhost:3000 |
| `npm test` | Runs the test suite (includes property-based tests) |
| `npm run build` | Creates a production build in `build/` |
| `npm run deploy` | Builds and deploys to GitHub Pages |

---

## Deploy to GitHub Pages

### First-time setup

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:

```json
"homepage": "https://YOUR_USERNAME.github.io/NAFSI-Team-NourishSync"
```

2. Ensure `gh-pages` is installed (already in devDependencies):

```bash
npm install --save-dev gh-pages --legacy-peer-deps
```

### Deploy

```bash
npm run deploy
```

This runs `npm run build` automatically, then pushes `build/` to the `gh-pages` branch. Your site will be live within a few minutes.

### Troubleshooting deployment

- The app uses `HashRouter`, so routes look like `https://yoursite.github.io/repo/#/customer`
- If you see a blank page, verify `homepage` in `package.json` matches your actual repo URL

---

## Project Structure

```
nourishnet-app/
├── public/                     # Static assets (favicon, index.html, manifest)
├── src/
│   ├── UI/                     # Page-level components and their styles
│   │   ├── LandingPage.jsx     # First-visit language selector
│   │   ├── WelcomePage.jsx     # Welcome / onboarding screen
│   │   ├── PortalPage.jsx      # Tri-portal gateway (Find Food, Donate, Volunteer)
│   │   ├── CustomerPage.jsx    # Customer portal home
│   │   ├── FoodTypesPage.jsx   # Browse by food type
│   │   ├── HealthTypesPage.jsx # Browse by dietary attribute
│   │   ├── NearbyPage.jsx      # Nearby locations (geolocation)
│   │   ├── NowAvailablePage.jsx# Currently open locations
│   │   ├── MapPage.jsx         # Full-screen customer map
│   │   ├── DonorPage.jsx       # Donor portal home
│   │   ├── DonorMapPage.jsx    # Donor map view
│   │   ├── DonorNeedsPage.jsx  # High-need areas for donors
│   │   ├── DonateToPage.jsx    # Donate to a specific location
│   │   ├── VolunteerPage.jsx   # Volunteer portal home
│   │   ├── VolunteerMissionsPage.jsx  # Browse missions
│   │   ├── VolunteerSkillsPage.jsx    # Filter by skill
│   │   ├── VolunteerLanguagesPage.jsx # Filter by language
│   │   ├── VolunteerUrgentPage.jsx    # Urgent volunteer needs
│   │   ├── VolunteerNearbyPage.jsx    # Nearby volunteer opportunities
│   │   ├── VolunteerMapPage.jsx       # Volunteer map view
│   │   ├── AboutPage.jsx       # About / info page
│   │   ├── FilterBar.jsx       # Dietary filter tag bar
│   │   ├── SearchHeader.jsx    # Search input with voice search
│   │   ├── MissionCard.jsx     # Volunteer mission card
│   │   ├── LanguagePopover.jsx # In-app language switcher
│   │   └── assets/             # Images and icons
│   ├── components/
│   │   ├── christian/          # Gateway, Layout, LanguageToggle
│   │   ├── joe/                # VoiceSearch, FilterEngine, ImpactCalculator
│   │   ├── ryan/               # MapView, HeatmapLayer, Legend, ViewToggle
│   │   └── shared/             # Reusable components (Button, LocationCard)
│   ├── data/
│   │   ├── locations_final_merged.json  # Production dataset (737 locations)
│   │   ├── area_income_sources.json     # Economic context data
│   │   ├── DATA_DICTIONARY.md           # Field documentation
│   │   ├── DATA_FILES_README.md         # Data pipeline docs
│   │   └── schema.md                    # LocationEntry schema
│   ├── locales/                # Translation files (en, es, zh, fr, am, tl)
│   ├── utils/
│   │   ├── filterUtils.js      # Filter logic (AND/OR, distance, dietary)
│   │   ├── heatmapUtils.js     # Heatmap density calculations
│   │   ├── i18n.js             # i18next configuration
│   │   ├── placeCategory.js    # Auto-detect location category
│   │   ├── preferences.js      # localStorage preference management
│   │   └── translateHours.js   # Hours string translation
│   ├── App.js                  # Root component with HashRouter routing
│   └── index.js                # Entry point
├── package.json
└── postcss.config.js
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| React Router 6 | Client-side routing (HashRouter for GitHub Pages) |
| Tailwind CSS 3 | Utility-first styling |
| Leaflet + react-leaflet | Interactive maps with heatmap overlay |
| i18next + react-i18next | Multi-language support (6 languages) |
| Web Speech API | Voice search (browser native) |
| fast-check | Property-based testing |
| gh-pages | GitHub Pages deployment |

---

## Data

The production dataset (`locations_final_merged.json`) contains 737 locations with:

- Name, structured address, geocoded coordinates
- Hours, phone, website, requirements
- Food types (16 categories)
- Health/dietary attributes (7 boolean flags: halal, vegan, vegetarian, noBeef, lowGI, freshProduce, dairyFree)
- Insecurity index for need-based prioritization
- Donor fields (wishlist, accepts perishable, drop-off hours)
- Volunteer fields (missions with skills/languages, volunteers needed)
- Full source lineage (source name, URL, extraction page)

See `src/data/DATA_FILES_README.md` for complete documentation of all data files and the pipeline.

---

## Testing

The test suite includes 12 property-based and integration tests covering:

- Route rendering and undefined-route redirects
- Location data schema conformance
- Translation key parity across all locale files
- Language switching and preference persistence
- User preferences localStorage round-trip
- Tailwind config validation
- LanguageToggle and MapView component tests

Run with:

```bash
npm test
```

---

## Team

| Member | Role | Key Contributions |
|--------|------|-------------------|
| **Joshua** | Data Engine | Data pipeline, scraping, geocoding, schema design, enrichment, documentation |
| **Christian** | Lead Developer | React architecture, routing, i18n, Gateway, Layout, portal integration |
| **Joe** | Logic & Innovation | Filter engine, voice search, impact calculator, preferences, property-based tests |
| **Ryan** | UX & Logic Support | Map integration, heatmap, location cards, design system, responsive UI |

---

## Troubleshooting

**`npm install` fails with peer dependency errors**
```bash
npm install --legacy-peer-deps
```

**Map doesn't render**
Ensure Leaflet CSS is imported. Check that `src/index.css` includes:
```css
@import 'leaflet/dist/leaflet.css';
```

**Blank page after deploy**
- Verify `homepage` in `package.json` matches your GitHub Pages URL
- The app uses `HashRouter` — URLs should have `/#/` in them

**i18n not working**
- Verify `src/utils/i18n.js` is imported in `App.js`
- Check that locale files exist in `src/locales/`

---

## License

Built for the NourishNet Data Challenge 2026. All data sourced from public government and nonprofit websites.

---

*Built with care at UCSD — April 11–13, 2026.*
