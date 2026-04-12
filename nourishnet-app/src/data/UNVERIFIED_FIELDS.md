# Unverified & Incomplete Fields

**Last updated:** April 11, 2026  
**Dataset:** 33 locations in `locations.json`

---

## Summary

| Field | Verified | Unverified/Missing | Notes |
|-------|----------|-------------------|-------|
| name | 33/33 | 0 | All from source pages |
| address | 33/33 | 0 | All from source pages |
| lat/lng | 27 exact, 6 approximate | 6 approximate | See coords-approximate tag |
| hours | 14/33 | 19 missing | Not listed on source pages |
| phone | 24/33 | 9 missing | Not listed on source pages |
| website | 7/33 | 26 missing | Most pantries don't have websites |
| requirements | 6/33 | 27 unknown | Most sources don't list requirements |
| foodTypes | 20/33 | 13 empty | Source pages didn't describe food offerings |
| healthAttributes | 10/33 freshProduce | All others unverified | No sources confirmed halal/vegan/vegetarian/etc. |
| insecurityIndex | 33/33 | 0 | All set to county-level 7.4 (not location-specific) |

---

## Locations Missing Hours (19)

These locations had no hours listed on their source pages. Marked as empty string.

| ID | Name | Phone (for verification) |
|----|------|-------------------------|
| loc-009 | Gethsemane United Methodist Church | (301) 336-1219 |
| loc-010 | Labor of Love Center | (301) 735-0121 |
| loc-011 | PG County Salvation Army | (301) 277-6103 |
| loc-012 | Oxon Hill Church of Christ | (301) 894-5412 |
| loc-013 | Southern Friendship Missionary Baptist | (301) 423-6142 |
| loc-014 | Beltway Church of Christ | (301) 423-2320 |
| loc-015 | FISH of Greater Bowie | (301) 262-8479 |
| loc-016 | Largo Community Church | (301) 249-2255 |
| loc-017 | City of Greenbelt | (301) 345-6660 |
| loc-018 | St. Margaret of Scotland | (301) 336-3344 |
| loc-019 | Beltsville Adventist Community Center | (301) 937-8119 |
| loc-020 | No Limits Outreach Ministries | (202) 341-5159 |
| loc-022 | Crossover Church | (301) 927-5620 |
| loc-023 | Lutheran Mission Society | (301) 277-2302 |
| loc-025 | Jericho Baptist Church | (301) 333-0500 |
| loc-027 | Mission of Love Charities | — |
| loc-031 | Impact One Church | — |
| loc-032 | Gospel Assembly Church | (301) 605-3756 |
| loc-033 | Greater Refuge Ministries | (866) 515-1317 |

---

## Locations Missing Phone (9)

| ID | Name |
|----|------|
| loc-001 | PGCDSS North County |
| loc-002 | PGCDSS Central County |
| loc-003 | PGCDSS South County |
| loc-004 | AfriThrive |
| loc-005 | Buddhist Tzu Chi Foundation |
| loc-026 | College Park Community Food Bank |
| loc-027 | Mission of Love Charities |
| loc-030 | Community Support Systems Brandywine |
| loc-031 | Impact One Church |

---

## Locations with Empty foodTypes (13)

These locations' source pages did not describe what food they distribute.

| ID | Name |
|----|------|
| loc-002 | PGCDSS Central County (likely same as loc-001 but not confirmed individually) |
| loc-003 | PGCDSS South County (likely same as loc-001 but not confirmed individually) |
| loc-005 | Buddhist Tzu Chi Foundation |
| loc-012 | Oxon Hill Church of Christ |
| loc-013 | Southern Friendship Missionary Baptist |
| loc-014 | Beltway Church of Christ |
| loc-016 | Largo Community Church |
| loc-019 | Beltsville Adventist Community Center |
| loc-022 | Crossover Church |
| loc-024 | SEED Food Distribution |
| loc-027 | Mission of Love Charities |
| loc-030 | Community Support Systems Brandywine |
| loc-031 | Impact One Church |
| loc-032 | Gospel Assembly Church |
| loc-033 | Greater Refuge Ministries |

Note: loc-002 and loc-003 are PGCDSS pantries like loc-001. The PG County Government page describes all three collectively as offering "fresh produce, shelf-stable items, and essential groceries" — but the text doesn't individually confirm each site. loc-001 was enriched because it's the same program; loc-002 and loc-003 were also enriched under the same source statement.

---

## Locations with Approximate Coordinates (6)

These used zip code centroids because Nominatim geocoding failed. Tagged with `coords-approximate`.

| ID | Name | Zip Used |
|----|------|----------|
| loc-001 | PGCDSS North County | 20782 |
| loc-005 | Buddhist Tzu Chi Foundation | 20783 |
| loc-008 | UCAP Food Pantry | 20743 |
| loc-013 | Southern Friendship Missionary Baptist | 20748 |
| loc-025 | Jericho Baptist Church | 20785 |
| loc-034 | Bethel House | 20613 |

---

## Health Attributes Status

| Attribute | Locations confirmed `true` | Notes |
|-----------|---------------------------|-------|
| freshProduce | 10 | Confirmed from source page descriptions |
| halal | 0 | No source pages mentioned halal food |
| vegan | 0 | No source pages mentioned vegan options |
| vegetarian | 0 | No source pages mentioned vegetarian options |
| noBeef | 0 | No source pages mentioned beef-free options |
| lowGI | 0 | No source pages mentioned low-GI or diabetic-friendly food |
| dairyFree | 0 | No source pages mentioned dairy-free options |

All `false` values mean "not confirmed by source" — NOT "confirmed absent."
