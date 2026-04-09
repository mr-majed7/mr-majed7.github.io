import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Briefcase, ChevronDown, MapPin, Download, Building2 } from 'lucide-react'
import { EDUCATION_CATEGORIES, EXPERIENCE_CATEGORIES, PROFILE } from '../config.js'

// ── Logo display ──────────────────────────────────────────────────────────
function Logo({ src, alt, fallbackIcon: Icon }) {
  const [error, setError] = useState(false)
  if (src && !error) {
    return (
      <img
        src={`/logos/${src}`}
        alt={alt}
        className="w-full h-full object-contain p-1"
        onError={() => setError(true)}
      />
    )
  }
  return <Icon className="w-5 h-5 text-slate-400" />
}

// ── Education accordion category ─────────────────────────────────────────
function EducationCategory({ category, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  // Listen for navbar-triggered expand events
  useEffect(() => {
    const h = (e) => {
      if (e.detail?.category === category) setOpen(true)
    }
    window.addEventListener('expandEducationCategory', h)
    return () => window.removeEventListener('expandEducationCategory', h)
  }, [category])

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white
                   hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800 text-sm">{category}</span>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full
                           font-mono leading-none">
            {items.length}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200
                      ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-slate-100 divide-y divide-slate-100">
              {items.map((item, i) => (
                <div key={i} className="px-5 py-4 bg-white flex gap-4">
                  {/* Institution logo */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-slate-100
                                  bg-white flex items-center justify-center overflow-hidden shadow-sm">
                    <Logo
                      src={item.logo}
                      alt={item.institution}
                      fallbackIcon={GraduationCap}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug
                                     flex-1 min-w-0 pr-2">
                        {item.degree}
                      </h4>
                      <span className="flex-shrink-0 text-teal-600 text-[10px] font-mono
                                       bg-teal-50 px-2.5 py-1 rounded-full leading-none whitespace-nowrap">
                        {item.dateRange}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium text-xs mb-1">{item.institution}</p>
                    <p className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {item.location}
                    </p>
                    {item.description && (
                      <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Work experience accordion category ───────────────────────────────────
function ExperienceCategory({ category, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  // Listen for navbar-triggered expand events
  useEffect(() => {
    const h = (e) => {
      if (e.detail?.category === category) setOpen(true)
    }
    window.addEventListener('expandExperienceCategory', h)
    return () => window.removeEventListener('expandExperienceCategory', h)
  }, [category])

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white
                   hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800 text-sm">{category}</span>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full
                           font-mono leading-none">
            {items.length}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200
                      ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-slate-100 px-5">
              {items.length === 0 ? (
                <p className="py-5 text-slate-400 text-xs text-center">No entries yet.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {items.map((exp, i) => (
                    <div key={i} className="py-5 first:pt-4 last:pb-4">
                      <ExperienceItem exp={exp} index={i} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── LinkedIn-style experience item ────────────────────────────────────────
function ExperienceItem({ exp, index }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = exp.description && exp.shortDesc && exp.description !== exp.shortDesc

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex gap-4 pb-6 last:pb-0"
    >
      {/* Organisation logo */}
      <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-slate-100
                      bg-white flex items-center justify-center overflow-hidden shadow-sm">
        <Logo src={exp.logo} alt={exp.organization} fallbackIcon={Building2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-0.5">
          <h4 className="font-semibold text-slate-900 text-sm leading-snug flex-1 min-w-0 pr-2">
            {exp.role}
          </h4>
          <span className="flex-shrink-0 text-teal-600 text-[10px] font-mono
                           bg-teal-50 px-2.5 py-1 rounded-full leading-none whitespace-nowrap">
            {exp.dateRange}
          </span>
        </div>

        <p className="text-slate-700 font-medium text-xs mb-0.5">{exp.organization}</p>

        <p className="flex items-center gap-1 text-slate-400 text-xs mb-2.5">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          {exp.location}
        </p>

        {/* Description with expand/collapse */}
        <p className="text-slate-500 text-xs leading-relaxed">
          {expanded ? exp.description : (exp.shortDesc || exp.description)}
        </p>

        {hasMore && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-1.5 text-teal-600 hover:text-teal-700 text-xs font-medium
                       transition-colors inline-flex items-center gap-0.5"
          >
            {expanded ? 'See less' : 'See more'}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ── Background section ────────────────────────────────────────────────────
export default function Background() {
  return (
    <section id="background" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Education subsection */}
            <motion.div
              id="education"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h3 className="flex items-center gap-2.5 font-serif text-xl font-semibold
                             text-slate-900 mb-5">
                <GraduationCap className="w-5 h-5 text-teal-600 flex-shrink-0" />
                Education
              </h3>
              <div className="space-y-3">
                {EDUCATION_CATEGORIES.map((cat, i) => (
                  <EducationCategory
                    key={i}
                    category={cat.category}
                    items={cat.items}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </motion.div>

            {/* Work Experience subsection */}
            <motion.div
              id="experience"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h3 className="flex items-center gap-2.5 font-serif text-xl font-semibold
                             text-slate-900 mb-5">
                <Briefcase className="w-5 h-5 text-teal-600 flex-shrink-0" />
                Work Experience
              </h3>

              <div className="space-y-3">
                {EXPERIENCE_CATEGORIES.map((cat, i) => (
                  <ExperienceCategory
                    key={i}
                    category={cat.category}
                    items={cat.items}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── CV download sidebar ── */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-gradient-to-br from-slate-900 to-slate-800
                            rounded-3xl p-8 text-white shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center
                              justify-center mb-6">
                <Download className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Full Curriculum Vitae</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Download my complete CV for a detailed overview of experience, qualifications,
                and professional accomplishments.
              </p>
              {PROFILE.cv ? (
                <a
                  href={PROFILE.cv}
                  download
                  className="flex items-center justify-center gap-2 w-full bg-teal-500
                             hover:bg-teal-400 text-white font-semibold py-3.5 rounded-xl
                             transition-all duration-200 shadow-lg hover:shadow-teal-500/30
                             active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              ) : (
                <div className="text-center text-slate-500 text-sm py-3">
                  Add cv.pdf to /public to enable download
                </div>
              )}
              <p className="text-slate-600 text-xs text-center mt-4">
                PDF · Updated {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
