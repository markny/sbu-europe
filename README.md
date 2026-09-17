# Europe with SBU

A faculty-led Europe travel site with a 2025 photograph collection and the working route for 2027. Built with React, Vite, and React Router.

## Local development

From this project directory:

```bash
npm install
npm run dev
```

For a production build and local preview:

```bash
npm run build
npm run preview
```

Cloudflare Pages should build with `npm run build` and publish `dist`. `public/_redirects` supplies the single-page application fallback. Deployment settings must be verified before publishing; a local build does not publish the site.

## Pages

- `/`: program overview, 2025 city chapters, and the next trip.
- `/2025`: retrospective with links to Vienna, Munich, Cologne, and Amsterdam.
- `/2025/:city`: city story, selected highlights, complete gallery, and photo viewer.
- `/2027`: interactive rail-route map with city introductions, landmark photographs, and official visitor links. The map assumes Vienna → Prague → Dresden → Berlin → Hamburg, with Hamburg last for clarity; the final order is not confirmed.
- Existing city links such as `/vienna` and `/looking-ahead` redirect to their corresponding new pages.

## Editing photographs and captions

The collection contains 202 photographs: 181 existing images and 21 approved additions from Olivia. Originals remain intact.

`src/data/photoCatalog.json` is the photograph catalog. Every record has a stable ID, city, asset path, written caption, alternative text, location, dimensions, credit, and optional `featuredOrder`. A numerical `featuredOrder` includes the image in the highlights; `null` retains it in the complete gallery. All photographs remain available through the gallery controls.

To add an image, place a WebP in the appropriate `assets/photos/<city>/` folder and add its catalog record. Uncatalogued files do not appear automatically. Use an observed description instead of deriving a caption from a filename. Excursion locations belong in the `location` field even when their photos are filed under a nearby city.

`src/data/cities.js` contains city descriptions, selected moments, and the explicit `heroId` and `cardId` choices. Hero and gallery photographs retain their full composition; city navigation cards use a portrait crop of scenery.

## Content and layout

- `src/pages/`: the program, retrospective, city, and next-trip pages.
- `src/components/TripRoute.jsx`: the first three ordered stops and the final two unordered cities.
- `src/components/RailRouteMap.jsx`: the interactive 2027 map and destination panels, with dedicated responsive styles.
- `src/data/destinations2027.js`: the map's assumed destination order, city introductions, and official visitor links. See `docs/2027-route-map.md` for geography and photograph sources.
- `src/components/GalleryLightbox.jsx`: highlights/all controls and an accessible native-dialog viewer.
- `src/components/Layout.jsx`: responsive navigation, page titles, and footer.
- `src/styles.css`: shared typography, colors, layout, and responsive rules.

Dates, cost, eligibility, academic information, and the contact destination for 2027 still need confirmed details. Do not invent these or imply bookings are final. See `docs/2026-09-16-site-refresh.md` for the selection record and validation.
