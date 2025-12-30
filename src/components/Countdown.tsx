import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: Date
  onComplete: () => void
}

export function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date()
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calculateTimeLeft()
      setTimeLeft(tl)
      
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        onComplete()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
      pointerEvents: 'none',
      padding: '1rem', // Mobile edge spacing
    }}>
      <h2 style={{ 
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Fluid typography for mobile (375px-768px)
        color: '#ffd700', 
        marginBottom: '1rem', 
        textShadow: '0 0 10px rgba(255, 215, 0, 0.5)', 
        fontFamily: '"Righteous", cursive',
        textAlign: 'center'
      }}>
        Countdown to 2026
      </h2>
      <div style={{ 
        display: 'flex', 
        gap: 'clamp(1rem, 4vw, 2rem)', // Responsive gap
        flexWrap: 'wrap', // Allow wrapping on very small screens
        justifyContent: 'center'
      }}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 4rem)', // Fluid number sizing
              fontWeight: 'bold', 
              color: 'white', 
              textShadow: '0 0 20px rgba(255,255,255,0.5)', 
              fontFamily: '"Poppins", sans-serif',
              lineHeight: 1
            }}>
              {value.toString().padStart(2, '0')}
            </span>
            <span style={{ 
              color: '#aaa', 
              textTransform: 'uppercase', 
              fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', // Fluid label sizing
              letterSpacing: '2px', 
              fontFamily: '"Poppins", sans-serif' 
            }}>
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
