import { useMemo, useState } from 'react'

export default function GalleryLightbox({ images, cityName }) {
  const [active, setActive] = useState(null)
  const visibleImages = useMemo(() => images.slice(0, 24), [images])

  return (
    <>
      <div className="gallery-grid reveal-group">
        {visibleImages.map((image, index) => (
          <button
            key={`${image.filename}-${index}`}
            className="thumb reveal-up"
            onClick={() => setActive(image)}
            type="button"
          >
            <img src={image.src} alt={image.title || cityName} loading="lazy" />
            <span>{image.title || cityName}</span>
          </button>
        ))}
      </div>

      <div className={`lightbox ${active ? 'open' : ''}`} onClick={() => setActive(null)}>
        <button
          className="lightbox__close"
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setActive(null)
          }}
        >
          Close
        </button>
        {active ? (
          <div className="lightbox__inner" onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.title || cityName} />
            <div className="lightbox__caption">{active.caption || active.title || cityName}</div>
          </div>
        ) : null}
      </div>
    </>
  )
}
