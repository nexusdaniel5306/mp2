import { useState } from 'react'
import { displayName } from '../utils/pokemon'
import type { Pokemon } from '../types/pokemon'

export function PokemonImage({ sprites, name, shiny = false, eager = false }: {
  sprites: Pokemon['sprites']; name: string; shiny?: boolean; eager?: boolean
}) {
  const src = shiny ? sprites.front_shiny : sprites.front_default
  const imageName = `${displayName(name)}${shiny ? ' shiny' : ''} sprite`
  const [failedSource, setFailedSource] = useState<string | null>(null)
  return (
    <div className="sprite">
      {src && failedSource !== src
        ? <img src={src} alt={imageName} width="96" height="96"
            loading={eager ? 'eager' : 'lazy'} onError={() => setFailedSource(src)} />
        : <span className="sprite-placeholder" role="img" aria-label={`${imageName} unavailable`}>
            <span aria-hidden="true">◇</span><small>{shiny ? 'Shiny sprite unavailable' : 'Sprite unavailable'}</small>
          </span>}
    </div>
  )
}
