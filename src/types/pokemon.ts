interface NamedResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: NamedResource[]
}

export interface PokemonApiResponse {
  id: number
  name: string
  sprites: { front_default: string | null; front_shiny: string | null }
  types: { slot: number; type: NamedResource }[]
  base_experience: number | null
  height: number
  weight: number
  abilities: { slot: number; is_hidden: boolean; ability: NamedResource }[]
  stats: { base_stat: number; stat: NamedResource }[]
}

export interface Pokemon {
  id: number
  name: string
  sprites: { front_default: string | null; front_shiny: string | null }
  types: string[]
  base_experience: number | null
  height: number
  weight: number
  abilities: { name: string; is_hidden: boolean }[]
  stats: { name: string; base_stat: number }[]
}

export type SortKey = 'id' | 'name' | 'base_experience'
export type SortDirection = 'asc' | 'desc'
export type PokemonLoadState =
  | { status: 'loading' }
  | { status: 'success'; pokemon: Pokemon[] }
  | { status: 'error'; message: string }
