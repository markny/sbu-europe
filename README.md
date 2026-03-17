# sbu-europe

Early beta travel-recruitment site for a faculty-led late spring Europe experience.

## Stack

- React
- Vite
- React Router
- Static image assets under `assets/photos/`

This is set up to deploy cleanly later to Cloudflare Pages.

## Run locally

```bash
cd /Users/mark/Documents/Projects/sbu-europe
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Where to edit city text

Edit:

- `src/data/cities.js`

Each city object includes:

- `slug`
- `displayName`
- `year`
- `teaser`
- `description`
- `futureTripStatus`
- `soundtrack`
- `gallery` (auto-populated from image folders)

## Where to swap or add images

City images live in:

- `assets/photos/vienna/`
- `assets/photos/munich/`
- `assets/photos/cologne/`
- `assets/photos/amsterdam/`

### Hero images

The app automatically prioritizes any image whose filename contains `hero`.

If you want to change a city hero, replace or rename the preferred image so `hero` appears in the filename.

### Add more images

Just drop additional images into the relevant city folder. The gallery is auto-populated from that folder.

## Components

Reusable components live in:

- `src/components/HeroSection.jsx`
- `src/components/CityCard.jsx`
- `src/components/CityPageHeader.jsx`
- `src/components/LearnAboutCity.jsx`
- `src/components/GalleryLightbox.jsx`
- `src/components/SoundtrackPlaceholder.jsx`

## Future soundtrack support

Soundtrack placeholders are already structured in `src/data/cities.js`.

For each city:

```js
soundtrack: {
  enabled: false,
  label: 'Play Vienna soundtrack',
  file: ''
}
```

Later, to enable audio:

1. add an audio file to a public/static location
2. set `enabled: true`
3. provide the audio file path in `file`
4. upgrade `SoundtrackPlaceholder.jsx` into a real audio player/button

## Notes

- The 2025 city pages are examples from the most recent trip.
- The 2027 route is intentionally framed as still in development.
- The site is meant to feel polished and cinematic without overcomplicating the first beta.
