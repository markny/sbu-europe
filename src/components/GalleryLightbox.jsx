import { useEffect, useRef, useState } from 'react'
export default function GalleryLightbox({ images, cityName }) {
  const [showAll, setShowAll] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const opener = useRef(null)
  const visibleImages = showAll ? images : images.filter((image) => image.featuredOrder !== null)
  const activeIndex = visibleImages.findIndex((image) => image.id === activeId)
  const active = visibleImages[activeIndex]
  const isOpen = Boolean(active)
  useEffect(() => {
    if (!isOpen) return
    const modal = dialog.current
    const previousOverflow = document.body.style.overflow
    modal.showModal()
    closeButton.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { modal.close(); document.body.style.overflow = previousOverflow; opener.current?.focus() }
  }, [isOpen])
  function move(direction) {
    const index = (activeIndex + direction + visibleImages.length) % visibleImages.length
    setActiveId(visibleImages[index].id)
  }
  return (
    <>
      <div className="gallery-toolbar"><div className="gallery-switch" role="group" aria-label="Choose photographs">
        <button type="button" aria-pressed={!showAll} onClick={() => setShowAll(false)}>Highlights</button>
        <button type="button" aria-pressed={showAll} onClick={() => setShowAll(true)}>All {images.length} photographs</button>
      </div><p aria-live="polite">{visibleImages.length} photographs · Select a photo to enlarge</p></div>
      <div className="gallery-grid">{visibleImages.map((photo) => <figure className="gallery-item" key={photo.id}>
        <button type="button" className="gallery-photo" aria-label={`Enlarge: ${photo.caption}`} onClick={(event) => { opener.current = event.currentTarget; setActiveId(photo.id) }}>
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /><span className="photo-enlarge" aria-hidden="true">↗</span>
        </button>
        <figcaption><span className="photo-location">{photo.location}</span><p>{photo.caption}</p>{photo.credit && <span className="photo-credit">Photo: {photo.credit}</span>}</figcaption>
      </figure>)}</div>
      <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-caption" onCancel={(event) => { event.preventDefault(); setActiveId(null) }} onClick={(event) => { if (event.target === event.currentTarget) setActiveId(null) }} onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'Tab') {
          const buttons = event.currentTarget.querySelectorAll('button')
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }
      }}>
        {active && <div className="lightbox-content">
          <div className="lightbox-top"><span>{cityName} · 2025 · {activeIndex + 1} / {visibleImages.length}</span><button ref={closeButton} type="button" onClick={() => setActiveId(null)}>Close <span aria-hidden="true">×</span></button></div>
          <img className="lightbox-image" src={active.src} alt={active.alt} width={active.width} height={active.height} />
          <div className="lightbox-bottom"><button type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button><div><p id="lightbox-caption" aria-live="polite">{active.caption}</p><span>{active.location}{active.credit ? ` · Photo: ${active.credit}` : ''}</span></div><button type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button></div>
        </div>}
      </dialog>
    </>
  )
}
