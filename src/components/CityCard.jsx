import { Link } from 'react-router-dom'
export default function CityCard({ city }) {
  return (
    <article className="city-card"><Link to={`/2025/${city.slug}`} className="city-card-link">
      <div className={`city-card-image city-card-image--${city.slug}`}><img src={city.cardPhoto.src} alt={city.cardPhoto.alt} width={city.cardPhoto.width} height={city.cardPhoto.height} loading="lazy" /></div>
      <div className="city-card-meta"><span>{city.number} / {city.country}</span><span aria-hidden="true">↗</span></div>
      <h3>{city.displayName}</h3><p>{city.teaser}</p><span className="text-link">Explore the photographs <span aria-hidden="true">→</span></span>
    </Link></article>
  )
}
