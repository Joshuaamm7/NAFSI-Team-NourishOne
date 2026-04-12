# Implementation Plan: Tailwind Design System & MapView

## Overview

This plan implements two foundational pieces for NourishNet: a Tailwind CSS design system with food/nature-themed tokens, and a MapView component using react-leaflet. Tasks are ordered so each builds on the previous, starting with configuration, then the component, then tests.

## Tasks

- [x] 1. Update Tailwind config with NourishNet design tokens
  - [x] 1.1 Add introductory comment block and primary color scale
    - Add a top-of-file comment block summarizing NourishNet design token categories (colors, shadows, radii)
    - Add `primary` green color scale (shades 50–900) inside `theme.extend.colors` with an inline comment describing its use for navigation and buttons
    - Use exact hex values from the design document (e.g., 500: `#22c55e`)
    - Ensure the `extend` pattern is used so default Tailwind utilities remain available
    - _Requirements: 1.1, 1.4, 2.3, 3.1, 3.3_

  - [x] 1.2 Add warm and neutral color scales
    - Add `warm` amber color scale (shades 50–900) with inline comment describing its use for accents and CTAs
    - Add `neutral` gray color scale (shades 50–900) with inline comment describing its use for text, borders, and backgrounds
    - Use exact hex values from the design document
    - _Requirements: 1.2, 1.3, 1.4, 3.1_

  - [x] 1.3 Add semantic colors, custom shadows, and border radius
    - Add `success` (`#22c55e`), `warning` (`#f59e0b`), and `danger` (`#ef4444`) semantic colors
    - Add `boxShadow.soft` and `boxShadow.hover` with values from the design document, with inline comments describing their visual effect
    - Add `borderRadius.card` set to `1rem`
    - _Requirements: 1.5, 2.1, 2.2, 2.4, 2.5, 3.2_

- [x] 2. Checkpoint — Verify Tailwind config
  - Ensure the config file has no syntax errors by running `npm start` briefly or reviewing the file
  - Ensure all default Tailwind utilities (`gap-4`, `rounded-2xl`, etc.) still work alongside custom tokens
  - Ask the user if questions arise

- [x] 3. Create MapView component
  - [x] 3.1 Create MapView.jsx with Leaflet CSS import and basic map
    - Create file at `src/components/ryan/MapView.jsx`
    - Import Leaflet CSS (`leaflet/dist/leaflet.css`) at the top of the file
    - Import `MapContainer`, `TileLayer`, `Marker`, `Popup` from `react-leaflet`
    - Define constants: `PG_COUNTY_CENTER = [38.83, -76.85]`, `DEFAULT_ZOOM = 11`, tile URL and attribution
    - Render a `MapContainer` centered on PG County with OpenStreetMap tiles
    - _Requirements: 4.1, 4.2, 4.3, 5.1_

  - [x] 3.2 Add locations prop, markers, and popups
    - Accept `locations` prop with default value `[]`
    - Add defensive filtering: filter out entries missing numeric `lat`/`lng` or `name`
    - Map valid locations to `<Marker>` components with `position={[loc.lat, loc.lng]}`
    - Render `<Popup>` with `<strong>{loc.name}</strong>` and conditional `{loc.address && <p>{loc.address}</p>}`
    - Export the component as default
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3_

  - [x] 3.3 Add responsive wrapper styling
    - Wrap `MapContainer` in a `<div>` with `w-full min-h-[400px]` and a responsive rule for mobile (`max-sm:min-h-[300px]` or equivalent)
    - Set `height: 100%` and `width: 100%` on the `MapContainer` style so Leaflet fills the wrapper
    - _Requirements: 5.6, 5.7_

- [x] 4. Checkpoint — Verify MapView renders
  - Ensure MapView can be imported and rendered in a parent component without errors
  - Ensure all tests pass, ask the user if questions arise

- [x] 5. Install fast-check and write Tailwind config smoke tests
  - [x] 5.1 Install fast-check
    - Run `npm install --save-dev fast-check` in the `nourishnet-app` directory
    - _Requirements: (testing infrastructure)_

  - [x]* 5.2 Write Tailwind config smoke tests
    - Create `src/__tests__/tailwind.config.test.js`
    - Import the config from `../../tailwind.config.js`
    - Test: primary palette has shades 50–900 (≥5 keys)
    - Test: warm palette has shades 50–900 (≥5 keys)
    - Test: neutral palette has shades 50–900 (≥5 keys)
    - Test: semantic colors `success`, `warning`, `danger` are defined
    - Test: `boxShadow.soft` and `boxShadow.hover` are non-empty strings
    - Test: `borderRadius.card` is defined
    - Test: config uses `theme.extend` pattern (not direct override)
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 2.1, 2.2, 2.3, 2.4_

- [x] 6. Write MapView unit and property tests
  - [x]* 6.1 Write MapView unit tests
    - Create `src/__tests__/MapView.test.jsx`
    - Mock `react-leaflet` components (`MapContainer`, `TileLayer`, `Marker`, `Popup`) since JSDOM doesn't support Leaflet's DOM requirements
    - Test: renders map container element
    - Test: MapContainer receives PG County center and zoom 11
    - Test: renders with empty locations array (no markers, no errors)
    - Test: renders with `null` locations (no crash)
    - Test: renders with `undefined` locations (no crash)
    - Test: renders 3 markers when given 3 sample locations
    - Test: responsive container has min-height 400px class
    - _Requirements: 4.2, 5.1, 5.5, 5.6, 6.1, 6.3_

  - [x]* 6.2 Write property test — Marker placement correctness (Property 1)
    - **Property 1: Marker placement correctness**
    - Use `fast-check` to generate arrays of valid location objects (0–50 items, random numeric lat/lng, random string names)
    - Assert: MapView renders exactly one Marker per valid location
    - Assert: each Marker's position equals `[location.lat, location.lng]`
    - Run at least 100 iterations
    - **Validates: Requirements 5.3, 6.2**

  - [x]* 6.3 Write property test — Popup content correctness (Property 2)
    - **Property 2: Popup content correctness**
    - Use `fast-check` to generate location objects with random `name` and optional `address`
    - Assert: each Popup contains the location's `name`
    - Assert: if `address` is provided, the Popup also contains the `address`
    - Run at least 100 iterations
    - **Validates: Requirements 5.4**

- [x] 7. Final checkpoint — Ensure all tests pass
  - Run `npm test` and verify all tests pass
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design
- Unit tests validate specific examples and edge cases
- react-leaflet components must be mocked in tests (JSDOM doesn't support Leaflet's DOM requirements)
