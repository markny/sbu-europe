import HeroSection from '../components/HeroSection'
import CityCard from '../components/CityCard'
import { cities } from '../data/cities'

export default function HomePage() {
  const homeHero = cities.find((city) => city.slug === 'vienna')?.heroImage || cities[0]?.heroImage

  return (
    <>
      <HeroSection
        image={homeHero}
        eyebrow="Late May · Early June · Student experience"
        title="Europe with SBU"
        text="An early look at a late-spring student trip built around cities, walking, architecture, cafés, public spaces, museums, transit, and the memorable texture of being there in person."
        actions={[
          { label: 'Explore the 2025 cities', href: '#cities' },
          { label: 'See the 2027 preview', href: '/looking-ahead', ghost: true }
        ]}
      />

      <main>
        <section className="section reveal-up">
          <div className="shell split">
            <div>
              <p className="eyebrow">What this is</p>
              <h2>A travel-recruitment site, not a finalized itinerary.</h2>
              <p>
                The 2027 trip is still taking shape. What this site shows is the atmosphere of the
                most recent Europe experience: the kinds of cities, rhythms, streets, interiors,
                views, and everyday moments students can expect from a well-designed late spring trip.
              </p>
            </div>
            <div className="cta">
              <p className="eyebrow">Interested in learning more?</p>
              <h3>Early interest is welcome.</h3>
              <p>
                This beta site is here to build momentum. If this kind of trip looks appealing,
                treat it as an invitation to start paying attention and ask questions as plans come together.
              </p>
            </div>
          </div>
        </section>

        <section id="cities" className="section">
          <div className="shell">
            <p className="eyebrow">Recent trip cities</p>
            <h2>A look back at 2025.</h2>
            <p>
              These pages show the feel of the most recent trip: Vienna, Munich and surrounding areas,
              Cologne and surrounding areas, and Amsterdam.
            </p>
            <div className="card-grid">
              {cities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal-up">
          <div className="shell split">
            <div className="panel">
              <p className="eyebrow">Looking ahead</p>
              <h2>2027 is still in development.</h2>
              <p>
                The next trip is not finalized yet. Likely possibilities may include <strong>Vienna</strong>,{' '}
                <strong>Munich</strong>, and <strong>Paris</strong>, but the final route is still to be determined.
              </p>
            </div>
            <div className="panel">
              <p className="eyebrow">Design principle</p>
              <h2>Sell the experience honestly.</h2>
              <p>
                This site is about texture, pace, and memory more than a rigid checklist. It should feel like
                a real invitation to a rich student trip, not a generic study-abroad brochure.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
