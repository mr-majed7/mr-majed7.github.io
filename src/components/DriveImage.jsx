import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

/**
 * Renders a Cloudinary (or any public) image URL.
 *
 * Props:
 *  src       – Cloudinary public URL, e.g. https://res.cloudinary.com/…/image/upload/…
 *  alt       – img alt text
 *  className – classes on the wrapper div (or directly on <img> when bare=true)
 *  style     – styles on the wrapper div (or directly on <img> when bare=true)
 *  cover     – fills wrapper container via CSS class (wrapper must have explicit height)
 *  bare      – skips the wrapper div entirely; renders a plain <img>.
 *              Use this inside modals / any context with complex CSS stacking.
 */
export default function DriveImage({
  src,
  alt = '',
  className = '',
  style,
  cover = false,
  bare = false,
}) {
  const [failed, setFailed] = useState(false)

  const placeholder = (cls, st) => (
    <div
      className={`flex items-center justify-center bg-slate-100 ${cls}`}
      style={st}
    >
      <ImageIcon className="w-10 h-10 text-slate-300" />
    </div>
  )

  if (!src || failed) {
    return placeholder(bare ? className : `drive-image-frame ${cover ? 'cover' : ''} ${className}`, style)
  }

  if (bare) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="eager"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className={`drive-image-frame ${cover ? 'cover' : ''} ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
