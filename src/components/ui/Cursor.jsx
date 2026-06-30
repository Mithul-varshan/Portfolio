export default function Cursor({ className = '' }) {
  return (
    <span
      className={`inline-block w-2 h-4 bg-terminal-green animate-blink align-middle ${className}`}
      aria-hidden="true"
    />
  )
}