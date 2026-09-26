import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExperiencePhotoCredit from '../components/ExperiencePhotoCredit'
import './Experience2027.css'

const slides = [
  { id: 'welcome', eyebrow: 'St. Bonaventure University Business School · May 2027', title: 'The European Economic Experience', image: 'hero', alt: 'Illustrated European cityscape at sunset', body: 'Same world. Bigger perspective. A proposed 14-day international travel experience for Business School students.', detail: 'May 19–June 1, 2027 · 4 countries · proposed 3-credit course' },
  { id: 'journey', eyebrow: 'Your possible journey', title: 'Four city stays. Three day trips.', image: 'prague', alt: 'Charles Bridge and the Prague skyline', body: 'Vienna, Prague, Berlin, and Hamburg anchor the journey. Bratislava, Dresden, and Lübeck/Travemünde are proposed day trips.', detail: 'Depart Buffalo May 19 · Fly home June 1', action: { label: 'Explore the interactive map', href: '/2027#route' } },
  { id: 'vienna', eyebrow: 'May 20–23 · Austria', title: 'Vienna & Bratislava', image: 'belvedere', alt: 'Upper Belvedere Palace in Vienna', body: 'Begin with Vienna’s imperial architecture, art, and music. The proposed Bratislava day trip crosses into Slovakia along the Danube.', detail: 'Explore palaces, museums, neighborhoods, and a second capital.' },
  { id: 'prague', eyebrow: 'May 24–25 · Czech Republic', title: 'Prague', image: 'prague', alt: 'Prague Old Town and Charles Bridge', body: 'A city of Old Town streets, Charles Bridge, and layers of architectural history.', detail: 'Move through a new economy and a new cultural setting.' },
  { id: 'berlin', eyebrow: 'May 26–29 · Germany', title: 'Berlin & Dresden', image: 'berlin', alt: 'Berlin Brandenburg Gate', body: 'Explore Berlin’s history, government, and contemporary culture. The presentation proposes a Dresden day trip on May 29.', detail: 'The Berlin–Dresden excursion is a day trip, not an additional overnight stay.' },
  { id: 'hamburg', eyebrow: 'May 30–31 · Germany', title: 'Hamburg & the Baltic Sea', image: 'hamburg', alt: 'Hamburg waterfront buildings', body: 'Finish in the port city of Hamburg, with a proposed day trip to Lübeck and Travemünde on the Baltic coast.', detail: 'The route and day trips remain subject to confirmation.' },
  { id: 'choices', eyebrow: 'Examples from the Vienna exploration guide', title: 'What would you choose?', image: 'schonbrunn', alt: 'Schönbrunn Palace and its gardens', body: 'The sample guide gives Upper Belvedere 3 points, Schönbrunn Palace 2 points, and the Prater Giant Ferris Wheel 1 point. Students would choose eligible stops and build their own routes.', detail: 'These are examples from the presentation. Final eligible stops and point requirements will be announced.' },
  { id: 'explore', eyebrow: 'How a day could work', title: 'Together, then your own route.', image: 'belvedere', alt: 'Upper Belvedere in Vienna', body: 'Selected mornings include group activities. Afternoons and evenings give students a chance to choose eligible stops with a buddy or group, earn exploration points, and write a short area summary.', detail: 'Example: Upper Belvedere (3 points) + Belvedere Gardens (1 point). The required total and daily details will be announced.' },
  { id: 'details', eyebrow: 'Practical details', title: 'Start planning.', image: 'hero', alt: 'Illustrated European cityscape at sunset', body: 'The slides propose a Spring 2027 accompanying class, ECO 499-EE, for 3 credits. Estimated cost is about $4,175 per traveler, with a planning range of $3,966–$4,384.', detail: 'Dates, itinerary, course, and price are planning information. Contact mwilson@sbu.edu or bposmani@sbu.edu for more information.', action: { label: 'Download the PowerPoint', href: '/downloads/european-economic-experience-2027.pptx', download: true } }
]

function slideIndexFromHash() {
  const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash)
  return index >= 0 ? index : 0
}

export default function ExperiencePresentation() {
  const [index, setIndex] = useState(slideIndexFromHash)
  const slide = slides[index]
  useEffect(() => {
    const onHash = () => setIndex(slideIndexFromHash())
    const onKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT','TEXTAREA','SELECT','BUTTON','A'].includes(document.activeElement?.tagName)) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); setIndex((current) => Math.min(slides.length - 1, current + 1)) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); setIndex((current) => Math.max(0, current - 1)) }
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey) }
  }, [])
  useEffect(() => { history.replaceState(null, '', `#${slide.id}`) }, [slide.id])
  return <main id="main" tabIndex="-1" className="eee-presentation"><div className="shell eee-presentation-top"><Link to="/2027">← 2027 trip overview</Link><span>European Economic Experience · Web presentation</span><a href="/downloads/european-economic-experience-2027.pptx" download>Download PowerPoint ↧</a></div><div className="shell eee-presentation-layout"><nav className="eee-slide-nav" aria-label="Presentation sections">{slides.map((item,number)=><button key={item.id} type="button" aria-current={index === number ? 'step' : undefined} onClick={() => setIndex(number)}><span>{String(number+1).padStart(2,'0')}</span>{item.title}</button>)}</nav><div className="eee-stage"><article className="eee-slide" aria-live="polite" aria-atomic="true"><div className="eee-slide-copy"><p className="eyebrow">{slide.eyebrow}</p><h1>{slide.title}</h1><p className="eee-slide-body">{slide.body}</p><p className="eee-slide-detail">{slide.detail}</p>{slide.action && <a className="eee-button" href={slide.action.href} download={slide.action.download}>{slide.action.label} <span aria-hidden="true">↗</span></a>}{slide.id === 'details' && <p className="eee-slide-contacts"><a href="mailto:mwilson@sbu.edu">Dr. Mark Wilson</a> · <a href="mailto:bposmani@sbu.edu">Dr. Ben Posmanick</a></p>}</div><figure className="eee-slide-figure"><img src={`/eee-2027/${slide.image}.webp`} alt={slide.alt} /><figcaption>{slide.image === 'hero' ? 'AI illustration from the EEE information-session presentation' : <ExperiencePhotoCredit image={slide.image} />}</figcaption></figure></article><div className="eee-slide-controls"><button type="button" onClick={() => setIndex(Math.max(index-1,0))} disabled={index===0}>← Previous</button><span>{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span><button type="button" onClick={() => setIndex(Math.min(index+1,slides.length-1))} disabled={index===slides.length-1}>Next →</button></div><p className="eee-slide-hint">Use the arrows or select a section to move through the presentation.</p></div></div></main>
}
