import { motion } from 'framer-motion'

const COLOR_MAP = {
  green:  'text-terminal-green',
  amber:  'text-terminal-amber',
  red:    'text-terminal-red',
  blue:   'text-terminal-blue',
  muted:  'text-terminal-muted',
  text:   'text-terminal-text',
  system: 'text-terminal-green',
  input:  'text-terminal-text',
}

export default function CommandLine({ line }) {
  const colorClass = COLOR_MAP[line.color] || COLOR_MAP[line.type] || 'text-terminal-text'

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      className={`text-sm font-mono leading-relaxed whitespace-pre-wrap ${colorClass}`}
    >
      {line.text || '\u00A0'}
    </motion.div>
  )
}