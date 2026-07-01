import { motion } from 'framer-motion'

const lines = [
  { text: '# about.md', color: 'text-terminal-amber' },
  { text: '', color: '' },
  { text: 'Name    : Mithul Varshan S K', color: 'text-terminal-green' },
  { text: 'Role    : Full Stack Developer', color: 'text-terminal-green' },
  { text: 'Based   : Tamil Nadu, India', color: 'text-terminal-green' },
  { text: 'Status  : Open to freelance & full-time', color: 'text-terminal-amber' },
  { text: '', color: '' },
  { text: '## Summary', color: 'text-terminal-blue' },
  { text: 'I build fast, clean, user-first web apps.', color: 'text-terminal-text' },
  { text: 'React on the front, Node on the back, shipped on time.', color: 'text-terminal-text' },
  { text: '', color: '' },
  { text: '## Links', color: 'text-terminal-blue' },

  {
    label: 'GitHub',
    text: 'github.com/Mithul-varshan',
    href: 'https://github.com/Mithul-varshan',
    color: 'text-terminal-muted',
  },
  {
    label: 'LinkedIn',
    text: 'linkedin.com/in/mithulvarshan',
    href: 'https://linkedin.com/in/mithulvarshan',
    color: 'text-terminal-muted',
  },
]

export default function AboutView({ onClose }) {
  return (
    <div className="border border-terminal-border rounded p-4 my-2 bg-terminal-surface">
      <div className="flex justify-between items-center mb-3">
        <span className="text-terminal-muted text-xs">cat about.md</span>

        <button
          onClick={onClose}
          className="text-terminal-muted text-xs hover:text-terminal-red transition-colors"
        >
          [x] close
        </button>
      </div>

      <div className="space-y-0.5">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.1 }}
            className={`text-sm font-mono ${line.color}`}
          >
            {line.href ? (
              <span className="flex">
                <span className="w-24">{line.label}:</span>
                <a
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terminal-blue underline"
                >
                  {line.text}
                </a>
              </span>
            ) : (
              line.text || '\u00A0'
            )}
          </motion.p>
        ))}
      </div>
    </div>
  )
}