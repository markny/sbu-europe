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

// This is a display assumption, not a finalized itinerary or timetable.
export const routeAssumption = 'Planning assumption: Berlin before Hamburg; Hamburg is the final stop.'
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
    slug: 'dresden', name: 'Dresden', country: 'Germany', coordinates: [13.7373, 51.0504],
    subtitle: 'Art and architecture on the Elbe.',
    description: 'The Frauenkirche, the Zwinger, and the Semperoper give Dresden a distinctive skyline and an extraordinary concentration of art and architecture. The rebuilt Frauenkirche also makes the city a place to consider destruction, reconstruction, and remembrance.',
    landmarks: ['Frauenkirche', 'The Zwinger', 'Semperoper'],
    guideUrl: 'https://www.visit-dresden-elbland.de/en/sights/', guideLabel: 'Dresden’s official visitor guide',
    photo: destinationPhotos.dresden
  },
  {
    slug: 'berlin', name: 'Berlin', country: 'Germany', coordinates: [13.4050, 52.5200],
    subtitle: 'A capital with history in its streets.',
    description: 'The Brandenburg Gate is a starting point for exploring Berlin’s history of division and reunification. Museums, memorials, and the neighborhoods around them offer different ways to understand Germany’s capital, past and present.',
    landmarks: ['Brandenburg Gate', 'Museums', 'History & remembrance'],
    guideUrl: 'https://www.visitberlin.de/en/brandenburg-gate', guideLabel: 'Berlin’s official visitor guide',
    photo: destinationPhotos.berlin
  },
  {
    slug: 'hamburg', name: 'Hamburg', country: 'Germany', coordinates: [9.9937, 53.5511],
    subtitle: 'A waterfront finish.',
    description: 'Hamburg turns the journey toward the water: the brick warehouses and canals of the Speicherstadt, the harbor around Landungsbrücken, and the Elbphilharmonie above the Elbe. It is the final stop in the route shown here.',
    landmarks: ['Speicherstadt', 'Elbphilharmonie', 'The harbor'],
    guideUrl: 'https://www.hamburg.com/visitors/sights/', guideLabel: 'Hamburg’s official visitor guide',
    photo: destinationPhotos.hamburg
  }
].map((city, index) => ({ ...city, stop: index + 1 }))
