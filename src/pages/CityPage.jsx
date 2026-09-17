import { Link, useParams } from 'react-router-dom'
import GalleryLightbox from '../components/GalleryLightbox'
import PhotoFigure from '../components/PhotoFigure'
import { cities, cityMap } from '../data/cities'
import NotFoundPage from './NotFoundPage'

export default function CityPage() {
  const { slug } = useParams()
  const city = cityMap[slug]
  if (!city) return <NotFoundPage />
  const nextCity = cities[(cities.findIndex((item) => item.slug === slug) + 1) % cities.length]
  return <main id="main" tabIndex="-1">
    <div className="shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/2025">The 2025 trip</Link><span aria-hidden="true">/</span><span aria-current="page">{city.displayName}</span></nav>
      <section className={`city-hero city-hero--${city.slug}`}><div className="city-hero-copy"><p className="eyebrow">{city.country} · 2025</p><h1>{city.displayName}</h1><h2>{city.subtitle}</h2><p className="lede">{city.description}</p><ul className="city-moments">{city.moments.map((moment) => <li key={moment}>{moment}</li>)}</ul><a className="text-link" href="#photographs">Explore the photographs ↓</a></div><PhotoFigure photo={city.hero} priority /></section>
    </div>
    <section className="section section-tinted" id="photographs"><div className="shell"><div className="section-heading"><div><p className="eyebrow">The 2025 collection</p><h2>{city.displayName}, in photographs.</h2></div><p>{city.note}</p></div><GalleryLightbox key={city.slug} images={city.gallery} cityName={city.displayName} /></div></section>
    <div className="shell city-pagination"><Link className="text-link" to="/2025">← All four cities</Link><Link to={`/2025/${nextCity.slug}`}><span className="eyebrow">Explore another chapter</span><span className="next-city-name">{nextCity.displayName} <span aria-hidden="true">→</span></span></Link></div>
  </main>
}
