import { useState } from 'react'
import { displayName } from '../utils/pokemon'

export function PokemonImage({ src, name, eager = false }: {
  src: string | null; name: string; eager?: boolean
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  return (
    <div className="sprite">
      {src && failedSource !== src
        ? <img src={src} alt={`${displayName(name)} sprite`} width="96" height="96"
            loading={eager ? 'eager' : 'lazy'} onError={() => setFailedSource(src)} />
        : <span className="sprite-placeholder" role="img" aria-label={`${displayName(name)} sprite unavailable`}>
            <span aria-hidden="true">◇</span><small>Sprite unavailable</small>
          </span>}
    </div>
  )
}
