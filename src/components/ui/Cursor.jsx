export default function Cursor({ className = '', style = {} }) {
  return (
    <span
      style={style}
      className={`pointer-events-none absolute w-2 h-5 bg-terminal-green animate-blink ${className}`}
      aria-hidden="true"
    />
  )
}