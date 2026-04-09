import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, ImageIcon, X } from 'lucide-react'
import DriveImage from '../components/DriveImage.jsx'


// ── Split-screen activity modal ────────────────────────────────────────────
function ActivityModal({ activity, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const images = activity?.images || []

  useEffect(() => { setActiveIdx(0) }, [activity])

  useEffect(() => {
    if (!activity) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [activity])

  useEffect(() => {
    const h = (e) => {
      if (!activity) return
      const imgs = activity.images || []
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && imgs.length > 1)
        setActiveIdx(i => (i + 1) % imgs.length)
      if (e.key === 'ArrowLeft' && imgs.length > 1)
        setActiveIdx(i => (i - 1 + imgs.length) % imgs.length)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [activity, onClose])

  if (!activity) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col md:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* ── IMAGE SIDE — click anywhere to close ── */}
        <div
          className="relative flex-shrink-0 h-[40vh] md:h-full md:w-[55%] bg-slate-900 overflow-hidden cursor-pointer"
          onClick={onClose}
        >
          {images.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <DriveImage
                    src={images[activeIdx]}
                    alt={`${activity.title} — ${activeIdx + 1}`}
                    bare
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 pointer-events-none
                              bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />

              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveIdx(i => (i - 1 + images.length) % images.length) }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                               bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm
                               flex items-center justify-center transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveIdx(i => (i + 1) % images.length) }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                               bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm
                               flex items-center justify-center transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Expanding-line indicators */}
                  <div className="absolute bottom-5 left-8 right-8 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={e => { e.stopPropagation(); setActiveIdx(i) }}
                        className={`h-0.5 rounded-full transition-all duration-300 ${
                          i === activeIdx
                            ? 'flex-[3] bg-white'
                            : 'flex-1 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <p className="absolute bottom-5 right-5 hidden md:block select-none pointer-events-none
                            text-white/20 text-[10px] font-mono tracking-[0.18em]">
                CLICK TO CLOSE
              </p>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-slate-700" />
            </div>
          )}
        </div>

        {/* ── CONTENT SIDE ── */}
        <motion.div
          className="relative bg-white flex-1 md:flex-none md:w-[45%] flex flex-col overflow-hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top teal stripe */}
          <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400 flex-shrink-0" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100
                       hover:bg-slate-200 text-slate-500 hover:text-slate-800
                       flex items-center justify-center transition-all hover:scale-110"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex-1 overflow-y-auto px-8 pt-10 pb-10 md:px-12 md:pt-14
                          flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-px bg-teal-500" />
              <span className="text-teal-600 text-[11px] font-mono tracking-[0.15em] uppercase">
                Activity
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900
                           leading-tight mb-5 pr-8">
              {activity.title}
            </h3>

            {activity.shortDesc && (
              <p className="text-slate-500 text-sm leading-[1.85] mb-6">
                {activity.shortDesc}
              </p>
            )}

            {/* Google Doc embed */}
            {activity.docUrl ? (
              <div className="flex-1 min-h-[380px] rounded-xl overflow-hidden
                              border border-slate-200 bg-slate-50">
                <iframe
                  src={activity.docUrl}
                  title={activity.title}
                  className="w-full h-full min-h-[380px]"
                  style={{ border: 'none' }}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center min-h-[200px]
                              rounded-xl border border-dashed border-slate-200 bg-slate-50">
                <p className="text-slate-400 text-xs font-mono tracking-wider">
                  NO DOCUMENT LINKED
                </p>
              </div>
            )}

            {/* Mobile image dots */}
            {images.length > 1 && (
              <div className="mt-6 flex gap-1.5 md:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1 rounded-full transition-all ${
                      i === activeIdx ? 'w-8 bg-teal-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Activity card — uniform academic style ────────────────────────────────
function ActivityCard({ activity, index, onClick }) {
  const [imgFailed, setImgFailed] = useState(false)
  const firstImage = activity.images?.[0]
  const hasImage = firstImage && !imgFailed
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm
                 hover:shadow-md hover:border-teal-200 transition-all duration-200
                 cursor-pointer group flex flex-col"
      onClick={onClick}
    >
      {/* Image area — contain so the full photo is always visible */}
      <div className="relative aspect-[4/3] bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img
            src={firstImage}
            alt={activity.title}
            loading="lazy"
            className="w-full h-full object-contain
                       group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-slate-300" />
        )}

        {/* Index badge */}
        <span className="absolute top-3 right-3 font-mono text-[10px] font-medium
                         bg-white/85 text-slate-400 px-1.5 py-0.5 rounded backdrop-blur-sm
                         leading-none">
          {num}
        </span>
      </div>

      {/* Teal rule — animates on hover */}
      <div className="h-[2px] bg-slate-100 group-hover:bg-teal-400 transition-colors duration-300
                      flex-shrink-0" />

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-serif font-semibold text-slate-900 text-[0.95rem] leading-snug
                       mb-2.5 line-clamp-2">
          {activity.title}
        </h4>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {activity.shortDesc}
        </p>
        <span className="mt-2 text-teal-600 text-xs font-medium self-start">
          See more
        </span>
      </div>
    </motion.div>
  )
}

// ── Project page ───────────────────────────────────────────────────────────
export default function ProjectPage({ program, programIndex, activities, onBack }) {
  const [selectedActivity, setSelectedActivity] = useState(null)

  return (
    <motion.div
      key="project-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-white"
    >
      {/* Teal top stripe — visual continuity with modal and teal accents on the site */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400" />

      {/* Page header */}
      <div className="bg-white pt-20 pb-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-800
                       text-sm font-medium mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All programs
          </button>

          <div className="flex items-start gap-5">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {program.title}
              </h1>
              {program.description && (
                <p className="text-slate-500 text-sm mt-3 max-w-2xl leading-relaxed">
                  {program.description}
                </p>
              )}
              <p className="text-slate-400 text-[11px] mt-4 font-mono tracking-[0.15em] uppercase">
                {String(activities.length).padStart(2, '0')}&nbsp;
                {activities.length === 1 ? 'activity' : 'activities'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {activities.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            No activities listed for this program yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map((activity, i) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={i}
                onClick={() => setSelectedActivity(activity)}
              />
            ))}
          </div>
        )}
      </div>

      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </motion.div>
  )
}
