import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

const STATUS_COLORS = {
  live: 'text-terminal-green',
  'open-source': 'text-terminal-blue',
  wip: 'text-terminal-amber',
}

export default function ProjectsView({ onClose }) {
  return (
    <section className="border border-terminal-border rounded p-4 my-2 bg-terminal-surface">
      <div className="flex justify-between items-center mb-3">
        <span className="text-terminal-muted text-xs">ls -la projects/</span>
        <button onClick={onClose} className="text-terminal-muted text-xs hover:text-terminal-red transition-colors">
          [x] close
        </button>
      </div>
      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-terminal-border rounded p-3 hover:border-terminal-green transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-terminal-blue font-mono text-sm">{project.name}/</h3>
              <span className={`text-xs font-mono ${STATUS_COLORS[project.status] || 'text-terminal-muted'}`}>
                [{project.status}]
              </span>
            </div>
            <p className="text-terminal-muted text-xs mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs text-terminal-green border border-terminal-green-dark px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                   className="text-terminal-muted hover:text-terminal-green transition-colors">
                  [github] →
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                   className="text-terminal-muted hover:text-terminal-amber transition-colors">
                  [live] →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}