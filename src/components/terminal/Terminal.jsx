import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useTerminal from '../../hooks/useTerminal'
import TerminalInput from './TerminalInput'
import TerminalOutput from './TerminalOutput'
import AboutView from '../views/AboutView'
import ProjectsView from '../views/ProjectsView'
import SkillsView from '../views/SkillsView'
import ContactView from '../views/ContactView'

const VIEW_MAP = {
  about: AboutView,
  projects: ProjectsView,
  skills: SkillsView,
  contact: ContactView,
}

export default function Terminal() {
  const bottomRef = useRef(null)
  const { history, inputHistory, historyIndex, activeView, setActiveView, runCommand, navigateHistory, prompt } = useTerminal()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, activeView])

  useEffect(() => {
    if (activeView) {
      document.title = `Mithul Varshan S K | ${activeView.charAt(0).toUpperCase() + activeView.slice(1)}`
    } else {
      document.title = 'Mithul Varshan S K — Full Stack Developer Portfolio'
    }
  }, [activeView])

  const ActiveView = activeView ? VIEW_MAP[activeView] : null

  return (
    <div className="flex flex-col h-screen bg-terminal-bg text-terminal-text font-mono">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-terminal-surface border-b border-terminal-border select-none">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        </div>
        <span className="flex-1 text-center text-xs text-terminal-muted">portfolio — bash — 120×40</span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        <TerminalOutput history={history} />
        <AnimatePresence mode="wait">
          {ActiveView && (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveView onClose={() => setActiveView(null)} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-terminal-border px-4 py-3">
        <TerminalInput
          prompt={prompt}
          onSubmit={runCommand}
          inputHistory={inputHistory}
          historyIndex={historyIndex}
          onNavigate={navigateHistory}
        />
      </div>
    </div>
  )
}