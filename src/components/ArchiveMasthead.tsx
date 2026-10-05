import { PokemonImage } from './PokemonImage'
import { displayName } from '../utils/pokemon'
import type { Pokemon } from '../types/pokemon'

export function ArchiveMasthead({ pokemon, shiny, gallery = false }: { pokemon: Pokemon[]; shiny: boolean; gallery?: boolean }) {
  const starters = pokemon.filter((item) => [152, 155, 158].includes(item.id))
  return (
    <div className="view-heading journal-masthead">
      <div className="masthead-copy"><p className="eyebrow">{gallery ? '02 / SPECIMEN GALLERY' : '01 / FIELD INDEX'} · JOHTO</p>
        <h1>{gallery ? 'Meet the Johto collection.' : 'A region of discovery.'}</h1>
        <p className="intro">{gallery ? 'A closer look at every specimen. Filter by type to find familiar faces.'
          : 'Search the archive. Get to know the Pokémon of a new generation.'}</p>
        <p className="journal-caption">FIELD JOURNAL / VOL. 02 <span>100 specimen records</span></p>
      </div>
      <div className="starter-study" aria-hidden="true">
        <span className="study-caption">FIG. 01 — BEGINNINGS IN JOHTO</span>
        {starters.map((item) => <div key={item.id} className={`starter-slip specimen-${item.types[0]}`}>
          <span className="record-id">#{item.id}</span>
          <PokemonImage sprites={item.sprites} name={item.name} shiny={shiny} eager />
          <span className="starter-name">{displayName(item.name)}</span>
        </div>)}
      </div>
    </div>
  )
}
