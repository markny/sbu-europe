import HeroSection from './HeroSection'

export default function CityPageHeader({ city }) {
  return (
    <HeroSection
      page
      image={city.heroImage}
      eyebrow={`Recent trip city · ${city.year}`}
      title={city.displayName}
      text={city.teaser}
    />
  )
}
