import { Link, NavLink } from 'react-router'

export function AppNav() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="PokéLab home">
          <span className="brand-mark" aria-hidden="true">◒</span>
          <span>PokéLab<small>JOHTO RESEARCH ARCHIVE</small></span>
        </Link>
        <nav aria-label="Archive views">
          <NavLink to="/" end>List view</NavLink>
          <NavLink to="/gallery">Gallery view</NavLink>
        </nav>
        <span className="header-label">FIELD ARCHIVE / VOL. 02</span>
      </div>
    </header>
  )
}
