import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MatrixBackground from './MatrixBackground'

const BOOT_LINES = [
  { text: 'BIOS v2.0 — PortfolioOS', delay: 0, color: 'text-terminal-muted' },
  { text: 'Initializing memory... OK', delay: 300, color: 'text-terminal-green' },
  { text: 'Loading kernel modules...', delay: 600, color: 'text-terminal-muted' },
  { text: 'Mounting filesystem... OK', delay: 900, color: 'text-terminal-green' },
  { text: 'Starting portfolio services...', delay: 1200, color: 'text-terminal-muted' },
  { text: '✓ React loaded', delay: 1500, color: 'text-terminal-green' },
  { text: '✓ Tailwind loaded', delay: 1700, color: 'text-terminal-green' },
  { text: '✓ Three.js loaded', delay: 1900, color: 'text-terminal-green' },
  { text: '✓ Framer Motion loaded', delay: 2100, color: 'text-terminal-green' },
  { text: '', delay: 2400 },
  { text: '████████████████████ 100%', delay: 2600, color: 'text-terminal-amber' },
  { text: '', delay: 2900 },
  { text: 'Welcome. Type help to begin.', delay: 3100, color: 'text-terminal-green' },
]

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [done, setDone] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

  useEffect(() => {
    const timers = [setTimeout(() => setShowAvatar(true), 200)]

    BOOT_LINES.forEach(({ text, delay, color }) => {
      timers.push(setTimeout(() => {
        setVisibleLines(l => [...l, { text, color }])
      }, delay))
    })

    timers.push(setTimeout(() => setDone(true), 3800))

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="relative flex items-center justify-center w-full h-screen bg-terminal-bg overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MatrixBackground />
          <div className="relative z-10 w-full max-w-2xl px-8 py-12">
            <div className="mb-8 text-center">
              <AnimatePresence>
                {showAvatar && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-2 border-terminal-green animate-pulse-slow" />
                      <img
                        src="/profile.jpeg"
                        alt="Mithul Varshan S K"
                        className="w-full h-full rounded-full object-cover grayscale contrast-125 opacity-90"
                        style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.95)' }}
                      />
                      <div className="absolute inset-0 rounded-full bg-terminal-green mix-blend-overlay opacity-10" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <h1 className="text-terminal-green text-2xl sm:text-4xl font-bold tracking-widest mb-1">MITHUL VARSHAN S K</h1>
              <p className="text-terminal-muted text-sm tracking-widest uppercase">Full Stack Developer</p>
            </div>
            <div className="space-y-1" aria-live="polite" aria-atomic="false">
              {visibleLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`text-sm font-mono ${line.color || 'text-terminal-text'}`}
                >
                  {line.text || '\u00A0'}
                </motion.p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setDone(true)}
              className="mt-8 text-xs text-terminal-muted hover:text-terminal-green transition-colors underline underline-offset-4"
            >
              skip boot sequence
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}