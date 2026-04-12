# NourishNet Data Dictionary

**Last updated:** April 11, 2026  
**Dataset:** `locations.json` — 33 PG County food pantry locations  
**Insecurity data source:** Feeding America Map the Meal Gap 2021 via [Stacker](https://stacker.com/maryland/prince-georges-county-md/food-insecurity-rates-prince-georges-county-md)

---

## Schema Fields

| Field | Type | Required | Description | Data Origin |
|-------|------|----------|-------------|-------------|
| `id` | string | Yes | Unique identifier (format: `loc-XXX`) | Generated from CSV row number |
| `name` | string | Yes | Official name of the food pantry or distribution site | Extracted from source page |
| `address` | object | Yes | Structured address with `street`, `city`, `state`, `zip` | Extracted from source page |
| `lat` | number | Yes | Latitude coordinate | Geocoded via OpenStreetMap Nominatim, or zip centroid fallback |
| `lng` | number | Yes | Longitude coordinate | Geocoded via OpenStreetMap Nominatim, or zip centroid fallback |
| `hours` | string | No | Operating hours as listed on source page | Extracted from source page. Empty string if not found. |
| `phone` | string | No | Contact phone number | Extracted from source page. Empty string if not found. |
| `website` | string | No | Official website URL | Extracted from source page. Empty string if not found. |
| `requirements` | string[] | No | What visitors need to bring or qualify for (e.g., "Photo ID required") | Extracted from source page. Empty array if not stated. |
| `foodTypes` | string[] | No | Types of food explicitly mentioned on source page | Extracted from source page. Empty array if not confirmed. |
| `healthAttributes` | object | No | Boolean flags for dietary/nutritional properties | See Health Attributes section below |
| `tags` | string[] | No | Searchable tags for filtering | Derived from source descriptions. See Tags section below. |
| `insecurityIndex` | number | Yes | Food insecurity rate for the area | County-level: 7.4% for all PG County locations (Feeding America 2021) |
| `insecurityIndexNote` | string | Yes | Explains the source and granularity of the insecurity score | Always present; documents that this is county-level data |
| `type` | string | Yes | Portal type: `customer`, `donor`, or `volunteer` | All currently set to `customer` |
| `lastVerified` | string | Yes | ISO date when the record was last checked | Date of data extraction |
| `source` | object | Yes | Full data lineage tracking | See Source section below |

---

## Health Attributes

Each attribute is a boolean. Set to `true` ONLY when the source page explicitly confirms the pantry offers that type of food. Set to `false` when not confirmed — this does NOT mean the pantry doesn't offer it, only that it wasn't stated on the source page.

| Attribute | Meaning | How it's verified |
|-----------|---------|-------------------|
| `halal` | Pantry explicitly offers halal-certified food | Source page mentions "halal" |
| `vegan` | Pantry explicitly offers vegan options | Source page mentions "vegan" |
| `vegetarian` | Pantry explicitly offers vegetarian options | Source page mentions "vegetarian" |
| `noBeef` | Pantry explicitly offers beef-free options | Source page mentions "no beef" |
| `lowGI` | Pantry explicitly offers low-glycemic options | Source page mentions "low GI" or "diabetic friendly" |
| `freshProduce` | Pantry distributes fresh fruits/vegetables | Source page mentions "fresh produce", "fruits", "vegetables", or similar |
| `dairyFree` | Pantry explicitly offers dairy-free options | Source page mentions "dairy free" |

**Current status:** Only `freshProduce` has been verified for 10 locations. All other attributes remain `false` (unverified, not confirmed absent). No source pages explicitly mentioned halal, vegan, vegetarian, noBeef, lowGI, or dairyFree offerings.

---

## Tags

Tags are derived from explicit statements on source pages. They are used for frontend filtering.

| Tag | Meaning | Source basis |
|-----|---------|-------------|
| `family-friendly` | Default tag for all food pantries | Applied to all locations |
| `no-id-required` | No ID or registration needed to receive food | Source explicitly states "no registration required" or "no ID required" |
| `walk-ins-welcome` | No appointment needed | Source explicitly states walk-ups/walk-ins welcome |
| `government-run` | Operated by PG County government | PGCDSS service centers |
| `mobile-market` | Mobile/rotating distribution site | Source describes mobile pantry |
| `non-english-friendly` | Staff or services available in non-English languages | Source mentions multilingual services |
| `culturally-appropriate` | Offers culturally specific foods | Source explicitly mentions culturally appropriate food |
| `appointment-required` | Must schedule visit in advance | Source states appointment required |
| `grocery-style` | Market/grocery shopping model (not pre-packed boxes) | Source describes grocery-style model |
| `drive-thru` | Drive-through distribution | Source mentions drive-thru/drive-through |
| `emergency-food` | Provides emergency food assistance | Source mentions emergency food |
| `soup-kitchen` | Serves prepared hot meals on-site | Source mentions soup kitchen |
| `holiday-meals` | Provides holiday-specific meals/baskets | Source mentions Thanksgiving, Christmas, Easter meals |
| `meals-on-wheels` | Delivers food to homebound individuals | Source mentions Meals on Wheels |
| `elderly-services` | Specific services for seniors | Source mentions senior-specific programs |
| `baby-supplies` | Provides diapers, formula, or baby food | Source mentions baby supplies |
| `hygiene-products` | Provides toiletries, laundry detergent, etc. | Source mentions hygiene/toiletry items |
| `snap-assistance` | Helps with SNAP/food stamp applications | Source mentions SNAP assistance |
| `student-friendly` | Serves students or located near schools | Source mentions student services |
| `coords-approximate` | Lat/lng is a zip code centroid, not exact geocode | Applied when Nominatim geocoding failed |

---

## Source Object

Every location includes a `source` object for full data lineage:

```json
{
  "source_name": "Name of the data source (matches CSV 'Data Source' column)",
  "source_url": "URL from the CSV 'Link' column",
  "extracted_from": "Exact page URL where the data was found"
}
```

---

## Insecurity Index

- **Value:** 7.4 for all 33 locations
- **Granularity:** County-level (Prince George's County, MD)
- **Source:** Feeding America Map the Meal Gap 2021, accessed via [Stacker](https://stacker.com/maryland/prince-georges-county-md/food-insecurity-rates-prince-georges-county-md)
- **Meaning:** 7.4% of the county population (70,930 people) experienced food insecurity in 2021
- **Limitation:** This is a single county-wide rate. We do not have zip-code-level or census-tract-level insecurity data. All locations share the same value.
- **Maryland state rate for comparison:** 9.7%
