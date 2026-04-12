# Requirements Document

## Introduction

This feature adds a density-based urgency visualization layer to the existing NourishNet MapView component. Instead of a heat gradient, each food pantry location gets a colored circle overlay based on how many other pantries are nearby — fewer nearby pantries means higher urgency (the area is underserved). Users can toggle between the current markers view and the urgency circles view. This is a P2 (Nice to Have) feature scoped for minimal implementation within a 3-day hackathon.

## Glossary

- **MapView**: The existing React component (`src/components/ryan/MapView.jsx`) that renders an interactive Leaflet map with location markers.
- **Urgency_Circle**: A Leaflet Circle overlay rendered at each food pantry location, colored by urgency level to indicate how underserved the surrounding area is.
- **Urgency_Level**: A numeric level (1–5) computed from the density of nearby food pantries within a 2-mile radius. Fewer nearby pantries = higher urgency.
- **View_Toggle**: A UI control that switches the map between Markers mode (individual location pins) and Urgency mode (colored circle overlays).
- **Location_Record**: A single entry in `locations.json` conforming to the LocationEntry schema, containing lat, lng, insecurityIndex, type, and other fields.
- **Legend**: A small UI component showing the 5 urgency levels and their corresponding colors.

## Requirements

### Requirement 1: Toggle Between Markers View and Urgency View

**User Story:** As a community member, I want to switch between a markers view and an urgency circles view on the map, so that I can either see individual food locations or visualize which areas are underserved.

#### Acceptance Criteria

1. THE MapView SHALL display a View_Toggle control that offers exactly two modes: "Markers" and "Heatmap".
2. WHEN the MapView first renders, THE MapView SHALL display the Markers mode as the default active view.
3. WHEN the user selects the "Heatmap" mode via the View_Toggle, THE MapView SHALL hide all location markers and display the Urgency_Circles with a Legend.
4. WHEN the user selects the "Markers" mode via the View_Toggle, THE MapView SHALL hide the Urgency_Circles and Legend and display all location markers.
5. WHEN the user switches between modes, THE MapView SHALL preserve the current map center position and zoom level.

### Requirement 2: Render Urgency Circles from Location Data Using Density-Based Calculation

**User Story:** As a community advocate, I want to see colored circles on the map indicating how underserved each food pantry area is, so that I can quickly identify areas that need more food resources.

#### Acceptance Criteria

1. WHEN the Heatmap mode is active, THE MapView SHALL render one Urgency_Circle for each Location_Record that has valid lat and lng values.
2. THE urgency level for each location SHALL be computed by counting how many other food pantries are within a 2-mile radius using the Haversine formula, then mapping the count to a level: 0–1 nearby = Level 5 (Critical), 2–3 = Level 4 (High), 4–5 = Level 3 (Elevated), 6–8 = Level 2 (Moderate), 9+ = Level 1 (Low).
3. EACH Urgency_Circle SHALL be colored according to its urgency level: Level 1 = #22c55e (green), Level 2 = #fbbf24 (yellow), Level 3 = #f97316 (orange), Level 4 = #ef4444 (red), Level 5 = #b91c1c (dark red).
4. WHEN the locations data changes, THE Urgency_Circles SHALL re-render with the updated data.
5. IF a Location_Record has a missing or non-numeric lat or lng, THEN it SHALL be excluded from the urgency calculation and rendering without causing an error.

### Requirement 3: Urgency Circle Visual Configuration

**User Story:** As a user viewing the urgency circles, I want the circles to be clearly visible but not obscure the underlying map, so that I can see both the urgency indicators and the map details.

#### Acceptance Criteria

1. EACH Urgency_Circle SHALL have a radius of approximately 800 meters, visible at the default PG County zoom level.
2. EACH Urgency_Circle SHALL have a fill opacity between 0.2 and 0.3 so the map remains visible through the circles.
3. EACH Urgency_Circle SHALL have a stroke opacity of 0.5 so circle boundaries are subtly visible.
4. A Legend component SHALL be displayed when urgency circles are active, showing all 5 urgency levels with their colors and labels.

### Requirement 4: View Toggle Accessibility and Placement

**User Story:** As a user with accessibility needs, I want the view toggle to be keyboard-navigable and clearly labeled, so that I can switch map views without relying solely on a mouse.

#### Acceptance Criteria

1. THE View_Toggle SHALL be positioned as an overlay on the map, visually distinct from the map tiles.
2. THE View_Toggle SHALL be operable using keyboard navigation (Tab to focus, Enter or Space to activate).
3. THE View_Toggle SHALL indicate the currently active mode with a visible style difference (e.g., highlighted background or bold text).
4. THE View_Toggle SHALL include accessible labels so that screen readers announce the current mode and available options.

### Requirement 5: Graceful Fallback on Rendering Failure

**User Story:** As a user, I want the map to remain functional even if the urgency circles fail to render, so that I can still access food location information.

#### Acceptance Criteria

1. IF the Urgency_Circles component throws an error during rendering, THEN THE MapView SHALL fall back to displaying the Markers mode.
2. IF the Urgency_Circles fail to render, THEN THE MapView SHALL log the error to the browser console and hide the View_Toggle control.
3. IF the locations data array is empty, THEN THE Urgency_Circles SHALL render nothing without throwing an error.
