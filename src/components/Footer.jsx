import { Mail, Linkedin, Heart } from 'lucide-react'
import { PROFILE } from '../config.js'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Education',    href: '#education' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-3">
              {PROFILE.name.split(' ')[0]}
              <span className="text-teal-400">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              Social worker, community builder, and development professional committed to
              equity and lasting change.
            </p>
            <div className="flex gap-3">
              {PROFILE.email && (
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center
                             justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center
                             justify-center text-slate-400 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick contact */}
          <div>
            <h4 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            {PROFILE.email && (
              <a href={`mailto:${PROFILE.email}`}
                 className="text-slate-400 hover:text-teal-400 text-sm block mb-2 transition-colors">
                {PROFILE.email}
              </a>
            )}
            {PROFILE.location && (
              <p className="text-slate-500 text-sm">{PROFILE.location}</p>
            )}
            {PROFILE.cv && (
              <a
                href={PROFILE.cv}
                download
                className="inline-flex items-center gap-2 mt-4 text-teal-400 hover:text-teal-300
                           text-sm font-medium transition-colors"
              >
                Download CV →
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-slate-500 text-xs">
          <p>© {year} {PROFILE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-teal-500 fill-teal-500" /> for social impact
          </p>
        </div>
      </div>
    </footer>
  )
}
