# Interactive 2027 route map

The user requested a geographic map with the train route, assuming Hamburg is last for clarity, and clickable destinations with iconic photographs and descriptions. This update applies that display assumption to `/2027`: **Vienna → Prague → Dresden → Berlin → Hamburg**. It does not finalize the trip order or promise particular trains, journey times, bookings, or visits.

The map and numbered destination list select the same city panel. The panel has a photograph, introductory description, landmarks, an official visitor-guide link, photo attribution, and previous/next controls. On narrow screens, selecting a map or list button scrolls to the panel. Reduced-motion settings are respected. Controls are native keyboard-operable buttons with selection state and an announced destination heading.

## Geographic data

Country outlines: Natural Earth 1:50m admin-0 countries, public domain. Retrieved from the [maintainer's GeoJSON repository](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson); [terms of use](https://www.naturalearthdata.com/about/terms-of-use/).

`scripts/build-route-map.py` clips the country polygons to the displayed region and applies a Mercator projection. It writes `src/data/centralEuropeMap.json`. City markers use approximate city-center coordinates in the same projection. Four directional lines connect the five stops schematically; they are **not railway track geometry**. This limitation is stated beneath the map. No timetable, live rail feed, map service, geolocation permission, or API key is needed.

## Destination sources

- [Vienna Tourist Board: art and culture](https://www.wien.info/en/art-culture)
- [Prague City Tourism](https://prague.eu/en/) and [Charles Bridge](https://prague.eu/en/objevujte/charles-bridge-karluv-most/)
- [Dresden Marketing: sights](https://www.visit-dresden-elbland.de/en/sights/)
- [visitBerlin: Brandenburg Gate](https://www.visitberlin.de/en/brandenburg-gate)
- [Hamburg: visitor sights](https://www.hamburg.com/visitors/sights/)

Introductions are short original summaries, not copied descriptions. They introduce destinations rather than commit to scheduled activities.

## Photography

Vienna reuses Olivia's approved Schönbrunn photograph from the 2025 collection. The four new destination images are separate from the 2025 galleries and are not represented as photographs of the SBU trip. They are locally stored Wikimedia Commons renditions, with visible author, source, license, and display-crop attribution. Source files remain unmodified. Adapted display crops retain each source photograph's displayed Creative Commons license.

`docs/2027-destination-photo-sources.json` records the exact asset sources, dates, authors, licenses, image dimensions, and SHA-256 hashes. `src/data/destinationPhotoSources.json` contains only the metadata needed by the public page. The source-page request from the Hamburg photographer for a publication URL is separate from the CC license terms; no external message has been sent.

## Verification and status

- Production build passes.
- Server-side rendering of the 2027 page passes, with five map controls, four connecting legs, one destination panel, and the explicit Hamburg-last assumption.
- All five destination records have local image assets, dimensions, captions, alternative text, and official guide URLs.
- The four new images match their downloaded source hashes and have complete attribution. Austria, Czechia, and Germany are all present in the map data.
- No browser interaction or screenshot testing was performed for this update. The Sites workflow reserves that for explicit requests.

The user approved the completed preview for commit and push. See the corresponding GitHub commit and Cloudflare Pages check for deployment status.
