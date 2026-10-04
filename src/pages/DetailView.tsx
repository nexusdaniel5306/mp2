import { Link, useParams } from 'react-router'
import { PokemonImage } from '../components/PokemonImage'
import { TypeBadges } from '../components/TypeBadges'
import { displayName, neighborIds } from '../utils/pokemon'
import type { Pokemon } from '../types/pokemon'

const statNames: Record<string, string> = {
  hp: 'HP', attack: 'Attack', defense: 'Defense',
  'special-attack': 'Special Attack', 'special-defense': 'Special Defense', speed: 'Speed',
}

export function DetailView({ pokemon }: { pokemon: Pokemon[] }) {
  const { id = '' } = useParams()
  const record = /^\d+$/.test(id) ? pokemon.find((item) => item.id === Number(id)) : undefined
  if (!record) return <div className="empty panel"><p className="eyebrow">RECORD NOT FOUND</p>
    <h1>Pokémon not in this archive</h1><p>Explore National Pokédex IDs #152–251.</p><Link className="button" to="/">Back to list</Link></div>

  const neighbors = neighborIds(record.id)
  const previous = pokemon.find((item) => item.id === neighbors.previous)!
  const next = pokemon.find((item) => item.id === neighbors.next)!
  return (
    <>
      <Link className="back-link" to="/">← Back to list</Link>
      <div className="detail-heading"><div><p className="eyebrow">03 / SPECIMEN RECORD</p><h1>{displayName(record.name)}</h1>
        <TypeBadges types={record.types} /></div><span className="detail-number">#{record.id}<small>NATIONAL POKÉDEX</small></span></div>
      <div className="detail-grid">
        <section className="specimen-panel panel" aria-label="Specimen sprite">
          <div className="specimen-label"><span>JOHTO / GEN 02</span><span>◒</span></div>
          <PokemonImage key={record.id} src={record.sprites.front_default} name={record.name} eager />
          <p>SPECIMEN #{record.id}<small>{displayName(record.name)}</small></p>
        </section>
        <section className="attributes panel"><p className="eyebrow">FIELD NOTES</p><h2>At a glance</h2>
          <dl className="measurements"><div><dt>Height</dt><dd>{record.height / 10} <span>m</span></dd></div>
            <div><dt>Weight</dt><dd>{record.weight / 10} <span>kg</span></dd></div>
            <div><dt>Base experience</dt><dd>{record.base_experience ?? 'Unknown'}</dd></div></dl>
          <h3>Abilities</h3><ul className="abilities">{record.abilities.map((ability) => <li key={ability.name}>
            {displayName(ability.name)}{ability.is_hidden && <span className="hidden-label">Hidden</span>}</li>)}</ul>
        </section>
        <section className="stats-panel panel"><p className="eyebrow">BASE STAT PROFILE</p><h2>In numbers</h2>
          <ul className="stats">{record.stats.map((stat) => <li key={stat.name}>
            <span>{statNames[stat.name] ?? displayName(stat.name)}</span><strong>{stat.base_stat}</strong>
          </li>)}</ul>
        </section>
      </div>
      <div className="neighbor-caption">Browse by National Pokédex number</div>
      <nav className="neighbor-nav" aria-label="Browse Pokémon">
        <Link className="neighbor panel" to={`/pokemon/${previous.id}`}><span>← PREVIOUS</span>
          <strong>{displayName(previous.name)} <small>#{previous.id}</small></strong></Link>
        <Link className="neighbor panel next" to={`/pokemon/${next.id}`}><span>NEXT →</span>
          <strong>{displayName(next.name)} <small>#{next.id}</small></strong></Link>
      </nav>
    </>
  )
}
