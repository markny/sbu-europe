const cityPhotoBase = '/assets/photos'

function loadCityPhotos(slug) {
  const modules = import.meta.glob('/assets/photos/*/*.{webp,jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default'
  })

  const photos = Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/photos/${slug}/`))
    .map(([path, src]) => {
      const filename = path.split('/').pop()
      const niceName = filename
        .replace(/\.[^.]+$/, '')
        .replace(/^[a-z-]+-\d{4}-/, '')
        .replace(/-\d+$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (m) => m.toUpperCase())

      return {
        filename,
        src,
        title: niceName === 'Hero' ? 'Hero image' : niceName,
        caption: niceName === 'Hero' ? '' : niceName
      }
    })
    .sort((a, b) => a.filename.localeCompare(b.filename))

  const hero =
    photos.find((photo) => photo.filename.toLowerCase().includes('hero')) || photos[0] || null

  return { hero, photos }
}

const citySeed = [
  {
    slug: 'vienna',
    displayName: 'Vienna',
    year: 2025,
    teaser: 'Imperial scale, café culture, public squares, and museum-rich days on foot.',
    description:
      'Vienna makes a strong student city because it rewards attention. You notice architecture, public space, transit, museums, and the rhythm of walking from one memorable setting to the next.',
    futureTripStatus: 'possible-future-city',
    soundtrack: {
      enabled: false,
      label: 'Play Vienna soundtrack',
      file: ''
    }
  },
  {
    slug: 'munich',
    displayName: 'Munich',
    year: 2025,
    teaser: 'Historic streets, beer gardens, alpine edges, and long late-spring evenings.',
    description:
      'Munich combines civic grandeur with daily livability. It feels ordered and walkable, but it also opens outward into parks, mountain day-trip energy, and surrounding Bavarian landscapes.',
    futureTripStatus: 'possible-future-city',
    soundtrack: {
      enabled: false,
      label: 'Play Munich soundtrack',
      file: ''
    }
  },
  {
    slug: 'cologne',
    displayName: 'Cologne',
    year: 2025,
    teaser: 'Cathedral drama, riverfront movement, and a different urban texture along the Rhine.',
    description:
      'Cologne shows another side of the trip: river city energy, monumental architecture, and the feeling of moving through a lived-in place with strong regional character.',
    futureTripStatus: 'past-trip-example',
    soundtrack: {
      enabled: false,
      label: 'Play Cologne soundtrack',
      file: ''
    }
  },
  {
    slug: 'amsterdam',
    displayName: 'Amsterdam',
    year: 2025,
    teaser: 'Canals, bikes, layered street life, and unusually strong public-space design.',
    description:
      'Amsterdam is compelling because of how much the city teaches just by moving through it. It is dense, social, and visually distinct in a way students feel almost immediately.',
    futureTripStatus: 'past-trip-example',
    soundtrack: {
      enabled: false,
      label: 'Play Amsterdam soundtrack',
      file: ''
    }
  }
]

export const cities = citySeed.map((city) => {
  const { hero, photos } = loadCityPhotos(city.slug)
  return {
    ...city,
    heroImage: hero?.src || `${cityPhotoBase}/${city.slug}/`,
    gallery: photos
  }
})

export const cityMap = Object.fromEntries(cities.map((city) => [city.slug, city]))
