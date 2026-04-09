import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function ProgramCard({ program, activityCount, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="w-full h-full text-left p-6 rounded-2xl border border-slate-100 bg-white
                 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-200
                 flex flex-col group"
    >
      <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2">
        {program.title}
      </h3>

      {program.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {program.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between flex-shrink-0">
        <span className="text-xs text-slate-400">
          {activityCount} {activityCount === 1 ? 'activity' : 'activities'}
        </span>
        <span className="flex items-center gap-1 text-teal-600 text-xs font-semibold
                         group-hover:gap-2 transition-all">
          View <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.button>
  )
}

export default function Projects({ programs, activities, onSelectProgram, loading }) {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase mb-3 block">
            Work
          </span>
          <h2 className="section-heading">Projects & Programs</h2>
          <p className="section-subheading">
            Click a program area to explore its activities and initiatives.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
            {programs.map((program, i) => (
              <div key={program.id} className="h-full">
                <ProgramCard
                  program={program}
                  activityCount={activities.filter(a => a.programId === program.id).length}
                  index={i}
                  onClick={() => onSelectProgram(program, i)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
