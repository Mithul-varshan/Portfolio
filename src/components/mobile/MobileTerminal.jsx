import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useTerminal from '../../hooks/useTerminal'
import TerminalOutput from '../terminal/TerminalOutput'
import QuickCommands from './QuickCommands'
import AboutView from '../views/AboutView'
import ProjectsView from '../views/ProjectsView'
import SkillsView from '../views/SkillsView'
import ContactView from '../views/ContactView'

const VIEW_MAP = { about: AboutView, projects: ProjectsView, skills: SkillsView, contact: ContactView }

export default function MobileTerminal() {
  const bottomRef = useRef(null)
  const { history, activeView, setActiveView, runCommand, prompt } = useTerminal()
  const ActiveView = activeView ? VIEW_MAP[activeView] : null

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, activeView])

  return (
    <div className="flex flex-col h-screen bg-terminal-bg font-mono">
      <div className="flex items-center px-4 py-2 bg-terminal-surface border-b border-terminal-border">
        <span className="text-terminal-green text-sm font-bold">YOURNAME</span>
        <span className="text-terminal-muted text-xs ml-2">— portfolio</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <TerminalOutput history={history} />
        <AnimatePresence mode="wait">
          {ActiveView && (
            <motion.div key={activeView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ActiveView onClose={() => setActiveView(null)} />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <QuickCommands onCommand={runCommand} />
    </div>
  )
}