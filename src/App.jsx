import { useState } from 'react'
import BootScreen from './components/boot/BootScreen'
import Terminal from './components/terminal/Terminal'
import MobileTerminal from './components/mobile/MobileTerminal'
import Scanline from './components/ui/Scanline'
import useIsMobile from './hooks/useIsMobile'

export default function App() {
  const [booted, setBooted] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <Scanline />
      {!booted
        ? <BootScreen onComplete={() => setBooted(true)} />
        : isMobile
          ? <MobileTerminal />
          : <Terminal />
      }
    </>
  )
}