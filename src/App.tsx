import { Rocket } from './components/Rocket'
import { Fireworks } from './components/Fireworks'
import { Overlay } from './components/Overlay'
import { Countdown } from './components/Countdown'
import { Leva } from 'leva'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Scene } from './components/Scene'

function App() {
  const [coords, setCoords] = useState<[number, number, number] | null>(null)
  const [isLocked, setIsLocked] = useState(true)
  
  // Target date: Jan 1, 2026 00:00:00 WIB (Jakarta, UTC+7)
  // Using ISO 8601 format with timezone offset for accurate WIB timezone
  const targetDate = new Date('2026-01-01T00:00:00+07:00')

  useEffect(() => {
    const checkDate = () => {
      const now = new Date()
      const locked = now < targetDate
      
      // Auto refresh when countdown completes (hits target date)
      if (!locked && isLocked) {
        window.location.reload()
      }
      
      setIsLocked(locked)
    }
    
    checkDate()
    const timer = setInterval(checkDate, 1000)
    return () => clearInterval(timer)
  }, [isLocked])

  return (
    <>
      <Leva />
      {!isLocked && <Overlay show={!!coords} onReload={() => setCoords(null)} />}
      {isLocked && <Countdown targetDate={targetDate} onComplete={() => {
        setIsLocked(false)
        window.location.reload()
      }} />}
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <color attach="background" args={['#1a0a1e']} />
        <Suspense fallback={null}>
          <Physics>
            <Scene />
            {coords ? (
              <Fireworks position={coords} />
            ) : (
              <Rocket onExplode={setCoords} disabled={isLocked} />
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
