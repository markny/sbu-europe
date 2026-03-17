export default function HeroSection({ image, eyebrow, title, text, actions = [], page = false }) {
  return (
    <section className={page ? 'page-hero' : 'hero'}>
      <div className="hero__bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="shell hero__content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lede">{text}</p>
        {actions.length ? (
          <div className="button-row">
            {actions.map((action) => (
              <a key={action.label} className={`button ${action.ghost ? 'button--ghost' : ''}`} href={action.href}>
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
