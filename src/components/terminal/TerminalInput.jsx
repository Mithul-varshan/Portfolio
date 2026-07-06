import { useState, useRef, useEffect } from 'react'
import Cursor from '../ui/Cursor'

export default function TerminalInput({
  prompt,
  onSubmit,
  inputHistory,
  historyIndex,
  onNavigate
}) {
  const [value, setValue] = useState('')
  const [cursorX, setCursorX] = useState(0)

  const inputRef = useRef(null)
  const measureRef = useRef(null)

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

  const updateCursor = () => {
    requestAnimationFrame(() => {
      if (!measureRef.current || !inputRef.current) return

      const caret = inputRef.current.selectionStart || 0
      measureRef.current.textContent = value.substring(0, caret)

      setCursorX(measureRef.current.offsetWidth)
    })
  }

  useEffect(() => {
    updateCursor()
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(value)
      setValue('')
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onNavigate('up')
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onNavigate('down')
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()

      const cmds = [
        'help',
        'ls',
        'cat about.md',
        'cat skills.txt',
        'open projects/',
        './contact.sh'
      ]

      const match = cmds.find(c => c.startsWith(value))

      if (match) {
        setValue(match)
      }

      return
    }

    requestAnimationFrame(updateCursor)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-terminal-green text-sm whitespace-nowrap">
        {prompt}
      </span>

      <div
        className="relative flex-1"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Hidden text measurer */}
        <span
          ref={measureRef}
          className="absolute invisible whitespace-pre font-mono text-sm"
        />

        {/* Custom Cursor */}
        <Cursor
          style={{
            left: `${cursorX}px`,
            top: '2px'
          }}
        />

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            updateCursor()
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          className="w-full bg-transparent text-terminal-text text-sm font-mono outline-none caret-transparent"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}