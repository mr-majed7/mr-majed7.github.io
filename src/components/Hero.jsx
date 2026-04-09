import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'
import { PROFILE } from '../config.js'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen bg-slate-900 overflow-hidden flex flex-col"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full
                        bg-teal-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full
                        bg-teal-900/30 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-12 lg:gap-16 lg:items-start items-center">

            {/* ── Left column: profile photo + text ── */}
            <div className="order-1">

              {/* Circular profile photo */}
              <motion.div
                className="mb-7"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.05 }}
              >
                <div className="w-28 h-28 rounded-full overflow-hidden
                                ring-4 ring-teal-500/30 shadow-2xl">
                  {!imgError ? (
                    <img
                      src={PROFILE.photo}
                      alt={PROFILE.name}
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center
                                    text-3xl font-serif text-slate-400">
                      {PROFILE.name.charAt(0)}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Category label */}
              <motion.div {...fadeUp(0.15)}>
                <span className="inline-flex items-center gap-2 text-teal-400 text-sm font-medium
                                 tracking-widest uppercase mb-4">
                  <span className="w-8 h-px bg-teal-400" />
                  Social Work &amp; Development
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white
                           leading-[1.08] mb-4"
                {...fadeUp(0.25)}
              >
                {PROFILE.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-teal-300 font-medium text-lg mb-5"
                {...fadeUp(0.35)}
              >
                {PROFILE.tagline}
              </motion.p>

              {/* About */}
              <motion.p
                className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg"
                {...fadeUp(0.45)}
              >
                {PROFILE.about}
              </motion.p>

              {/* CTA */}
              <motion.div {...fadeUp(0.55)}>
                <button
                  onClick={() =>
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="btn-primary text-base"
                >
                  View Projects
                  <ArrowDown className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

            {/* ── Right column: Facebook video embed ── */}
            <motion.div
              className="order-2 lg:pt-44 lg:-mr-6 xl:-mr-12"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* 16:11 ratio — taller than standard 16:9 */}
              <div className="relative w-full rounded-2xl overflow-hidden
                              ring-1 ring-white/10 shadow-2xl bg-black"
                   style={{ paddingBottom: '68.75%', height: 0 }}>
                <iframe
                  src={PROFILE.videoEmbed}
                  title="Introduction video"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>

              {/* Caption */}
              <p className="mt-3 text-slate-500 text-xs italic leading-relaxed text-center px-1">
                This documentary, published by BRAC University, Bangladesh, in collaboration
                with{' '}
                <a
                  href="https://ghea21.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 underline underline-offset-2
                             transition-colors not-italic font-medium"
                >
                  GHEA21
                </a>
                , offers an insight into the featured social initiatives.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="relative z-10 flex justify-center pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-slate-500 hover:text-teal-400 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
