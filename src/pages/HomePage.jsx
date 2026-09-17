import { Link } from 'react-router-dom'
import CityCard from '../components/CityCard'
import PhotoFigure from '../components/PhotoFigure'
import TripRoute from '../components/TripRoute'
import { cities, photoById } from '../data/cities'

export default function HomePage() {
  return (
    <main id="main" tabIndex="-1">
      <section className="shell home-hero">
        <div className="home-hero-copy"><p className="eyebrow">Faculty-led travel · Every other year</p><h1>Europe,<br /><em>together.</em></h1><p className="lede">New places. Shared discoveries. A different view of the world.</p><p>Explore Europe with SBU through its cities, its everyday life, and the people you travel with.</p><div className="button-row"><Link className="button" to="/2027">Discover the 2027 trip <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/2025">Look back at 2025 →</Link></div></div>
        <div className="home-hero-photo"><PhotoFigure photo={photoById['olivia-V04']} priority /><span className="photo-index" aria-hidden="true">VIENNA / 2025</span></div>
      </section>
      <section className="program-strip"><div className="shell program-strip-inner"><p>A faculty-led student experience</p><span>City walks & cultural visits</span><span>Learning beyond the classroom</span><span>Time to explore together</span></div></section>
      <section className="shell section intro-section"><p className="eyebrow">The experience</p><div><h2>There is more to a place<br />than its landmarks.</h2><p className="large-copy">A museum visit, a conversation over lunch, the view from a train, a turn down an unfamiliar street. The trip is made of all of these moments.</p><p>Our Europe program brings students and faculty together every other year. The 2025 photographs offer a close look at that experience; the next journey is taking shape for 2027.</p></div></section>
      <section className="section section-tinted" id="cities"><div className="shell"><div className="section-heading"><div><p className="eyebrow">The 2025 trip</p><h2>Four cities.<br />Countless moments.</h2></div><div><p>Vienna, Munich, Cologne, and Amsterdam—with excursions and discoveries along the way.</p><Link className="text-link" to="/2025">See the 2025 story →</Link></div></div><div className="city-grid">{cities.map((city) => <CityCard key={city.slug} city={city} />)}</div></div></section>
      <section className="section next-trip"><div className="shell"><div className="section-heading"><div><p className="eyebrow">The next chapter</p><h2>Looking to 2027.</h2></div><div><p>Five cities are in the current plan. The journey starts in Vienna; the order of the final two stops is still being worked out.</p><Link className="text-link" to="/2027">Explore the working route →</Link></div></div><TripRoute compact /></div></section>
    </main>
  )
}
