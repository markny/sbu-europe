import { useEffect, useRef, useState } from 'react'
import geography from '../data/centralEuropeMap.json'
import ExperiencePhotoCredit from './ExperiencePhotoCredit'
import { dayTrips2027, destinations2027, routeAssumption } from '../data/destinations2027'
import './RailRouteMap.css'

const mercator = (latitude) => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360)) * 180 / Math.PI
const [west, , east, north] = geography.bounds
const project = ([longitude, latitude]) => [
  (longitude - west) * geography.width / (east - west),
  (mercator(north) - mercator(latitude)) * geography.width / (east - west)
]
const stops = destinations2027.map((city) => ({ ...city, point: project(city.coordinates) }))
const sideTrips = dayTrips2027.map((city) => ({ ...city, point: project(city.coordinates), origin: stops.find((stop) => stop.name === city.from) }))
// Schematic city-to-city connections: no claim to precise railway geometry.
const legs = stops.slice(0, -1).map((city, index) => {
  const next = stops[index + 1]
  return { from: city.slug, to: next.slug, path: `M ${city.point.join(',')} L ${next.point.join(',')}` }
})

export default function RailRouteMap() {
  const [selected, setSelected] = useState('vienna')
  const panel = useRef(null)
  useEffect(() => {
    const onCardSelection = (event) => {
      if (stops.some((city) => city.slug === event.detail)) setSelected(event.detail)
    }
    window.addEventListener('sbu-select-city', onCardSelection)
    return () => window.removeEventListener('sbu-select-city', onCardSelection)
  }, [])
  const activeIndex = stops.findIndex((city) => city.slug === selected)
  const active = stops[activeIndex]
  const photo = active.photo

  function selectCity(slug, showPanel = false) {
    setSelected(slug)
    if (showPanel && window.matchMedia('(max-width: 850px)').matches) {
      requestAnimationFrame(() => {
        panel.current?.scrollIntoView({
          block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        })
      })
    }
  }

  return (
    <section className="journey-section" id="route" aria-labelledby="journey-title">
      <div className="shell">
        <div className="journey-heading">
          <div><p className="eyebrow">The proposed 2027 journey</p><h2 id="journey-title">Four city stays. Three day trips.</h2></div>
          <p>Select a city stay on the map or route below. The smaller markers show proposed day trips.</p>
        </div>
        <p className="route-assumption">{routeAssumption}</p>
        <ol className="journey-stops" aria-label="Proposed order of city stays">
          {stops.map((city) => (
            <li key={city.slug}>
              <button type="button" aria-pressed={selected === city.slug} aria-controls="destination-panel" onClick={() => selectCity(city.slug, true)}>
                <span className="stop-index" aria-hidden="true">0{city.stop}</span><span>{city.name}</span>
                {city.stop < stops.length && <span className="stop-connector" aria-hidden="true">→</span>}
              </button>
            </li>
          ))}
        </ol>
        <div className="journey-explorer">
          <div className="journey-map-wrap">
            <div className="journey-map" style={{ aspectRatio: `${geography.width} / ${geography.height}` }} role="group" aria-label="Map of the proposed rail journey across Austria, the Czech Republic, and Germany">
              <svg viewBox={`0 0 ${geography.width} ${geography.height}`} aria-hidden="true" focusable="false">
                <defs><marker id="rail-direction" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M 1 1 L 7 4 L 1 7" fill="none" stroke="currentColor" strokeWidth="1.8" /></marker></defs>
                <rect width={geography.width} height={geography.height} className="map-water" />
                {geography.countries.map((country) => <path key={country.name} d={country.path} className={`map-country ${country.visited ? 'map-country--visited' : ''}`} fillRule="evenodd" />)}
                {geography.labels.map((label) => <text key={label.text} x={label.point[0]} y={label.point[1]} className={`${label.water ? 'map-sea-label' : 'map-country-label'} ${['GERMANY', 'CZECHIA', 'AUSTRIA', 'POLAND'].includes(label.text) ? '' : 'map-context-label'}`} textAnchor="middle">{label.text}</text>)}
                {legs.map((leg, index) => {
                  const start = stops[index].point
                  const end = stops[index + 1].point
                  const middle = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
                  return <g key={leg.to} className={`rail-leg ${selected === leg.from || selected === leg.to ? 'rail-leg--active' : ''}`}>
                    <path d={leg.path} className="rail-line-border" />
                    <path d={leg.path} className="rail-line" />
                    <path d={`M ${start.join(',')} L ${middle.join(',')} L ${end.join(',')}`} className="rail-line-direction" markerMid="url(#rail-direction)" />
                  </g>
                })}
                {sideTrips.map((city) => <path key={city.slug} d={`M ${city.origin.point.join(',')} L ${city.point.join(',')}`} className="day-trip-line" />)}
                <g className="map-north" transform="translate(657 54)"><path d="M 0 26 L 0 3 M -5 9 L 0 3 L 5 9" /><text y="-7" textAnchor="middle">N</text></g>
              </svg>
              {stops.map((city) => (
                <button key={city.slug} type="button" className={`map-stop map-stop--${city.slug}`} style={{ left: `${city.point[0] / geography.width * 100}%`, top: `${city.point[1] / geography.height * 100}%` }} aria-label={`Stop ${city.stop}: ${city.name}. Show photograph and city introduction.`} aria-pressed={selected === city.slug} aria-controls="destination-panel" onClick={() => selectCity(city.slug, true)}>
                  <span className="map-stop-dot" aria-hidden="true">{city.stop}</span><span className="map-stop-name" aria-hidden="true">{city.name}</span>
                </button>
              ))}
              {sideTrips.map((city) => <a key={city.slug} className={`map-day-trip map-day-trip--${city.slug}`} href={`#day-trip-${city.slug}`} style={{ left: `${city.point[0] / geography.width * 100}%`, top: `${city.point[1] / geography.height * 100}%` }} aria-label={`${city.name} day trip from ${city.from}`}><span aria-hidden="true">↗</span><span>{city.name}</span></a>)}
            </div>
            <div className="map-legend"><span className="rail-key" aria-hidden="true" /><span>Proposed route between city stays; dotted branches are day trips</span><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Map: Natural Earth ↗</a></div>
            <p className="map-note">The lines connect the planned stops schematically; they do not trace the exact tracks. Train services and the final itinerary are still to be confirmed.</p>
          </div>
          <article ref={panel} id="destination-panel" className="destination-panel" aria-labelledby="destination-name">
            <figure className="destination-photo">
              <img key={active.slug} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} style={{ objectPosition: photo.objectPosition || '50% 50%' }} decoding="async" />
              <figcaption>{photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.caption}</a> : photo.caption}</figcaption>
            </figure>
            <div className="destination-copy">
              <p className="destination-kicker">City stay {active.stop} of {stops.length} · {active.country}{active.stop === stops.length ? ' · Final stay' : ''}</p>
              <h3 id="destination-name" aria-live="polite">{active.name}</h3>
              <p className="destination-subtitle">{active.subtitle}</p>
              <p className="destination-description">{active.description}</p>
              <ul className="destination-landmarks" aria-label={`A first look at ${active.name}`}>{active.landmarks.map((landmark) => <li key={landmark}>{landmark}</li>)}</ul>
              <a className="text-link destination-guide" href={active.guideUrl} target="_blank" rel="noreferrer">{active.guideLabel} ↗</a>
              <p className="destination-credit">Photo: {photo.sourceUrl ? <a href={photo.authorUrl || photo.sourceUrl} target="_blank" rel="noreferrer">{photo.credit}</a> : photo.credit}{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></>}{photo.sourceUrl && <span> · Display cropped</span>}</p>
            </div>
            <div className="destination-navigation">
              <button type="button" onClick={() => selectCity(stops[activeIndex - 1].slug)} disabled={activeIndex === 0} aria-label="Previous destination">← Previous</button>
              <span aria-hidden="true">0{active.stop} / 0{stops.length}</span>
              <button type="button" onClick={() => selectCity(stops[activeIndex + 1].slug)} disabled={activeIndex === stops.length - 1} aria-label="Next destination">Next →</button>
            </div>
          </article>
        </div>
        <div className="day-trip-grid" aria-label="Proposed day trips">{sideTrips.map((city) => <article id={`day-trip-${city.slug}`} className="day-trip-card" key={city.slug}><img src={city.photo} alt={`${city.name} city view`} loading="lazy" /><div><p className="eyebrow">Day trip from {city.from}</p><h3>{city.name}</h3><p>{city.description}</p><ExperiencePhotoCredit image={city.slug === 'lubeck' ? 'baltic' : city.slug} /></div></article>)}</div>
        <p className="destination-note">A glimpse of each destination. Specific visits and activities will be announced with the itinerary.</p>
      </div>
    </section>
  )
}
