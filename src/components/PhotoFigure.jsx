export default function PhotoFigure({ photo, className = '', priority = false, caption = true }) {
  return (
    <figure className={`photo-figure ${className}`}>
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
        loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : undefined} decoding="async" />
      {caption && <figcaption><span>{photo.caption} <span className="photo-year">2025</span></span>
        {photo.credit && <span className="photo-credit">Photo: {photo.credit}</span>}</figcaption>}
    </figure>
  )
}
