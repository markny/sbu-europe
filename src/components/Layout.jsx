import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cityMap } from '../data/cities'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const { pathname, hash } = useLocation()
  useEffect(() => {
    setMenuOpen(false)
    const city = cityMap[pathname.split('/').pop()]
    const title = city ? `${city.displayName} · 2025 trip` : pathname === '/2025' ? 'The 2025 trip' : pathname === '/2027' ? 'The 2027 trip' : 'Europe with SBU'
    document.title = title === 'Europe with SBU' ? title : `${title} · Europe with SBU`
    const description = city?.teaser || (pathname === '/2027'
      ? 'Explore the proposed SBU Europe 2027 rail journey: Vienna, Prague, Dresden, Berlin, and Hamburg. This interactive map assumes Hamburg is the final stop.'
      : 'A faculty-led Europe experience with SBU. Explore photographs from the 2025 trip and learn about the route taking shape for 2027.')
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() }
      }}>
        <div className="shell header-inner">
          <Link className="brand" to="/" aria-label="Europe with SBU home"><span className="brand-monogram">SBU</span><span className="brand-name">EUROPE<span>A faculty-led experience</span></span></Link>
          <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close menu' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
          <nav id="site-navigation" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
            <NavLink to="/" end>The program</NavLink><NavLink to="/2025">The 2025 trip</NavLink>
            <NavLink className={({ isActive }) => `nav-next${isActive ? ' active' : ''}`} to="/2027">Looking to 2027 <span aria-hidden="true">↗</span></NavLink>
          </nav>
        </div>
      </header>
      {children}
      <footer className="site-footer"><div className="shell footer-inner"><div><Link className="footer-brand" to="/">Europe with SBU</Link><p>Shared places. Lasting memories.</p></div><nav aria-label="Footer navigation"><Link to="/2025">2025 photographs</Link><Link to="/2027">2027 trip</Link><a href="#main">Back to top ↑</a></nav></div></footer>
    </>
  )
}
