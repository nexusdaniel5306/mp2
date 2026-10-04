import axios from 'axios'
import type { Pokemon, PokemonApiResponse, PokemonListResponse } from '../types/pokemon'

const api = axios.create({ timeout: 15000 })
const records = new Map<number, Pokemon>()
let collection: Pokemon[] | undefined
let inFlight: Promise<Pokemon[]> | undefined

function normalize(data: PokemonApiResponse): Pokemon {
  return {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
      front_shiny: data.sprites.front_shiny,
    },
    types: [...data.types].sort((a, b) => a.slot - b.slot).map(({ type }) => type.name),
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
    abilities: [...data.abilities].sort((a, b) => a.slot - b.slot)
      .map(({ ability, is_hidden }) => ({ name: ability.name, is_hidden })),
    stats: data.stats.map(({ stat, base_stat }) => ({ name: stat.name, base_stat })),
  }
}

async function fetchCollection(): Promise<Pokemon[]> {
  const { data } = await api.get<PokemonListResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
  )
  const resources = data.results.map(({ url }) => {
    const match = /^https:\/\/pokeapi\.co\/api\/v2\/pokemon\/(\d+)\/$/.exec(url)
    const id = Number(match?.[1])
    if (!Number.isInteger(id) || id < 152 || id > 251) {
      throw new Error('The API returned an unexpected archive record.')
    }
    return { id, url }
  })
  if (resources.length !== 100 || new Set(resources.map(({ id }) => id)).size !== 100) {
    throw new Error('The API returned an incomplete archive.')
  }

  const missing = resources.filter(({ id }) => !records.has(id))
  for (let start = 0; start < missing.length; start += 10) {
    const results = await Promise.allSettled(missing.slice(start, start + 10).map(async ({ id, url }) => {
      const response = await api.get<PokemonApiResponse>(url)
      if (response.data.id !== id) throw new Error('The API returned an unexpected Pokémon.')
      records.set(id, normalize(response.data))
    }))
    const failed = results.find((result) => result.status === 'rejected')
    if (failed?.status === 'rejected') throw failed.reason
  }

  const complete = [...records.values()].sort((a, b) => a.id - b.id)
  if (complete.length !== 100 || complete.some((pokemon, index) => pokemon.id !== index + 152)) {
    throw new Error('The archive could not be completed.')
  }
  collection = complete
  return complete
}

export function loadJohtoPokemon(): Promise<Pokemon[]> {
  if (collection) return Promise.resolve(collection)
  if (!inFlight) {
    inFlight = fetchCollection().finally(() => { inFlight = undefined })
  }
  return inFlight
}
