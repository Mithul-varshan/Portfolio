import { useState, useCallback } from 'react'
import { parseCommand, matchesFile } from '../utils/commandParser'
import { checkEasterEgg } from '../utils/easterEggs'
import { HELP_TEXT, FILE_SYSTEM } from '../data/commands'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

const PROMPT = '~/portfolio $'

const initialHistory = [
  { type: 'system', text: 'portfolio v2.0 — type help for commands', id: 0 },
]

let idCounter = 1
const uid = () => idCounter++

export default function useTerminal() {
  const [history, setHistory] = useState(initialHistory)
  const [inputHistory, setInputHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeView, setActiveView] = useState(null)

  const pushLines = useCallback((lines) => {
    setHistory(h => [...h, ...lines.map(l => ({ ...l, id: uid() }))])
  }, [])

  const pushCommand = useCallback((raw) => {
    setHistory(h => [...h, { type: 'input', text: `${PROMPT} ${raw}`, id: uid() }])
  }, [])

  const runCommand = useCallback((raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setInputHistory(h => [trimmed, ...h])
    setHistoryIndex(-1)
    pushCommand(trimmed)

    // Easter eggs first
    const egg = checkEasterEgg(trimmed)
    if (egg) {
      egg.output.forEach(line => {
        setTimeout(() => pushLines([{ type: 'output', text: line.text, color: line.color }]), line.delay)
      })
      if (egg.action) egg.action()
      if (trimmed.toLowerCase().includes('hire-me')) {
        setTimeout(() => setActiveView('contact'), 2200)
      }
      return
    }

    const { command, args } = parseCommand(trimmed)

    switch (command) {
      case 'help':
        pushLines(HELP_TEXT.trim().split('\n').map(t => ({ type: 'output', text: t, color: 'muted' })))
        break

      case 'clear':
        setHistory([])
        setActiveView(null)
        break

      case 'ls': {
        const path = args[0] === 'projects/' || args[0] === 'projects' ? '/projects' : '/'
        const files = FILE_SYSTEM[path] || FILE_SYSTEM['/']
        pushLines(files.map(f => ({
          type: 'output',
          text: f.endsWith('/') ? `drwxr-xr-x  ${f}` : `-rw-r--r--  ${f}`,
          color: f.endsWith('/') ? 'blue' : 'green',
        })))
        break
      }

      case 'cat':
        if (matchesFile(args, 'about')) {
          setActiveView('about')
          pushLines([{ type: 'output', text: '→ rendering about.md...', color: 'muted' }])
        } else if (matchesFile(args, 'skills')) {
          setActiveView('skills')
          pushLines([{ type: 'output', text: '→ rendering skills.txt...', color: 'muted' }])
        } else {
          pushLines([{ type: 'output', text: `cat: ${args.join(' ')}: No such file`, color: 'red' }])
        }
        break

      case 'open':
        if (matchesFile(args, 'projects')) {
          setActiveView('projects')
          pushLines([{ type: 'output', text: '→ opening projects/...', color: 'muted' }])
        } else if (matchesFile(args, 'resume')) {
          pushLines([{ type: 'output', text: '→ downloading resume.pdf...', color: 'amber' }])
          setTimeout(() => window.open('/resume.pdf', '_blank'), 500)
        } else {
          pushLines([{ type: 'output', text: `open: ${args.join(' ')}: not found`, color: 'red' }])
        }
        break

      case './contact.sh':
      case 'contact':
        setActiveView('contact')
        pushLines([{ type: 'output', text: '→ loading contact.sh...', color: 'muted' }])
        break

      case 'whoami':
        pushLines([{ type: 'output', text: 'a developer who ships things that matter', color: 'green' }])
        break

      case 'pwd':
        pushLines([{ type: 'output', text: '/home/yourname/portfolio', color: 'green' }])
        break

      case 'date':
        pushLines([{ type: 'output', text: new Date().toString(), color: 'muted' }])
        break

      case 'uname':
        pushLines([{ type: 'output', text: 'PortfolioOS 2.0 — Built with React + passion', color: 'blue' }])
        break

      case 'cd':
        pushLines([{ type: 'output', text: args[0] === '..' ? '→ back to root' : `→ cd: ${args[0]}: use open command instead`, color: 'muted' }])
        break

      case 'echo':
        pushLines([{ type: 'output', text: args.join(' '), color: 'text' }])
        break

      default:
        pushLines([
          { type: 'output', text: `command not found: ${command}`, color: 'red' },
          { type: 'output', text: `type 'help' to see available commands`, color: 'muted' },
        ])
    }
  }, [pushLines, pushCommand])

  const navigateHistory = useCallback((direction) => {
    setHistoryIndex(i => {
      const next = direction === 'up'
        ? Math.min(i + 1, inputHistory.length - 1)
        : Math.max(i - 1, -1)
      return next
    })
  }, [inputHistory])

  return {
    history,
    inputHistory,
    historyIndex,
    activeView,
    setActiveView,
    runCommand,
    navigateHistory,
    prompt: PROMPT,
  }
}