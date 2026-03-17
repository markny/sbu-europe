import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import CityPageHeader from '../components/CityPageHeader'
import GalleryLightbox from '../components/GalleryLightbox'
import LearnAboutCity from '../components/LearnAboutCity'
import SoundtrackPlaceholder from '../components/SoundtrackPlaceholder'
import { cityMap } from '../data/cities'

export default function CityPage() {
  const { slug } = useParams()
  const city = cityMap[slug]

  const gallery = useMemo(() => city?.gallery || [], [city])

  if (!city) {
    return (
      <main className="section">
        <div className="shell panel">
          <h1>City not found</h1>
          <p>This page has not been set up yet.</p>
        </div>
      </main>
    )
  }

  return (
    <>
      <CityPageHeader city={city} />
      <main className="section">
        <div className="shell page-grid">
          <div>
            <LearnAboutCity city={city} />
            <section className="section">
              <h2>Gallery</h2>
              <p>
                Scenes from the 2025 trip. This is a curated preview, with room for a fuller gallery mode later.
              </p>
              <GalleryLightbox images={gallery} cityName={city.displayName} />
              <div className="button-row">
                <a className="button button--ghost" href="#">
                  Full photo gallery (coming later)
                </a>
              </div>
            </section>
          </div>

          <aside className="meta-list">
            <div className="meta-item reveal-up">
              <p className="eyebrow">Why this page exists</p>
              <strong>Atmosphere first</strong>
              <p>{city.teaser}</p>
            </div>
            <div className="meta-item reveal-up">
              <p className="eyebrow">2027 flexibility</p>
              <strong>Example, not a promise</strong>
              <p>
                This city shows the kind of experience students can expect, even as the 2027 itinerary is still being finalized.
              </p>
            </div>
            <SoundtrackPlaceholder city={city} />
            <div className="placeholder-box reveal-up">
              <h3>Future additions</h3>
              <p>
                Maps, timelines, student-made applets, short faculty notes, and richer full-gallery modes can slot into
                this page later without a redesign.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
