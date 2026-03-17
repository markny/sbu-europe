import { Link } from 'react-router-dom'

export default function CityCard({ city }) {
  return (
    <article className="city-card reveal-up">
      <img src={city.heroImage} alt={city.displayName} />
      <div className="city-card__overlay">
        <div className="city-card__content">
          <p className="eyebrow">2025 city</p>
          <h3>{city.displayName}</h3>
          <p>{city.teaser}</p>
          <Link className="button" to={`/${city.slug}`}>
            Explore {city.displayName}
          </Link>
        </div>
      </div>
    </article>
  )
}
