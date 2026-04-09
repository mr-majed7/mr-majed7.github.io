import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

export default function GalleryPage({ activities, onBack }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [failedSrcs, setFailedSrcs] = useState(new Set())

  // Flatten every image from every activity
  const allImages = activities.flatMap(a =>
    (a.images || []).map(url => ({ url, title: a.title }))
  )

  const isOpen = lightboxIdx !== null
  const total = allImages.length

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const h = (e) => {
      if (e.key === 'Escape')      setLightboxIdx(null)
      if (e.key === 'ArrowRight')  setLightboxIdx(i => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft')   setLightboxIdx(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, total])

  // Body scroll lock when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const markFailed = (url) => setFailedSrcs(s => new Set([...s, url]))

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-slate-950"
    >
      {/* Teal accent stripe */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400" />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white
                       text-sm font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <h1 className="font-serif font-semibold text-white text-base tracking-wide">
              Gallery
            </h1>
            {total > 0 && (
              <span className="text-slate-600 text-[10px] font-mono tracking-widest">
                {total} PHOTOS
              </span>
            )}
          </div>

          {/* spacer to keep title centred */}
          <div className="w-16" />
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
        {total === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-40 gap-5">
            <div className="w-20 h-20 rounded-2xl border border-slate-800 flex items-center
                            justify-center">
              <Images className="w-9 h-9 text-slate-700" />
            </div>
            <p className="text-slate-600 text-xs font-mono tracking-[0.2em] uppercase">
              No photos yet
            </p>
            <p className="text-slate-700 text-xs text-center max-w-xs leading-relaxed">
              Add Cloudinary image URLs to your Google Sheet and they will appear here.
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 xl:columns-4 gap-3">
            {allImages.map((img, i) => (
              failedSrcs.has(img.url) ? null : (
                <motion.div
                  key={i}
                  className="mb-3 break-inside-avoid cursor-pointer group relative
                             overflow-hidden rounded-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.45 }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <img
                    src={img.url}
                    alt=""
                    loading="lazy"
                    className="w-full block object-cover transition-transform duration-700
                               group-hover:scale-[1.04]"
                    onError={() => markFailed(img.url)}
                  />
                  {/* Hover vignette */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-300
                                  rounded-xl" />
                </motion.div>
              )
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIdx(null)}
          >
            {/* Image counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10
                            text-white/40 text-xs font-mono tracking-widest select-none">
              {lightboxIdx + 1} / {total}
            </div>

            {/* Close */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10
                         hover:bg-white/20 text-white flex items-center justify-center
                         transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <AnimatePresence>
              {lightboxIdx > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => i - 1) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full
                             bg-white/10 hover:bg-white/20 text-white flex items-center
                             justify-center transition-all hover:scale-110"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Next */}
            <AnimatePresence>
              {lightboxIdx < total - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => i + 1) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full
                             bg-white/10 hover:bg-white/20 text-white flex items-center
                             justify-center transition-all hover:scale-110"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Image with cross-fade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIdx}
                src={allImages[lightboxIdx]?.url}
                alt=""
                className="max-h-[86vh] max-w-[88vw] md:max-w-[78vw] object-contain rounded-sm
                           select-none"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
