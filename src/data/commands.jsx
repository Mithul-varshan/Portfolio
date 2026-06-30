export const COMMANDS = {
  help: 'help',
  ls: 'ls',
  cat: 'cat',
  open: 'open',
  clear: 'clear',
  whoami: 'whoami',
  pwd: 'pwd',
  cd: 'cd',
  sudo: 'sudo',
  rm: 'rm',
  echo: 'echo',
  date: 'date',
  uname: 'uname',
}

export const HELP_TEXT = `
available commands:

  ls                  list files and directories
  cat about.md        display about me
  cat skills.txt      display my skills
  open projects/      browse my projects
  ./contact.sh        get in touch
  open resume.pdf     download my resume

  whoami              who am i?
  pwd                 current directory
  clear               clear terminal
  date                current date/time
  uname -a            system info

  hint: try sudo hire-me 👀
`

export const FILE_SYSTEM = {
  '/': ['about.md', 'skills.txt', 'resume.pdf', 'contact.sh', 'projects/'],
  '/projects': ['ecommerce-platform/', 'ai-chat-app/', 'devtools-extension/', 'portfolio-v1/'],
}