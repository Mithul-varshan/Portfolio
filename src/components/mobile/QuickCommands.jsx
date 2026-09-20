const QUICK_CMDS = [
  { label: 'about',    cmd: 'cat about.md' },
  { label: 'projects', cmd: 'open projects/' },
  { label: 'skills',   cmd: 'cat skills.txt' },
  { label: 'contact',  cmd: './contact.sh' },
  { label: 'help',     cmd: 'help' },
]

export default function QuickCommands({ onCommand }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-3 py-2 border-t border-terminal-border bg-terminal-surface">
      {QUICK_CMDS.map(({ label, cmd }) => (
        <button
          key={label}
          onClick={() => onCommand(cmd)}
          className="flex-shrink-0 text-xs font-mono text-terminal-green border border-terminal-green-dark bg-terminal-bg px-3 py-1.5 rounded hover:bg-terminal-green hover:text-terminal-bg transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  )
}