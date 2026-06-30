export function parseCommand(input) {
  const trimmed = input.trim()
  if (!trimmed) return { command: '', args: [], raw: '' }

  const parts = trimmed.split(/\s+/)
  return {
    command: parts[0].toLowerCase(),
    args: parts.slice(1),
    raw: trimmed,
  }
}

export function matchesFile(args, fileName) {
  if (!args.length) return false
  return args.join(' ').toLowerCase().includes(fileName.toLowerCase())
}