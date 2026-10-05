import { Link } from 'react-router'
import { TypeBadges } from '../components/TypeBadges'
import { PokemonImage } from '../components/PokemonImage'
import { ArchiveMasthead } from '../components/ArchiveMasthead'
import { displayName, selectPokemon } from '../utils/pokemon'
import type { Pokemon, SortDirection, SortKey } from '../types/pokemon'

interface ListViewProps {
  pokemon: Pokemon[]
  shiny: boolean
  query: string
  sortKey: SortKey
  direction: SortDirection
  onQuery: (value: string) => void
  onSortKey: (value: SortKey) => void
  onDirection: (value: SortDirection) => void
}

export function ListView({ pokemon, shiny, query, sortKey, direction, onQuery, onSortKey, onDirection }: ListViewProps) {
  const results = selectPokemon(pokemon, query, sortKey, direction)
  return (
    <>
      <ArchiveMasthead pokemon={pokemon} shiny={shiny} />
      <div className="controls panel">
        <label className="search-control">Search by name
          <input type="search" placeholder="Try Chikorita…" value={query} onChange={(event) => onQuery(event.target.value)} />
        </label>
        <label>Sort by<select value={sortKey} onChange={(event) => onSortKey(event.target.value as SortKey)}>
          <option value="id">National ID</option><option value="name">Name</option>
          <option value="base_experience">Base experience</option>
        </select></label>
        <label>Order<select value={direction} onChange={(event) => onDirection(event.target.value as SortDirection)}>
          <option value="asc">Ascending ↑</option><option value="desc">Descending ↓</option>
        </select></label>
      </div>
      <div className="results-heading"><p role="status"><strong>{results.length}</strong> of 100 records</p>
        <span>SELECT A RECORD TO EXPLORE →</span></div>
      {results.length === 0 ? <div className="empty panel"><h2>No matching records</h2>
        <p>No Pokémon in this archive matches “{query.trim()}”.</p><button onClick={() => onQuery('')}>Clear search</button></div>
        : <div className="list-panel panel">
          <div className="list-labels" aria-hidden="true"><span>National ID</span><span>Pokémon</span><span>Type</span><span>Base exp.</span><span /></div>
          <ul className="pokemon-list">{results.map((item) => <li key={item.id}>
            <Link className="pokemon-row" to={`/pokemon/${item.id}`}>
              <span className="record-id">#{item.id}</span>
              <span className="record-name"><PokemonImage sprites={item.sprites} name={item.name} shiny={shiny} />
                <strong>{displayName(item.name)}</strong></span>
              <TypeBadges types={item.types} />
              <span className="experience"><span className="mobile-label">Base exp. </span>{item.base_experience ?? 'Unknown'}</span>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </Link>
          </li>)}</ul>
        </div>}
    </>
  )
}
