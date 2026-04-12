# Implementation Plan: Heatmap Visualization (Density-Based Urgency Circles)

## Overview

Replace the `leaflet.heat` gradient heatmap with density-based urgency circles using native Leaflet Circle overlays. Each food pantry gets a colored circle based on how many other pantries are within a 2-mile radius — fewer nearby pantries means higher urgency. Adds a Legend component and updates the existing MapView integration.

## Tasks

- [x] 1. Update `heatmapUtils.js` with density-based urgency calculation
  - [x] 1.1 Replace `toHeatPoints` with `computeUrgencyLevels` in `nourishnet-app/src/utils/heatmapUtils.js`
    - Add `haversineDistance` helper function to calculate distance in miles between two coordinates
    - Add `getUrgencyLevel` function mapping nearby count to urgency level 1–5
    - Add `computeUrgencyLevels` function that filters valid locations, counts nearby pantries within 2-mile radius, and returns locations with urgency data
    - Export `computeUrgencyLevels`, `haversineDistance`, and `getUrgencyLevel` as named exports
    - _Requirements: 2.1, 2.2, 2.5_

- [x] 2. Replace `HeatmapLayer` with `UrgencyCircles` component
  - [x] 2.1 Rewrite `nourishnet-app/src/components/ryan/HeatmapLayer.jsx` as `UrgencyCircles`
    - Use react-leaflet `Circle` and `Popup` components (no leaflet.heat dependency)
    - Render a Circle for each location with color based on urgency level
    - Circle radius: 800 meters, fill opacity: 0.25, stroke opacity: 0.5
    - Each circle gets a Popup with location name, urgency label, and nearby count
    - _Requirements: 2.1, 2.3, 3.1, 3.2, 3.3_

- [x] 3. Create `Legend` component
  - [x] 3.1 Create `nourishnet-app/src/components/ryan/Legend.jsx`
    - Show 5 urgency levels with colored indicators and labels
    - Position bottom-right as overlay with z-index above map
    - Semi-transparent background
    - _Requirements: 3.4_

- [x] 4. Update `MapView` integration
  - [x] 4.1 Modify `nourishnet-app/src/components/ryan/MapView.jsx`
    - Replace `toHeatPoints` import with `computeUrgencyLevels`
    - Replace `HeatmapLayer` import with `UrgencyCircles` (same file, new component)
    - Add `Legend` import
    - Compute urgency data via `computeUrgencyLevels(validLocations)`
    - Render `UrgencyCircles` and `Legend` when `viewMode === "heatmap"`
    - Keep error handling and fallback behavior
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 5.1, 5.2, 5.3_

- [x] 5. Verify build
  - [x] 5.1 Run `npx react-scripts build` in nourishnet-app directory to confirm no build errors

## Notes

- `leaflet.heat` dependency is no longer used — native Leaflet Circle (via react-leaflet) replaces it
- ViewToggle component remains unchanged
- All new/modified components stay in `src/components/ryan/` per project conventions
- Haversine formula uses Earth radius of 3,958.8 miles
