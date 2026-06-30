import CommandLine from './CommandLine'

export default function TerminalOutput({ history }) {
  return (
    <div className="space-y-0.5">
      {history.map(line => (
        <CommandLine key={line.id} line={line} />
      ))}
    </div>
  )
}