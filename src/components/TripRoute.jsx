export default function TripRoute({ compact = false }) {
  return (
    <div className={`trip-route ${compact ? 'trip-route--compact' : ''}`} aria-label="Working 2027 route">
      <ol className="route-first">{['Vienna', 'Prague', 'Dresden'].map((city, index) => <li key={city}><span className="route-number">0{index + 1}</span><span>{city}</span>{index < 2 && <span className="route-arrow" aria-hidden="true">→</span>}</li>)}</ol>
      <div className="route-final"><span className="eyebrow">Final two cities</span><div>Berlin <span className="route-amp">&</span> Hamburg</div><p>Order still to be decided</p></div>
    </div>
  )
}
