import { displayName } from '../utils/pokemon'

export function TypeBadges({ types }: { types: string[] }) {
  return <span className="type-badges">{types.map((type) => (
    <span className={`type type-${type}`} key={type}>{displayName(type)}</span>
  ))}</span>
}
