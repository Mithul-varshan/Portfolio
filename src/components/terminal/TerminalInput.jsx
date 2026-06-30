import { useState, useRef, useEffect } from 'react'
import Cursor from '../ui/Cursor'

export default function TerminalInput({ prompt, onSubmit, inputHistory, historyIndex, onNavigate }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (historyIndex >= 0 && inputHistory[historyIndex]) {
      setValue(inputHistory[historyIndex])
    } else if (historyIndex === -1) {
      setValue('')
    }
  }, [historyIndex, inputHistory])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onNavigate('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onNavigate('down')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // basic autocomplete hints
      const cmds = ['help', 'ls', 'cat about.md', 'cat skills.txt', 'open projects/', './contact.sh']
      const match = cmds.find(c => c.startsWith(value))
      if (match) setValue(match)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-terminal-green text-sm whitespace-nowrap">{prompt}</span>
      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 bg-transparent text-terminal-text text-sm outline-none caret-transparent font-mono"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        <Cursor />
      </div>
    </div>
  )
}