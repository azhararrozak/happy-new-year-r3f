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
  
  // Target date: Jan 1, 2026
  // Note: Month is 0-indexed in JS Date (0 = Jan)
  const targetDate = new Date(2025, 0, 1, 0, 0, 0)

  useEffect(() => {
    const checkDate = () => {
      const now = new Date()
      setIsLocked(now < targetDate)
    }
    
    checkDate()
    const timer = setInterval(checkDate, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Leva />
      {!isLocked && <Overlay show={!!coords} onReload={() => setCoords(null)} />}
      {isLocked && <Countdown targetDate={targetDate} onComplete={() => setIsLocked(false)} />}
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
