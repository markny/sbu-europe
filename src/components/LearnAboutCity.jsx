export default function LearnAboutCity({ city }) {
  return (
    <div className="learn-box reveal-up">
      <details>
        <summary>Learn about this city</summary>
        <p>{city.description}</p>
      </details>
    </div>
  )
}
