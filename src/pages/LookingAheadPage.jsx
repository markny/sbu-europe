import { Link } from 'react-router-dom'
import RailRouteMap from '../components/RailRouteMap'
import PhotoFigure from '../components/PhotoFigure'
import { photoById } from '../data/cities'

export default function LookingAheadPage() {
  return <main id="main" tabIndex="-1">
    <section className="shell future-hero future-hero--map"><div><p className="eyebrow">Europe with SBU · 2027</p><h1>Five cities.<br /><em>A journey by rail.</em></h1></div><div><p className="lede">Vienna → Prague → Dresden → Berlin → Hamburg.</p><p>From Vienna’s palaces to Hamburg’s waterfront, explore the places along the proposed route. For this map, we’re assuming Hamburg comes last.</p></div></section>
    <RailRouteMap />
    <section className="shell section planning-section"><div><p className="eyebrow">Planning the trip</p><h2>What is settled,<br />and what is still ahead.</h2><p>The destinations give the trip its direction. Practical details will follow as the arrangements are confirmed.</p></div><dl className="planning-list"><div><dt>Destinations</dt><dd>Vienna, Prague, Dresden, Berlin, and Hamburg.</dd></div><div><dt>Sequence</dt><dd>Vienna → Prague → Dresden → Berlin → Hamburg is the order shown here. Berlin before Hamburg is a planning assumption; the final order still needs confirmation.</dd></div><div><dt>Dates & cost</dt><dd>To be announced once arrangements are confirmed.</dd></div><div><dt>Taking part</dt><dd>Application details, eligibility, and academic information will accompany the trip announcement.</dd></div></dl></section>
    <section className="section section-tinted"><div className="shell photo-story"><PhotoFigure photo={photoById['vienna-01']} /><div><p className="eyebrow">A sense of the experience</p><h2>Start with<br />the 2025 story.</h2><p>The previous trip’s photographs show the cities, visits, shared meals, and time together. The 2027 journey will follow the route above.</p><Link className="button" to="/2025">Explore the 2025 trip →</Link></div></div></section>
  </main>
}
