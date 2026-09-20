import { motion } from 'framer-motion'
import { skills } from '../../data/skills'

const CATEGORY_COLORS = {
  languages: 'text-terminal-amber',
  frontend:  'text-terminal-blue',
  backend:   'text-terminal-green',
  databases: 'text-terminal-red',
  tools:     'text-terminal-muted',
  cloud:     'text-terminal-green-dim',
}

export default function SkillsView({ onClose }) {
  return (
    <section className="border border-terminal-border rounded p-4 my-2 bg-terminal-surface">
      <div className="flex justify-between items-center mb-3">
        <span className="text-terminal-muted text-xs">cat skills.txt</span>
        <button onClick={onClose} className="text-terminal-muted text-xs hover:text-terminal-red transition-colors">
          [x] close
        </button>
      </div>
      <div className="space-y-2">
        {Object.entries(skills).map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: ci * 0.08 }}
            className="flex flex-wrap items-baseline"
          >
            <h4 className={`text-sm font-mono inline ${CATEGORY_COLORS[category] || 'text-terminal-text'}`}>
              {category.padEnd(12)}
            </h4>
            <span className="text-terminal-muted text-sm ml-1">→ </span>
            <span className="text-terminal-text text-sm ml-1">{items.join(', ')}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}