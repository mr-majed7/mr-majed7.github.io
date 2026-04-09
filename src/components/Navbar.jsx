import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { PROFILE, EDUCATION_CATEGORIES, EXPERIENCE_CATEGORIES } from '../config.js'

// Section IDs tracked for active highlight
const SECTION_IDS = ['home', 'education', 'experience', 'projects', 'achievements', 'contact']

// Links that are simple anchor scrolls (no dropdown)
const SIMPLE_LINKS = [
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery',      href: 'gallery' },
  { label: 'Contact',      href: '#contact' },
]

// ── Shared link-class helper (text-only, no background) ───────────────────
function linkCls(isActive, scrolled, extra = '') {
  const base = `text-sm font-medium transition-colors duration-150 ${extra}`
  if (isActive)
    return `${base} ${scrolled ? 'text-slate-900 font-semibold' : 'text-white font-semibold'}`
  return `${base} ${scrolled ? 'text-slate-500 hover:text-slate-800' : 'text-white/60 hover:text-white'}`
}

// ── Dropdown panel wrapper ────────────────────────────────────────────────
function DropdownPanel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl
                 border border-slate-100 overflow-hidden z-50 py-2"
    >
      {children}
    </motion.div>
  )
}

// ── Generic category dropdown (Education / Experience) ────────────────────
function CategoryDropdown({ label, categories, scrolled, isActive, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => onNavigate(null)}
        className={`flex items-center gap-1 px-3 py-2 ${linkCls(isActive, scrolled)}`}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <DropdownPanel>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider
                          px-4 pt-1 pb-2">
              Categories
            </p>
            {categories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => { setOpen(false); onNavigate(cat.category) }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left
                           hover:bg-slate-50 transition-colors group"
              >
                <span className="text-slate-700 text-sm font-medium group-hover:text-slate-900
                                 leading-snug">
                  {cat.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-100
                                 px-1.5 py-0.5 rounded-full">
                  {cat.items.length}
                </span>
              </button>
            ))}
          </DropdownPanel>
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Projects dropdown ─────────────────────────────────────────────────────
function ProjectsDropdown({ programs, activityCounts, scrolled, isActive, onGoProjects, onSelectProgram }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={onGoProjects}
        className={`flex items-center gap-1 px-3 py-2 ${linkCls(isActive, scrolled)}`}
      >
        Projects
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <DropdownPanel>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider
                          px-4 pt-1 pb-2">
              Program Areas
            </p>
            {programs.map((program, i) => {
              const count = activityCounts[program.id] || 0
              return (
                <button
                  key={program.id}
                  onClick={() => { setOpen(false); onSelectProgram(program, i) }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left
                             hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-slate-700 text-sm font-medium group-hover:text-slate-900
                                   leading-snug flex-1 pr-2">
                    {program.title}
                  </span>
                  {count > 0 && (
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-100
                                     px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
            <div className="border-t border-slate-100 mt-1 px-4 py-2.5">
              <button
                onClick={() => { setOpen(false); onGoProjects() }}
                className="text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors"
              >
                View all projects →
              </button>
            </div>
          </DropdownPanel>
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────
export default function Navbar({
  programs = [],
  activities = [],
  onSelectProgram,
  onGoHome,
  onShowGallery = () => {},
  isProjectPage = false,
  isGalleryPage = false,
}) {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [mobileProgOpen, setMobileProgOpen] = useState(false)
  const [mobileEduOpen,  setMobileEduOpen]  = useState(false)
  const [mobileExpOpen,  setMobileExpOpen]  = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section highlight via IntersectionObserver
  useEffect(() => {
    if (isProjectPage) return
    const observers = SECTION_IDS.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [isProjectPage])

  // ── Navigation helpers ──────────────────────────────────────────────────
  const scrollToSection = (href) => {
    setMobileOpen(false)
    if (href === 'gallery') { onShowGallery(); return }
    if (isProjectPage || isGalleryPage) {
      onGoHome()
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 350)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGoProjects = () => {
    setMobileOpen(false)
    const go = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    if (isProjectPage || isGalleryPage) { onGoHome(); setTimeout(go, 350) } else go()
  }

  const handleSelectProgram = (program, i) => {
    setMobileOpen(false)
    onSelectProgram(program, i)
  }

  // Pre-compute activity count per program for the Projects dropdown
  const activityCounts = {}
  activities.forEach(a => {
    activityCounts[a.programId] = (activityCounts[a.programId] || 0) + 1
  })

  // Scroll to #education and (optionally) fire an event to open a specific category
  const handleEducationNav = (catName) => {
    setMobileOpen(false)
    const dispatch = () => {
      document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })
      if (catName) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('expandEducationCategory', { detail: { category: catName } })
          )
        }, 400)
      }
    }
    if (isProjectPage || isGalleryPage) { onGoHome(); setTimeout(dispatch, 350) } else dispatch()
  }

  // Scroll to #experience and (optionally) expand a specific category
  const handleExperienceNav = (catName) => {
    setMobileOpen(false)
    const dispatch = () => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      if (catName) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('expandExperienceCategory', { detail: { category: catName } })
          )
        }, 400)
      }
    }
    if (isProjectPage || isGalleryPage) { onGoHome(); setTimeout(dispatch, 350) } else dispatch()
  }

  const isOnHome = !isProjectPage && !isGalleryPage
  const light = scrolled || isProjectPage || isGalleryPage

  // Active section helpers
  const isLinkActive = (href) => {
    if (href === 'gallery') return isGalleryPage
    return isOnHome && activeSection === href.replace('#', '')
  }
  const isEduActive  = isOnHome && (activeSection === 'education')
  const isProjActive = isOnHome && activeSection === 'projects'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        light
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => { onGoHome(); setMobileOpen(false) }}
          className={`font-serif font-semibold text-lg transition-colors ${
            light ? 'text-slate-900' : 'text-white'
          }`}
        >
          {PROFILE.name.split(' ')[0]}
          <span className="text-teal-500">.</span>
        </button>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-0.5">

          {/* Home */}
          <li>
            <button
              onClick={() => scrollToSection('#home')}
              className={`px-3 py-2 ${linkCls(isOnHome && activeSection === 'home', light)}`}
            >
              Home
            </button>
          </li>

          {/* Education dropdown */}
          <CategoryDropdown
            label="Education"
            categories={EDUCATION_CATEGORIES}
            scrolled={light}
            isActive={isEduActive}
            onNavigate={handleEducationNav}
          />

          {/* Experience dropdown */}
          <CategoryDropdown
            label="Experience"
            categories={EXPERIENCE_CATEGORIES}
            scrolled={light}
            isActive={isOnHome && activeSection === 'experience'}
            onNavigate={handleExperienceNav}
          />

          {/* Projects dropdown */}
          <ProjectsDropdown
            programs={programs}
            activityCounts={activityCounts}
            scrolled={light}
            isActive={isProjActive}
            onGoProjects={handleGoProjects}
            onSelectProgram={handleSelectProgram}
          />

          {/* Remaining simple links */}
          {SIMPLE_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollToSection(href)}
                className={`px-3 py-2 ${linkCls(isLinkActive(href), light)}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            light ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">

              {/* Home */}
              <li>
                <button
                  onClick={() => scrollToSection('#home')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isOnHome && activeSection === 'home' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Home
                </button>
              </li>

              {/* Education expandable */}
              <li>
                <button
                  onClick={() => setMobileEduOpen(v => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
                               text-sm font-medium transition-colors ${
                    isEduActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Education</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileEduOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileEduOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-1 flex flex-col gap-0.5"
                    >
                      {EDUCATION_CATEGORIES.map((cat) => (
                        <li key={cat.category}>
                          <button
                            onClick={() => handleEducationNav(cat.category)}
                            className="w-full flex items-center justify-between px-4 py-2.5
                                       rounded-xl text-left text-slate-600 hover:bg-slate-50 text-sm"
                          >
                            <span>{cat.category}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {cat.items.length}
                            </span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Experience expandable */}
              <li>
                <button
                  onClick={() => setMobileExpOpen(v => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
                               text-sm font-medium transition-colors ${
                    isOnHome && activeSection === 'experience' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Experience</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-1 flex flex-col gap-0.5"
                    >
                      {EXPERIENCE_CATEGORIES.map((cat) => (
                        <li key={cat.category}>
                          <button
                            onClick={() => handleExperienceNav(cat.category)}
                            className="w-full flex items-center justify-between px-4 py-2.5
                                       rounded-xl text-left text-slate-600 hover:bg-slate-50 text-sm"
                          >
                            <span>{cat.category}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {cat.items.length}
                            </span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Projects expandable */}
              <li>
                <button
                  onClick={() => setMobileProgOpen(v => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
                               text-sm font-medium transition-colors ${
                    isProjActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Projects</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProgOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileProgOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 mt-1 flex flex-col gap-0.5"
                    >
                      {programs.map((program, i) => (
                        <li key={program.id}>
                          <button
                            onClick={() => handleSelectProgram(program, i)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl
                                       text-left text-slate-600 hover:bg-slate-50 text-sm"
                          >
                            {program.title}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Simple links */}
              {SIMPLE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isLinkActive(href) ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
