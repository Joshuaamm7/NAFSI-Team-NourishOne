# NourishNet — Day 3 TODO List (Monday April 13)

**Deadline**: 2:00 PM PT  
**Current state**: 80 of 107 features implemented, 6 partial

---

## Complete Feature Inventory

### ✅ = Done | 🟡 = Partial | ❌ = Not Started

---

### Global / Gateway

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| A1 | Gateway landing page with tri-portal cards | ✅ | Find Food, Donate, Volunteer |
| A2 | First-visit language selector (full-screen, searchable) | ✅ | Shows if no saved pref |
| A3 | 6-language i18n (EN, ES, ZH, FR, AM, TL) | ✅ | All locale files present |
| A4 | Language toggle dropdown in navbar | ✅ | Searchable, flag + native label, persists to localStorage |
| A5 | Persistent layout with navbar | ✅ | App name, language toggle, conditional "Back to Home" |
| A6 | Client-side routing (HashRouter) | ✅ | `/`, `/family`, `/donor`, `/volunteer`, `*` → `/` |
| A7 | User preferences persistence (localStorage) | ✅ | language, role, dietary_tags, household_size, search_query, filter_mode |
| A8 | GitHub Pages deployment config | ✅ | gh-pages, predeploy/deploy scripts |
| A9 | Tailwind design system (custom tokens) | ✅ | Primary green, warm amber, neutral gray, semantic, shadow-soft/hover |
| A10 | Design system documentation | ✅ | `DESIGN_SYSTEM.md` |
| A11 | Demographic alignment (household size, gender, age quick-select) | ❌ | Mentioned in PDR |
| A12 | Webpage introduction / onboarding | ❌ | User-requested |

### Customer Portal (Family Portal)

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| B1 | Location listing from JSON (737 locations) | ✅ | Filtered to `type === 'customer'` |
| B2 | Text search (name, address, foodTypes, tags) | ✅ | Real-time |
| B3 | Dietary filter toggles (7 filters) | ✅ | Halal, Vegan, Vegetarian, No Beef, Low GI, Fresh Produce, Dairy Free |
| B4 | AND/OR filter mode toggle | ✅ | Persisted to localStorage |
| B5 | Voice search (Web Speech API) | ✅ | Mic → transcription → keyword mapping → auto-filter |
| B6 | Multi-language voice recognition | ✅ | Sets `recognition.lang` per i18n language |
| B7 | Spanish voice keyword mappings | ✅ | `VOICE_KEYWORD_MAP_ES` |
| B8 | Voice feedback UI (transcript + activated filters) | ✅ | 3-second display |
| B9 | Voice error recovery (auto-retry on no-speech) | ✅ | Retry once after 500ms |
| B10 | "Near Me" geolocation button | ✅ | 10mi default radius |
| B11 | Distance-based filtering (radius dropdown) | ✅ | 1/5/10/25 mi; shows when location available |
| B12 | Distance display on location cards | ✅ | "X.X mi" badge |
| B13 | Interactive Leaflet map | ✅ | OpenStreetMap tiles |
| B14 | Color-coded map markers (green/orange/blue by type) | ✅ | |
| B15 | Rich marker popups (name, category, address, hours, badges, directions) | ✅ | |
| B16 | "Get Directions" link (Google Maps) | ✅ | |
| B17 | User location marker (pulsing blue dot) | ✅ | Auto-detects geolocation |
| B18 | Map auto-fit bounds | ✅ | `fitBounds()` on location change |
| B19 | Map show/hide toggle | ✅ | |
| B20 | Heatmap / urgency overlay (density-based circles) | ✅ | Colored by how underserved area is |
| B21 | Markers ↔ Heatmap view toggle | ✅ | Radio-style toggle |
| B22 | Urgency legend (5 levels) | ✅ | Critical → Low, color-coded |
| B23 | Location card with health attribute badges | ✅ | Emoji + translated label |
| B24 | Location card with contact info (phone, website) | ✅ | Clickable tel: and external links |
| B25 | Location card with food types | ✅ | Translated labels |
| B26 | Place category detection & translation | ✅ | Auto-detects "Food Pantry", "Church", etc. |
| B27 | Hours string translation | ✅ | Day names, ordinals, common phrases |
| B28 | Results count display | ✅ | Singular/plural |
| B29 | No results empty state | ✅ | Translated message |
| B30 | Filter state persistence (survives refresh) | ✅ | dietary_tags, search_query, filter_mode |
| B31 | Optimized filtering (early-exit, memoized distance) | ✅ | |
| B32 | Sticky horizontal tag bar for health filters | 🟡 | Tags wrap horizontally but not `position: sticky` |
| B33 | Ranking & reviews (community-driven) | ❌ | PDR feature; needs backend |
| B34 | LocalStorage reservation system | ❌ | PDR feature |
| B35 | Sort by name | ❌ | User-requested |
| B36 | Sort by distance | 🟡 | Auto-sorts when radius active, no standalone toggle |
| B37 | Sort alphabetical (default) | ❌ | User-requested |
| B38 | Sort by zipcode | ❌ | User-requested |
| B39 | Event calendar | ❌ | User-requested |
| B40 | Weekly reminder | ❌ | Needs backend |
| B41 | Event update / most current event indicator | ❌ | User-requested |
| B42 | Pagination / page indicator | ❌ | User-requested |
| B43 | Favorite food banks | ❌ | User-requested |
| B44 | Expandable location card detail section | ❌ | Day 2 Task 9.1 |
| B45 | Insecurity index indicator on cards | ❌ | Day 2 Task 9.2 |
| B46 | Loading skeleton states | ❌ | Day 2 Task 9.4 |
| B47 | Empty state with "Clear Filters" button | ❌ | Message exists, no clear button |

### Donor Portal

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| C1 | Donor location listing | ✅ | Shows all 737 (all typed `customer` in data — see critical issue below) |
| C2 | Text search | ✅ | |
| C3 | "Sort by Need" toggle (insecurityIndex desc) | ✅ | |
| C4 | Wishlist tags display | ✅ | Only 11/737 locations have wishlist data |
| C5 | "Accepts Perishable" badge | ✅ | |
| C6 | Drop-off hours display | ✅ | |
| C7 | "High Need Area" indicator (insecurityIndex ≥ 7) | ✅ | |
| C8 | Impact Calculator (lbs → CO₂, meals, water) | ✅ | |
| C9 | Community total impact stats | ✅ | Uses demo value 12,500 lbs |
| C10 | "Share Your Impact" (copy to clipboard) | ✅ | |
| C11 | Impact Calculator i18n | ✅ | |
| C12 | Need-based demand heatmap on Donor Portal | 🟡 | Heatmap exists on map component but not wired into Donor Portal |
| C13 | Real-time demand dashboard / wishlists | 🟡 | UI exists but only 11 locations have data |
| C14 | Gamification / community donor rankings | ❌ | PDR feature |
| C15 | Donor portal map view | ❌ | Customer and Volunteer have maps; Donor does not |

### Volunteer Portal

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| D1 | Volunteer location listing (filtered to missions) | ✅ | |
| D2 | Mission cards (title, description, skills, languages, date) | ✅ | |
| D3 | Skill filter dropdown | ✅ | Dynamically collected from data |
| D4 | Language filter dropdown | ✅ | Dynamically collected from data |
| D5 | Text search | ✅ | |
| D6 | Volunteer portal map with show/hide | ✅ | |
| D7 | Mission count display (singular/plural) | ✅ | |
| D8 | Volunteers needed count per location | ✅ | |
| D9 | "SOS Rescue" emergency board (horizontal scroll of urgent tasks) | ❌ | PDR feature |
| D10 | Calendar sync (Google/Apple "Add to Calendar") | ❌ | PDR feature |
| D11 | Mission sign-up button | ❌ | Translation key exists, no UI |

### Data & Infrastructure

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| E1 | 737 locations in dataset | ✅ | PG County area |
| E2 | Health attributes on all 737 locations | ✅ | All 7 booleans present |
| E3 | Insecurity index on all locations | ✅ | |
| E4 | Donor fields (wishlist, acceptsPerishable, dropOffHours) | 🟡 | Only 11 have wishlist |
| E5 | Volunteer fields (missions, volunteersNeeded) | 🟡 | Only 3 have missions |
| E6 | Data schema documentation | ✅ | `schema.md` |
| E7 | Data dictionary | ✅ | `DATA_DICTIONARY.md` |
| E8 | Data backup | ✅ | |
| E9 | Coordinate validation (PG County bounds) | ✅ | |
| E10 | Source/lineage tracking per location | ✅ | |

### Testing

| # | Feature | Status |
|---|---------|--------|
| F1 | PBT: Defined routes render correct components | ✅ |
| F2 | PBT: Undefined routes redirect to Gateway | ✅ |
| F3 | PBT: LocationEntry schema conformance | ✅ |
| F4 | PBT: Translation key parity (EN ↔ ES) | ✅ |
| F5 | PBT: Language switch updates translations | ✅ |
| F6 | PBT: Language preference persistence | ✅ |
| F7 | PBT: User preferences round-trip | ✅ |
| F8 | Tailwind config test | ✅ |
| F9 | LanguageToggle component test | ✅ |
| F10 | MapView component test | ✅ |
| F11 | i18n integration test | ✅ |
| F12 | Preferences unit test | ✅ |

---

## Critical Data Issue

⚠️ All 737 locations have `type: "customer"`. The Donor and Volunteer portals display the full dataset unfiltered. Only 11 locations have `wishlist` data and only 3 have `missions`. This needs to be addressed for the Donor and Volunteer portals to be meaningful.

---

## Day 3 TODO (Prioritized)

### 🔴 P0 — Must Do Before Deploy

- [ ] **Fix data types**: Assign `type: "donor"` to ~50 locations and `type: "volunteer"` to ~30 locations so portals show relevant subsets
- [ ] **Enrich donor data**: Add `wishlist` arrays to more locations (currently 11/737)
- [ ] **Enrich volunteer data**: Add `missions` arrays to more locations (currently 3/737)
- [ ] **Final `npm run build`** — verify zero errors
- [ ] **Deploy to GitHub Pages** (`npm run deploy`)
- [ ] **Smoke test deployed site** — Gateway → all 3 portals, language switch, map renders, no console errors
- [ ] **Update README.md** — project description, live demo link, feature highlights, tech stack, team credits

### 🟡 P1 — Should Do (High Impact, Achievable)

- [ ] **Sorting dropdown on Customer Portal** — options: Alphabetical (default), Distance (when location available), Zipcode, Highest Need
- [ ] **Expandable location card** — click to expand full address, phone, website, food types, requirements; collapsed by default
- [ ] **Insecurity index indicator on cards** — colored bar: red ≥ 7, yellow 4–6, green < 4
- [ ] **"Clear Filters" button** on empty state — resets dietary tags, search, and radius
- [ ] **Favorite food banks** — heart toggle on cards, `localStorage` key `nourishnet_favorites`, "Show Favorites Only" filter
- [ ] **Add MapView to Donor Portal** — with show/hide toggle, matching Customer Portal pattern
- [ ] **Sort by distance as standalone option** — currently only auto-sorts when radius filter is active
- [ ] **Mobile responsive fixes** — test all portals at 375px, 768px, 1280px; fix overflow/truncation/layout issues
- [ ] **Cross-browser test** — Chrome, Firefox, Safari on deployed site

### 🟢 P2 — Nice to Have (If Time Permits)

- [ ] **Webpage introduction** — brief section on Gateway above portal cards: app stats, "How it works" 3-step icons
- [ ] **Pagination** — 20 results per page, "Page X of Y", Previous/Next buttons, scroll to top
- [ ] **Sort by zipcode** — group/sort locations by zip code
- [ ] **Event calendar** — simple list of upcoming events from location data, sorted by date
- [ ] **Most current event indicator** — badge on nearest upcoming event
- [ ] **Mission sign-up button** — frontend-only on Volunteer Portal, shows confirmation toast
- [ ] **Loading skeleton states** — shimmer placeholder cards while data loads
- [ ] **Sticky dietary filter bar** — make filter tags `position: sticky` at top when scrolling

### ⚪ P3 — Deferred (Post-Hackathon)

- [ ] LocalStorage reservation system
- [ ] Community donor rankings / gamification
- [ ] Calendar sync (Google/Apple)
- [ ] SOS Rescue emergency board
- [ ] Ranking & reviews
- [ ] Weekly reminders
- [ ] Demographic alignment (household size, gender, age)

---

## Cut Rules

**If behind at 11:00 AM**: Drop all P2 items. Focus on P0 + P1 sorting/favorites only.

**If behind at 12:30 PM**: Drop remaining P1 items. Ship what's merged and working. Deploy.

**If build is broken at 1:30 PM**: Revert to last good commit. Deploy that.

---

## Summary

| Category | Done | Partial | Not Started | Total |
|----------|------|---------|-------------|-------|
| Global/Gateway | 10 | 0 | 2 | 12 |
| Customer Portal | 31 | 2 | 14 | 47 |
| Donor Portal | 11 | 2 | 2 | 15 |
| Volunteer Portal | 8 | 0 | 3 | 11 |
| Data/Infra | 8 | 2 | 0 | 10 |
| Testing | 12 | 0 | 0 | 12 |
| **Total** | **80** | **6** | **21** | **107** |
