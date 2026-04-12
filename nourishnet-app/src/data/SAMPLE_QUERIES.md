# Sample Filter Queries for Frontend Team

**Dataset:** 33 locations in `locations.json`  
**For:** Joe (FilterEngine), Ryan (DietaryFilters, MapView), Christian (CustomerPortal)

---

## Query Format

All filtering is client-side against the JSON array. Examples use JavaScript pseudocode.

---

## Basic Filters

### 1. Locations with fresh produce
```js
locations.filter(loc => loc.healthAttributes.freshProduce === true)
// Returns: 10 locations (loc-001, loc-003, loc-004, loc-007, loc-010, loc-020, loc-026, loc-034, loc-035, loc-001/002/003)
```

### 2. Locations that don't require ID
```js
locations.filter(loc => loc.tags.includes("no-id-required"))
// Returns: loc-001, loc-002, loc-003, loc-026
```

### 3. Locations open on weekdays
```js
locations.filter(loc => loc.hours.toLowerCase().includes("mon"))
// Returns: loc-001, loc-002, loc-003, loc-010, loc-027, loc-028
```

### 4. Locations with a phone number
```js
locations.filter(loc => loc.phone !== "")
// Returns: 24 locations
```

---

## Combined Filters

### 5. Fresh produce + no ID required
```js
locations.filter(loc =>
  loc.healthAttributes.freshProduce === true &&
  loc.tags.includes("no-id-required")
)
// Returns: loc-001, loc-002, loc-003, loc-026
```

### 6. Drive-thru locations
```js
locations.filter(loc => loc.tags.includes("drive-thru"))
// Returns: loc-026 (College Park), loc-028 (Bowie Interfaith)
```

### 7. Locations with baby supplies
```js
locations.filter(loc => loc.tags.includes("baby-supplies"))
// Returns: loc-008 (UCAP), loc-017 (Greenbelt), loc-023 (Lutheran Mission), loc-035 (Divine Grace)
```

### 8. Emergency food locations
```js
locations.filter(loc => loc.tags.includes("emergency-food"))
// Returns: loc-011 (Salvation Army), loc-028 (Bowie Interfaith)
```

### 9. Locations with holiday meal programs
```js
locations.filter(loc => loc.tags.includes("holiday-meals"))
// Returns: loc-011, loc-015, loc-018, loc-021
```

### 10. Locations serving seniors (Meals on Wheels)
```js
locations.filter(loc => loc.tags.includes("meals-on-wheels"))
// Returns: loc-015 (FISH of Greater Bowie), loc-020 (No Limits Outreach)
```

---

## Map Queries

### 11. All locations with exact coordinates (for high-confidence map pins)
```js
locations.filter(loc => !loc.tags.includes("coords-approximate"))
// Returns: 27 locations with Nominatim-geocoded coordinates
```

### 12. Locations within a bounding box (e.g., central PG County)
```js
locations.filter(loc =>
  loc.lat >= 38.85 && loc.lat <= 39.00 &&
  loc.lng >= -76.97 && loc.lng <= -76.85
)
// Returns locations in the Hyattsville/Landover/Capitol Heights cluster
```

### 13. Sort by distance from a user's location
```js
const userLat = 38.95, userLng = -76.93; // example: Hyattsville
locations
  .map(loc => ({
    ...loc,
    distance: Math.sqrt(
      Math.pow(loc.lat - userLat, 2) + Math.pow(loc.lng - userLng, 2)
    )
  }))
  .sort((a, b) => a.distance - b.distance)
```

---

## Tag Distribution (current dataset)

| Tag | Count | Example locations |
|-----|-------|-------------------|
| family-friendly | 33 | All |
| hygiene-products | 5 | loc-017, loc-018, loc-021, loc-025, loc-035 |
| baby-supplies | 4 | loc-008, loc-017, loc-023, loc-035 |
| holiday-meals | 4 | loc-011, loc-015, loc-018, loc-021 |
| no-id-required | 4 | loc-001, loc-002, loc-003, loc-026 |
| drive-thru | 2 | loc-026, loc-028 |
| emergency-food | 2 | loc-011, loc-028 |
| meals-on-wheels | 2 | loc-015, loc-020 |
| government-run | 3 | loc-001, loc-002, loc-003 |
| walk-ins-welcome | 3 | loc-001, loc-002, loc-003 |
| appointment-required | 2 | loc-007, loc-008 |
| mobile-market | 1 | loc-004 |
| grocery-style | 1 | loc-007 |
| soup-kitchen | 1 | loc-011 |
| snap-assistance | 1 | loc-010 |
| culturally-appropriate | 2 | loc-004, loc-007 |
| coords-approximate | 6 | loc-001, loc-005, loc-008, loc-013, loc-025, loc-034 |

---

## Notes for Frontend Implementation

1. **Empty `foodTypes` arrays** (13 locations) — display "Contact for details" in the UI, not "No food available"
2. **Empty `hours` strings** (19 locations) — display "Call for hours" with the phone number
3. **`healthAttributes` all `false`** — means "not confirmed", not "not available". Consider showing "Dietary info not verified" rather than hiding the location from dietary filters
4. **`insecurityIndex` is uniform** (7.4 for all) — the heatmap will show a single color for PG County. Sub-county data would require census tract analysis from the USDA Food Environment Atlas
5. **Distance calculation** — use Haversine formula for production; the Euclidean approximation above is fine for sorting within a small geographic area like PG County
