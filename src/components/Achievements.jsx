import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, ChevronRight, X } from 'lucide-react'
import DriveImage from './DriveImage.jsx'
import Modal from './Modal.jsx'

// ── Read-more modal (title + description only) ─────────────────────────────
function DetailModal({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <Modal isOpen={!!achievement} onClose={onClose}>
      <div className="p-8">
        <div className="mb-6 -mx-8 -mt-8 h-16 rounded-t-3xl bg-gradient-to-r from-teal-700 to-teal-500" />
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-slate-900 pr-10 leading-snug">
            {achievement.title}
          </h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
          {achievement.fullDesc || achievement.shortDesc}
        </p>
      </div>
    </Modal>
  )
}

// ── Credential modal (image only, dark lightbox style) ─────────────────────
function CredentialModal({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Dark backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20
                     text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <motion.div
          className="relative z-10 max-w-3xl w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-white/50 text-xs text-center mb-3 uppercase tracking-widest">
            Credential · {achievement.title}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <DriveImage
              src={achievement.image}
              alt={`${achievement.title} credential`}
              bare
              className="w-full block"
              size="w1000"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Single achievement list row ────────────────────────────────────────────
function AchievementRow({ achievement, index, onViewCredential, onReadMore }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-100
                 hover:border-teal-100 hover:shadow-md transition-all duration-200"
    >
      {/* Index badge */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-50 border border-teal-100
                      flex items-center justify-center mt-0.5">
        <Award className="w-4 h-4 text-teal-600" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1.5">
          {achievement.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
          {achievement.shortDesc}
        </p>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-2 ml-2">
        <button
          onClick={onReadMore}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800
                     text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200
                     hover:border-slate-300 transition-all whitespace-nowrap"
        >
          Read more
          <ChevronRight className="w-3 h-3" />
        </button>

        {achievement.image && (
          <button
            onClick={onViewCredential}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white
                       text-xs font-semibold px-3 py-1.5 rounded-full transition-all
                       shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
          >
            <ExternalLink className="w-3 h-3" />
            View Credential
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ── Main Achievements section ──────────────────────────────────────────────
export default function Achievements({ achievements, loading }) {
  const [detailItem,     setDetailItem]     = useState(null)
  const [credentialItem, setCredentialItem] = useState(null)

  return (
    <section id="achievements" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Recognition
          </span>
          <h2 className="section-heading">Achievements</h2>
          <p className="section-subheading">
            Milestones, awards, and recognitions that reflect the impact of this work.
          </p>
        </motion.div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white animate-pulse h-24 border border-slate-100" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No achievements listed yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {achievements.map((achievement, i) => (
              <AchievementRow
                key={i}
                achievement={achievement}
                index={i}
                onReadMore={() => setDetailItem(achievement)}
                onViewCredential={() => setCredentialItem(achievement)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Read-more modal */}
      <DetailModal
        achievement={detailItem}
        onClose={() => setDetailItem(null)}
      />

      {/* Credential lightbox */}
      {credentialItem && (
        <CredentialModal
          achievement={credentialItem}
          onClose={() => setCredentialItem(null)}
        />
      )}
    </section>
  )
}
