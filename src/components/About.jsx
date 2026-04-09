import { motion } from 'framer-motion'
import { MapPin, Mail, Linkedin } from 'lucide-react'
import { PROFILE } from '../config.js'

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
              About
            </span>
            <h2 className="section-heading mb-6">A little about me</h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
              {PROFILE.about.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-3">
              {PROFILE.location && (
                <span className="inline-flex items-center gap-2 text-slate-600 text-sm
                                 bg-slate-100 px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  {PROFILE.location}
                </span>
              )}
              {PROFILE.email && (
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 text-slate-600 text-sm
                             bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-4 py-2
                             rounded-full transition-colors"
                >
                  <Mail className="w-4 h-4 text-teal-600" />
                  {PROFILE.email}
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-600 text-sm
                             bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-4 py-2
                             rounded-full transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-teal-600" />
                  LinkedIn
                </a>
              )}
            </div>
          </motion.div>

          {/* Stats / quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Led' },
                { value: '6',  label: 'Program Areas' },
                { value: '50K+', label: 'Lives Reached' },
              ].map(({ value, label }, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 ${
                    i === 0
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div className={`font-serif text-4xl font-bold mb-1 ${i === 0 ? 'text-white' : 'text-slate-900'}`}>
                    {value}
                  </div>
                  <div className={`text-sm font-medium ${i === 0 ? 'text-teal-100' : 'text-slate-500'}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tagline card */}
            <div className="mt-4 bg-slate-900 rounded-2xl p-6 text-white">
              <blockquote className="font-serif text-lg italic text-slate-300 leading-relaxed">
                "Dedicated to building communities where every person has the dignity,
                voice, and opportunity to thrive."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
