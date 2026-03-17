export default function SoundtrackPlaceholder({ city }) {
  return (
    <div className="meta-item reveal-up">
      <p className="eyebrow">Soundtrack</p>
      <strong>Future-ready</strong>
      <p>{city.soundtrack?.label || `Play ${city.displayName} soundtrack`} (coming later)</p>
    </div>
  )
}
