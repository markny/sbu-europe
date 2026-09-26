import { photoById } from './cities'
import photoSources from './destinationPhotoSources.json'

const imageSources = import.meta.glob('/assets/destinations2027/*', {
  eager: true, query: '?url', import: 'default'
})
const destinationPhotos = Object.fromEntries(photoSources.map((photo) => {
  if (!imageSources[photo.path]) throw new Error(`Missing destination photograph: ${photo.path}`)
  return [photo.city, { ...photo, src: imageSources[photo.path] }]
}))
const viennaPhoto = photoById['olivia-V13']

// The EEE information-session slides distinguish overnight stays from day trips.
export const routeAssumption = 'Proposed route from the EEE information-session slides. City stays, day trips, dates, and rail arrangements remain subject to confirmation.'
export const destinations2027 = [
  {
    slug: 'vienna', name: 'Vienna', country: 'Austria', coordinates: [16.3738, 48.2082],
    subtitle: 'Palaces, gardens, and grand collections.',
    description: 'Vienna brings together the imperial palaces of Schönbrunn and the Hofburg, major art collections, and a long musical tradition. It is the starting point for this journey north through Central Europe.',
    landmarks: ['Schönbrunn Palace', 'The Hofburg', 'Art & music'],
    guideUrl: 'https://www.wien.info/en/art-culture', guideLabel: 'Vienna’s official visitor guide',
    photo: { ...viennaPhoto, caption: 'Schönbrunn Palace and gardens, photographed on the 2025 trip.', alt: 'Schönbrunn Palace beyond formal flower beds in Vienna.', objectPosition: '50% 75%' }
  },
  {
    slug: 'prague', name: 'Prague', country: 'Czech Republic', coordinates: [14.4378, 50.0755],
    subtitle: 'Bridges, towers, and the Vltava.',
    description: 'Charles Bridge connects the riverbanks beneath Prague’s castle skyline. The Old Town’s lanes, squares, and astronomical clock offer another view of a city shaped by centuries of architecture and everyday street life.',
    landmarks: ['Charles Bridge', 'Old Town', 'Castle skyline'],
    guideUrl: 'https://prague.eu/en/', guideLabel: 'Prague’s official visitor guide',
    photo: destinationPhotos.prague
  },
  {
    slug: 'berlin', name: 'Berlin', country: 'Germany', coordinates: [13.4050, 52.5200],
    subtitle: 'May 26–29 · A capital with history in its streets.',
    description: 'The Brandenburg Gate is a starting point for exploring Berlin’s history of division and reunification. Museums, memorials, and the neighborhoods around them offer different ways to understand Germany’s capital, past and present.',
    landmarks: ['Brandenburg Gate', 'Museums', 'History & remembrance'],
    guideUrl: 'https://www.visitberlin.de/en/brandenburg-gate', guideLabel: 'Berlin’s official visitor guide',
    photo: destinationPhotos.berlin
  },
  {
    slug: 'hamburg', name: 'Hamburg', country: 'Germany', coordinates: [9.9937, 53.5511],
    subtitle: 'May 30–31 · A waterfront finish.',
    description: 'Hamburg turns the journey toward the water: the brick warehouses and canals of the Speicherstadt, the harbor around Landungsbrücken, and the Elbphilharmonie above the Elbe. It is the final stop in the route shown here.',
    landmarks: ['Speicherstadt', 'Elbphilharmonie', 'The harbor'],
    guideUrl: 'https://www.hamburg.com/visitors/sights/', guideLabel: 'Hamburg’s official visitor guide',
    photo: destinationPhotos.hamburg
  }
].map((city, index) => ({ ...city, stop: index + 1 }))

export const dayTrips2027 = [
  { slug: 'bratislava', name: 'Bratislava', country: 'Slovakia', from: 'Vienna', coordinates: [17.1077, 48.1486], description: 'A proposed day trip to Slovakia’s Danube-side capital.', photo: '/eee-2027/bratislava.webp' },
  { slug: 'dresden', name: 'Dresden', country: 'Germany', from: 'Berlin', coordinates: [13.7373, 51.0504], description: 'A proposed day trip to Dresden’s restored historic center.', photo: '/eee-2027/dresden.webp' },
  { slug: 'lubeck', name: 'Lübeck & Travemünde', country: 'Germany', from: 'Hamburg', coordinates: [10.6866, 53.8668], description: 'A proposed day trip from Hamburg toward the Baltic coast.', photo: '/eee-2027/baltic.webp' }
]
