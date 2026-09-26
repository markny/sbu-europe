# Interactive 2027 route map

The first version used a five-stop display assumption, Vienna → Prague → Dresden → Berlin → Hamburg. The supplied EEE information-session slides clarify the **proposed** plan: four city stays (Vienna → Prague → Berlin → Hamburg), with day trips from Vienna to Bratislava, from Berlin to Dresden, and from Hamburg to Lübeck/Travemünde. The current `/2027` map follows the slides. The itinerary, dates, rail services, and activities remain subject to confirmation.

The numbered list and city-stay markers select the same destination panel. It includes a photograph, introductory description, landmarks, official visitor-guide link, photo attribution, and previous/next controls. The day-trip markers jump to short cards below the map. On narrow screens, selecting a city marker or list button scrolls to the panel. Controls are keyboard-operable, and reduced-motion settings are respected.

## Geographic data

Country outlines: Natural Earth 1:50m admin-0 countries, public domain. Retrieved from the [maintainer's GeoJSON repository](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson); [terms of use](https://www.naturalearthdata.com/about/terms-of-use/).

`scripts/build-route-map.py` clips the country polygons to the displayed region and applies a Mercator projection. It writes `src/data/centralEuropeMap.json`. Markers use approximate city-center coordinates in the same projection. Three solid lines connect the four city stays schematically; three dotted branches indicate day trips. The lines **do not trace exact railway tracks**. No timetable, live rail feed, map service, geolocation permission, or API key is used.

## Destination sources

- [Vienna Tourist Board: art and culture](https://www.wien.info/en/art-culture)
- [Prague City Tourism](https://prague.eu/en/)
- [visitBerlin: Brandenburg Gate](https://www.visitberlin.de/en/brandenburg-gate)
- [Hamburg: visitor sights](https://www.hamburg.com/visitors/sights/)

Introductions are short original summaries, not copied descriptions. They introduce destinations rather than commit to scheduled activities.

## Visual assets

The map's city-stay panel retains the previously attributed destination photographs. Vienna uses Olivia's Schönbrunn image from the 2025 collection; Prague, Berlin, and Hamburg use locally stored Wikimedia Commons images with visible source and license links. `docs/2027-destination-photo-sources.json` records exact sources and hashes for those original map images. The new feature sections reuse those images and add separately licensed Commons photographs for Bratislava, Lübeck, and Upper Belvedere. Each visible web-page use includes author, source, license, and crop credit via `ExperiencePhotoCredit.jsx`. Only the AI-made cover illustration is reused from the slide deck. The original PowerPoint is served unchanged from `public/downloads/`.

## Verification

The production build and browser interaction checks were repeated after the slide-based update. At 390px viewport width there is no page overflow. The four city-stay controls and three day-trip links render; selecting Berlin updates the city panel, and selecting Dresden reaches the corresponding day-trip card. The web presentation supports direct slide links and section navigation.
