import { useEffect, useState } from 'react'
import { loadJohtoPokemon } from '../services/pokemonApi'
import type { PokemonLoadState } from '../types/pokemon'

export function useJohtoPokemon() {
  const [state, setState] = useState<PokemonLoadState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    loadJohtoPokemon().then(
      (pokemon) => { if (active) setState({ status: 'success', pokemon }) },
      () => {
        if (active) setState({
          status: 'error',
          message: 'We couldn’t load the complete archive from PokéAPI. Check your connection and try again.',
        })
      },
    )
    return () => { active = false }
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }

  return { state, retry }
}
