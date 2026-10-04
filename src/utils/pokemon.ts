import type { Pokemon, SortDirection, SortKey } from '../types/pokemon'

export function displayName(name: string): string {
  return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function selectPokemon(pokemon: Pokemon[], query: string, key: SortKey, direction: SortDirection) {
  const search = query.trim().toLowerCase()
  return pokemon.filter((item) => item.name.includes(search)).sort((a, b) => {
    if (key === 'base_experience') {
      if (a.base_experience === null && b.base_experience !== null) return 1
      if (b.base_experience === null && a.base_experience !== null) return -1
    }
    const comparison = key === 'name'
      ? a.name.localeCompare(b.name)
      : (a[key] ?? 0) - (b[key] ?? 0)
    return comparison * (direction === 'asc' ? 1 : -1) || a.id - b.id
  })
}

export function neighborIds(id: number) {
  return { previous: id === 152 ? 251 : id - 1, next: id === 251 ? 152 : id + 1 }
}
