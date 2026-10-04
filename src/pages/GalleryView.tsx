import { Link } from 'react-router'
import { PokemonImage } from '../components/PokemonImage'
import { TypeBadges } from '../components/TypeBadges'
import { displayName } from '../utils/pokemon'
import type { Pokemon } from '../types/pokemon'

export function GalleryView({ pokemon, selectedType, onType }: {
  pokemon: Pokemon[]; selectedType: string; onType: (type: string) => void
}) {
  const types = [...new Set(pokemon.flatMap((item) => item.types))].sort()
  const results = pokemon.filter((item) => selectedType === 'all' || item.types.includes(selectedType))
  return (
    <>
      <div className="view-heading"><div><p className="eyebrow">02 / SPECIMEN GALLERY</p>
        <h1>Meet the Johto collection.</h1><p className="intro">A closer look at every specimen. Filter by type to find familiar faces.</p></div></div>
      <section className="filter-panel panel" aria-label="Filter gallery by type">
        <h2>Filter by type</h2><div className="type-filters">
          {['all', ...types].map((type) => <button key={type} aria-pressed={selectedType === type}
            onClick={() => onType(type)}>{type === 'all' ? 'All types' : displayName(type)}</button>)}
        </div>
      </section>
      <div className="results-heading"><p role="status"><strong>{results.length}</strong> of 100 specimens
        {selectedType !== 'all' && ` · ${displayName(selectedType)}`}</p><span>NATIONAL POKÉDEX ORDER</span></div>
      <ul className="gallery">{results.map((item) => <li key={item.id}>
        <Link className="gallery-card panel" to={`/pokemon/${item.id}`}>
          <div className="card-top"><span className="record-id">#{item.id}</span><span aria-hidden="true">↗</span></div>
          <PokemonImage src={item.sprites.front_default} name={item.name} />
          <h2>{displayName(item.name)}</h2><TypeBadges types={item.types} />
        </Link>
      </li>)}</ul>
    </>
  )
}
