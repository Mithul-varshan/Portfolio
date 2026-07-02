# TerminalOS Portfolio

A developer portfolio that works like a real terminal — type commands to explore projects, skills, and get in touch. Built with React, Tailwind CSS v4, Framer Motion, and Three.js.

---

## Preview

> Boot screen → matrix background → terminal prompt → command-driven navigation

```
~/portfolio $ help

  ls                  list files and directories
  cat about.md        display about me
  cat skills.txt      display my skills
  open projects/      browse my projects
  ./contact.sh        get in touch
  open resume.pdf     download resume

  hint: try sudo hire-me 👀
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Background | Three.js (matrix canvas) |
| Typewriter | react-type-animation |
| Email | EmailJS |
| Notifications | react-hot-toast |
| Icons | Lucide React |

---

## Features

- **Boot sequence** — animated BIOS-style startup with matrix background and avatar
- **Full terminal interface** — real command parsing, input history (↑↓), Tab autocomplete
- **Command-driven navigation** — `cat`, `ls`, `open`, `./contact.sh` and more
- **Inline panels** — about, projects, skills, and contact animate in without any page reload
- **Easter eggs** — try `sudo hire-me`, `rm -rf life`, `exit` and others
- **Mobile layout** — tap-to-run quick command bar, same dark aesthetic
- **Contact form** — powered by EmailJS, no backend required
- **Resume download** — `open resume.pdf` opens it in a new tab
- **CRT scanline overlay** — subtle retro effect across the entire UI

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [EmailJS](https://www.emailjs.com) account (free tier is enough)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from your EmailJS dashboard → Email Services + Email Templates.

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── data/
│   ├── commands.js       # terminal commands + help text
│   ├── projects.js       # your project list
│   └── skills.js         # skills by category
├── hooks/
│   ├── useTerminal.js    # terminal state + command parser
│   └── useIsMobile.js    # viewport detection
├── components/
│   ├── boot/
│   │   ├── BootScreen.jsx
│   │   └── MatrixBackground.jsx
│   ├── terminal/
│   │   ├── Terminal.jsx
│   │   ├── TerminalInput.jsx
│   │   ├── TerminalOutput.jsx
│   │   └── CommandLine.jsx
│   ├── mobile/
│   │   ├── MobileTerminal.jsx
│   │   └── QuickCommands.jsx
│   ├── views/
│   │   ├── AboutView.jsx
│   │   ├── ProjectsView.jsx
│   │   ├── SkillsView.jsx
│   │   └── ContactView.jsx
│   └── ui/
│       ├── Cursor.jsx
│       ├── TypeWriter.jsx
│       └── Scanline.jsx
└── utils/
    ├── commandParser.js
    └── easterEggs.js
```

---

## Personalising

| File | What to update |
|---|---|
| `src/data/projects.js` | Your projects, links, tech stack |
| `src/data/skills.js` | Your skills by category |
| `src/components/views/AboutView.jsx` | Your name, role, location, links |
| `src/components/boot/BootScreen.jsx` | Your name in the hero |
| `public/avatar.jpg` | Your profile photo (square, min 300×300px) |
| `public/resume.pdf` | Your resume |
| `.env` | EmailJS credentials |

---

## Available Commands

| Command | What it does |
|---|---|
| `help` | Lists all commands |
| `ls` | Lists files in current directory |
| `ls projects/` | Lists all projects |
| `cat about.md` | Shows about panel |
| `cat skills.txt` | Shows skills panel |
| `open projects/` | Opens projects panel |
| `open resume.pdf` | Opens resume in new tab |
| `./contact.sh` | Opens contact form |
| `whoami` | Short bio line |
| `pwd` | Current path |
| `date` | Current date and time |
| `uname -a` | System info |
| `clear` | Clears the terminal |
| `echo <text>` | Prints text |
| `sudo hire-me` | 👀 |

---

## Deploying

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add your `.env` variables in the Vercel dashboard under **Settings → Environment Variables**.

### Netlify

```bash
npm run build
# drag and drop the dist/ folder into Netlify, or connect via GitHub
```

Add environment variables under **Site Settings → Environment Variables**.

---

## EmailJS Setup

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Message: {{message}}
   ```
4. Copy your **Service ID**, **Template ID**, and **Public Key** into `.env`

---

## License

MIT — free to use, adapt, and make your own. A credit or a star is appreciated but not required.

---

## Author

**Your Name**
[GitHub](https://github.com/yourusername) · [LinkedIn](https://linkedin.com/in/yourname) · [Portfolio](https://yourportfolio.com)

---

> Built with too much caffeine and a love for the command line.