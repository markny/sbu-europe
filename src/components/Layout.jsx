import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link className="brand" to="/">
            Europe with <span>SBU</span>
          </Link>
          <nav className="site-nav">
            <Link to="/vienna">Vienna</Link>
            <Link to="/munich">Munich</Link>
            <Link to="/cologne">Cologne</Link>
            <Link to="/amsterdam">Amsterdam</Link>
            <Link to="/looking-ahead">2027 Preview</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="shell">
          <p>Europe with SBU · Early beta · built from curated 2025 trip photos.</p>
        </div>
      </footer>
    </>
  )
}
