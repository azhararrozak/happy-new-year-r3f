interface OverlayProps {
    show?: boolean
    onReload?: () => void
}

export function Overlay({ show, onReload }: OverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Fluid main title sizing for mobile
        textShadow: '0 0 10px rgba(255,255,255,0.5)', 
        textAlign: 'center', 
        fontFamily: '"Righteous", cursive',
        padding: '0 1rem' // Mobile edge spacing
      }}>
        Rocket Launch Celebration
      </h1>
      
      {show && (
          <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'auto'
          }}>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 5rem)', // Fluid "Happy New Year" sizing
                color: '#ffd700', 
                textShadow: '0 0 20px rgba(255,215,0,0.8)', 
                fontFamily: '"Righteous", cursive',
                margin: '0 1rem' // Mobile edge spacing
              }}>
                  HAPPY NEW YEAR! 2026
              </h1>
              <button 
                onClick={onReload}
                style={{
                  marginTop: 'clamp(1rem, 3vw, 2rem)', // Responsive spacing
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)', // Fluid padding
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Fluid button text
                  backgroundColor: '#ffd700',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 'bold',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  minWidth: 'var(--touch-target-min)', // WCAG AAA touch target
                  minHeight: 'var(--touch-target-min)', // WCAG AAA touch target
                  touchAction: 'manipulation' // Prevent double-tap zoom on mobile
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.8)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)'
                }}
              >
                Play Again ↺
              </button>
          </div>
      )}

      {/* <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '20px', color: 'white', textAlign: 'center' }}>
        {!show ? "Tekan Roketnya!" : "🎉 Celebration! 🎉"}
      </p> */}
    </div>
  )
}
