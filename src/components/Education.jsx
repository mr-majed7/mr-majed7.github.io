import { motion } from 'framer-motion'
import { GraduationCap, Download, Calendar, MapPin } from 'lucide-react'
import { EDUCATION, PROFILE } from '../config.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Education() {
  return (
    <section id="education" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Background
          </span>
          <h2 className="section-heading">Education</h2>
          <p className="section-subheading">
            Academic foundations and professional credentials that ground my practice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Timeline */}
          <motion.div
            className="lg:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />

              <ul className="space-y-10">
                {EDUCATION.map((edu, i) => (
                  <motion.li key={i} variants={item} className="flex gap-6">
                    {/* Dot */}
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-500
                                      flex items-center justify-center shadow-sm">
                        <GraduationCap className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100
                                    hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900 text-base leading-snug">
                          {edu.degree}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-teal-600 text-xs font-semibold
                                         bg-teal-50 px-3 py-1 rounded-full flex-shrink-0">
                          <Calendar className="w-3 h-3" />
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium text-sm mb-1">{edu.institution}</p>
                      <p className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                      {edu.description && (
                        <p className="text-slate-500 text-sm leading-relaxed">{edu.description}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CV download card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl
                            p-8 text-white shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6">
                <Download className="w-7 h-7 text-teal-400" />
              </div>

              <h3 className="font-serif text-xl font-semibold mb-3">Full Curriculum Vitae</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Download my complete CV for a detailed overview of experience, qualifications, and
                professional accomplishments.
              </p>

              {PROFILE.cv ? (
                <a
                  href={PROFILE.cv}
                  download
                  className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-400
                             text-white font-semibold py-3.5 rounded-xl transition-all duration-200
                             shadow-lg hover:shadow-teal-500/30 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              ) : (
                <div className="text-center text-slate-500 text-sm py-3">
                  Add cv.pdf to /public to enable download
                </div>
              )}

              <p className="text-slate-600 text-xs text-center mt-4">PDF · Updated {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
