import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin, Send } from 'lucide-react'
import { PROFILE } from '../config.js'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get in touch
          </span>
          <h2 className="section-heading">Let's Connect</h2>
          <p className="section-subheading mx-auto text-center">
            Whether you want to collaborate, discuss a project, or just say hello — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {PROFILE.email && (
            <motion.a
              href={`mailto:${PROFILE.email}`}
              className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-slate-100
                         hover:border-teal-200 hover:bg-teal-50 transition-all group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-full bg-teal-100 group-hover:bg-teal-200 flex
                              items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 text-sm mb-0.5">Email</p>
                <p className="text-slate-500 text-xs break-all">{PROFILE.email}</p>
              </div>
            </motion.a>
          )}

          {PROFILE.linkedin && (
            <motion.a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-slate-100
                         hover:border-teal-200 hover:bg-teal-50 transition-all group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-full bg-teal-100 group-hover:bg-teal-200 flex
                              items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 text-sm mb-0.5">LinkedIn</p>
                <p className="text-slate-500 text-xs">Connect with me</p>
              </div>
            </motion.a>
          )}

          {PROFILE.location && (
            <motion.div
              className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-slate-100 bg-slate-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-500" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-800 text-sm mb-0.5">Location</p>
                <p className="text-slate-500 text-xs">{PROFILE.location}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
