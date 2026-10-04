import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import { AppNav } from './components/AppNav'
import { useJohtoPokemon } from './hooks/useJohtoPokemon'
import { ListView } from './pages/ListView'
import { GalleryView } from './pages/GalleryView'
import { DetailView } from './pages/DetailView'
import type { SortDirection, SortKey } from './types/pokemon'
import './App.css'

function App() {
  const { state, retry } = useJohtoPokemon()
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [direction, setDirection] = useState<SortDirection>('asc')
  const [selectedType, setSelectedType] = useState('all')
  const { pathname } = useLocation()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <AppNav />
      <div className="scope-bar"><span>100 Pokémon introduced in Generation 2</span><span>National Pokédex #152–251</span></div>
      <main id="main" tabIndex={-1}>
        {state.status === 'loading' && <section className="empty panel" role="status">
          <span className="loading-mark" aria-hidden="true">◒</span><h1>Loading the Johto archive…</h1>
          <p>Gathering 100 specimen records from PokéAPI.</p></section>}
        {state.status === 'error' && <section className="empty panel" role="alert"><p className="eyebrow">CONNECTION INTERRUPTED</p>
          <h1>The archive is unavailable</h1><p>{state.message}</p><button onClick={retry}>Retry</button></section>}
        {state.status === 'success' && <Routes>
          <Route path="/" element={<ListView pokemon={state.pokemon} query={query} sortKey={sortKey} direction={direction}
            onQuery={setQuery} onSortKey={setSortKey} onDirection={setDirection} />} />
          <Route path="/gallery" element={<GalleryView pokemon={state.pokemon} selectedType={selectedType} onType={setSelectedType} />} />
          <Route path="/pokemon/:id" element={<DetailView pokemon={state.pokemon} />} />
          <Route path="*" element={<div className="empty panel"><h1>Page not found</h1>
            <p>Head back to the archive to keep exploring.</p><Link className="button" to="/">Back to list</Link></div>} />
        </Routes>}
      </main>
      <footer className="site-footer"><span>PokéLab <span aria-hidden="true">/</span> Johto Regional Research Archive</span>
        <span>Current Pokémon data & sprites from <a href="https://pokeapi.co/">PokéAPI ↗</a></span></footer>
    </>
  )
}

export default App
