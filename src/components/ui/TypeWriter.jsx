import { TypeAnimation } from 'react-type-animation'

export default function TypeWriter({ sequence, className = '', speed = 60 }) {
  return (
    <TypeAnimation
      sequence={sequence}
      speed={speed}
      className={`text-terminal-green font-mono ${className}`}
      cursor={false}
    />
  )
}