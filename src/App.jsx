import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Background from './components/Background.jsx'
import Projects from './components/Projects.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import { useSheets } from './hooks/useSheets.js'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-slate-700" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-t-teal-400 animate-spin" />
        </div>
        <p className="text-slate-500 text-sm">Loading portfolio…</p>
      </div>
    </div>
  )
}

export default function App() {
  const { programs, activities, achievements, loading, usingDemo } = useSheets()

  const [activeProject, setActiveProject] = useState(null)
  const [showGallery,   setShowGallery]   = useState(false)

  const handleSelectProgram = (program, programIndex) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowGallery(false)
    setActiveProject({ program, programIndex })
  }

  const handleBack = () => {
    setActiveProject(null)
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  const handleShowGallery = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveProject(null)
    setShowGallery(true)
  }

  const handleGoHome = () => {
    setActiveProject(null)
    setShowGallery(false)
  }

  if (loading) return <LoadingScreen />

  // Determine active view key for AnimatePresence
  const viewKey = activeProject ? activeProject.program.id
                : showGallery   ? 'gallery'
                : 'home'

  return (
    <>
      <Navbar
        programs={programs}
        activities={activities}
        onSelectProgram={handleSelectProgram}
        onGoHome={handleGoHome}
        onShowGallery={handleShowGallery}
        isProjectPage={!!activeProject || showGallery}
        isGalleryPage={showGallery}
      />

      {usingDemo && (
        <div className="fixed bottom-4 right-4 z-30 bg-amber-50 border border-amber-200
                        text-amber-800 text-xs px-4 py-2 rounded-full shadow-md max-w-xs text-center">
          Demo data — set your Sheet ID in{' '}
          <code className="font-mono bg-amber-100 px-1 rounded">src/config.js</code>
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeProject ? (
          <ProjectPage
            key={viewKey}
            program={activeProject.program}
            programIndex={activeProject.programIndex}
            activities={activities.filter(a => a.programId === activeProject.program.id)}
            onBack={handleBack}
          />
        ) : showGallery ? (
          <GalleryPage
            key="gallery"
            activities={activities}
            onBack={handleGoHome}
          />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <main>
              <Hero />
              <Background />
              <Projects
                programs={programs}
                activities={activities}
                onSelectProgram={handleSelectProgram}
                loading={loading}
              />
              <Achievements achievements={achievements} loading={loading} />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
