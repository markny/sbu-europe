import catalog from './photoCatalog.json'

const sources = import.meta.glob('/assets/photos/*/*.webp', {
  eager: true, query: '?url', import: 'default'
})
export const photos = catalog.map((photo) => {
  if (!sources[photo.path]) throw new Error(`Missing photograph: ${photo.path}`)
  return { ...photo, src: sources[photo.path] }
})
export const photoById = Object.fromEntries(photos.map((photo) => [photo.id, photo]))
const citySeed = [
  {
    slug: 'vienna', displayName: 'Vienna', country: 'Austria', number: '01',
    subtitle: 'Grand spaces. Small discoveries.',
    teaser: 'Parliament, palace gardens, museum galleries, and time at the café table.',
    description: 'The Vienna photographs move from the grand rooms of Parliament and the museum galleries to palace gardens and everyday city life. Just as much of the trip happened between the landmarks: walking together, finding a café, and stopping for a photograph.',
    heroId: 'olivia-V04', cardId: 'olivia-V05',
    moments: ['Inside Parliament', 'Museums & gardens', 'Café tables & city walks'],
    note: 'Vienna was part of the 2025 trip and is the planned starting city for 2027.'
  },
  {
    slug: 'munich', displayName: 'Munich', country: 'Germany', number: '02',
    subtitle: 'The city, and a day by the lake.',
    teaser: 'Historic interiors, modern design, and an excursion to Lake Tegernsee.',
    description: 'Munich brought together ornate theatre interiors, open city squares, and contemporary automotive displays. The photographs also follow the group out to Tegernsee, where lakeside walks and a swim offered a different pace.',
    heroId: 'olivia-M17', cardId: 'olivia-M17',
    moments: ['The Residenz & theatre', 'Design & city life', 'Tegernsee excursion'],
    note: 'The Tegernsee photographs are labeled separately from Munich city scenes.'
  },
  {
    slug: 'cologne', displayName: 'Cologne', country: 'Germany', number: '03',
    subtitle: 'Along the Rhine, and beyond.',
    teaser: 'Cathedral windows, river views, and excursions into the surrounding region.',
    description: 'In Cologne, the photographs look up at the cathedral, along the river, and into the details of the city. The collection also includes time in Düsseldorf and the Ahr valley: half-timbered streets, vineyard paths, and views over the hills.',
    heroId: 'olivia-C05', cardId: 'olivia-C05',
    moments: ['Cologne Cathedral', 'Life along the river', 'Regional excursions'],
    note: 'Düsseldorf and Ahr valley photographs are labeled as excursions, rather than Cologne city scenes.'
  },
  {
    slug: 'amsterdam', displayName: 'Amsterdam', country: 'The Netherlands', number: '04',
    subtitle: 'A city best seen at street level.',
    teaser: 'Canals, shared tables, a university visit, and moments together by the water.',
    description: 'Canals and narrow façades set the scene for the Amsterdam part of the trip. Alongside the city views are photographs from a university visit, the Olympic Stadium, and a brewery visit, as well as the meals and unhurried moments in between.',
    heroId: 'olivia-A02', cardId: 'olivia-A02',
    moments: ['Canals & neighborhoods', 'Visits around the city', 'Time together'],
    note: 'These photographs record the Amsterdam visit in 2025.'
  }
]
export const cities = citySeed.map((city) => ({
  ...city, year: 2025, hero: photoById[city.heroId], cardPhoto: photoById[city.cardId],
  gallery: photos.filter((photo) => photo.city === city.slug).sort((a, b) =>
    (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity)
  )
}))
export const cityMap = Object.fromEntries(cities.map((city) => [city.slug, city]))
