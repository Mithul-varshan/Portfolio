import toast from 'react-hot-toast'

export const EASTER_EGGS = {
  'sudo hire-me': {
    output: [
      { text: '[sudo] password for recruiter: ••••••••', color: 'muted', delay: 0 },
      { text: 'Authenticating...', color: 'amber', delay: 600 },
      { text: '✓ Access granted. Great taste confirmed.', color: 'green', delay: 1200 },
      { text: '→ Redirecting you to contact form...', color: 'blue', delay: 1800 },
    ],
    action: () => {
      setTimeout(() => toast('Opening contact... 🚀'), 2000)
    },
  },
  'rm -rf life': {
    output: [
      { text: 'rm: cannot remove life: Permission denied', color: 'red', delay: 0 },
      { text: 'hint: life is read-only. keep going.', color: 'muted', delay: 400 },
    ],
  },
  'git commit -m "fix everything"': {
    output: [
      { text: '[main 🔥] fix everything', color: 'green', delay: 0 },
      { text: '1 file changed, ∞ insertions(+), 0 deletions(-)', color: 'muted', delay: 300 },
    ],
  },
  'exit': {
    output: [
      { text: 'Nice try. You cannot leave.', color: 'red', delay: 0 },
      { text: '(Just kidding. But seriously, hire me first.)', color: 'muted', delay: 400 },
    ],
  },
}

export function checkEasterEgg(raw) {
  return EASTER_EGGS[raw.toLowerCase()] || null
}