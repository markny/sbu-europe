import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <main id="main" className="shell section not-found" tabIndex="-1"><p className="eyebrow">Page not found</p><h1>Let’s find<br />your way back.</h1><p>The page you’re looking for isn’t here.</p><Link className="button" to="/">Return to the program →</Link></main>
}
