import { Link } from 'react-router-dom'
import CityCard from '../components/CityCard'
import PhotoFigure from '../components/PhotoFigure'
import { cities, photoById } from '../data/cities'

export default function RetrospectivePage() {
  return <main id="main" tabIndex="-1">
    <section className="shell retrospective-hero"><div><p className="eyebrow">The 2025 trip · A look back</p><h1>Places we went.<br /><em>Moments we kept.</em></h1><p className="lede">Vienna. Munich. Cologne. Amsterdam.</p><p>City streets and grand interiors, shared tables and a day by the lake. These photographs bring together the places we visited and the people who made the trip.</p><a className="text-link" href="#chapters">Explore the four city chapters ↓</a><div className="trip-facts"><div><strong>4</strong><span>city chapters</span></div><div><strong>3</strong><span>countries</span></div><div><strong>2025</strong><span>the trip in photographs</span></div></div></div><PhotoFigure photo={photoById['olivia-M27']} priority /></section>
    <section className="section section-tinted" id="chapters"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Explore the trip</p><h2>One chapter at a time.</h2></div><p>Start with the highlights, or browse the complete photograph collection for each city. Excursions are labeled within the galleries.</p></div><div className="city-grid">{cities.map((city) => <CityCard key={city.slug} city={city} />)}</div></div></section>
    <section className="shell section photo-story"><PhotoFigure photo={photoById['munich-32']} /><div><p className="eyebrow">Beyond the city</p><h2>A different pace<br />at Tegernsee.</h2><p>The Munich chapter also follows the group out to the lake: mountain views, a meal together, and time by—and in—the water.</p><Link className="text-link" to="/2025/munich#photographs">See Munich & the Tegernsee excursion →</Link></div></section>
    <section className="year-invitation"><div className="shell"><div><p className="eyebrow">Looking forward</p><h2>Where next?</h2><p>The next trip has its own route and its own discoveries ahead.</p></div><Link className="button" to="/2027">Explore the 2027 plan ↗</Link></div></section>
  </main>
}
