import { useRef, useState, useEffect } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import * as THREE from 'three'
import { Html, Trail } from '@react-three/drei'

interface RocketProps {
    onExplode: (position: [number, number, number]) => void
    disabled?: boolean
}

export function Rocket({ onExplode, disabled }: RocketProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [exploded, setExploded] = useState(false)
  const [power, setPower] = useState(0)
  const meshRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useEffect(() => {
    // Reset camera position when Rocket mounts (restarts)
    camera.position.set(0, 5, 10)
    camera.lookAt(0, 4, 0)
  }, [camera])

  useFrame((state, delta) => {
    if (!rigidBodyRef.current || exploded) return

    const pos = rigidBodyRef.current.translation()
    
    // Apply power force
    if (power > 0) {
        rigidBodyRef.current.applyImpulse({ x: 0, y: power * delta * 50, z: 0 }, true)
        setPower(p => Math.max(0, p - delta * 2))
    }

    // Camera follow
    if (pos.y > 5) {
        const cameraTarget = new Vector3(pos.x, pos.y + 2, pos.z + 15)
        state.camera.position.lerp(cameraTarget, 0.1)
        state.camera.lookAt(pos.x, pos.y + 5, pos.z)
    }

    // Check for explosion height
    if (pos.y > 25) {
        setExploded(true)
        onExplode([pos.x, pos.y, pos.z])
    }
  })

  const addPower = () => {
    if (exploded || disabled) return
    setPower(p => p + 2)
    rigidBodyRef.current?.applyImpulse({ x: 0, y: 2, z: 0 }, true)
  }

  if (exploded) return null

  return (
    <RigidBody 
      ref={rigidBodyRef} 
      position={[0, 1, 0]} 
      colliders="hull" 
    //   restitution={0.5}
      lockRotations
    >
        <group onClick={addPower} ref={meshRef}>
            <Trail width={1.5} color="#ffa500" length={5} decay={2} local={false} stride={0} interval={1} target={meshRef}>
                <group>
                    {/* Rocket Body */}
                    <mesh castShadow receiveShadow position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.3, 0.5, 2, 32]} />
                        <meshStandardMaterial color="white" />
                    </mesh>
                    {/* Nose Cone */}
                    <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
                        <coneGeometry args={[0.3, 1, 32]} />
                        <meshStandardMaterial color="#ff4444" />
                    </mesh>
                    {/* Fins */}
                    <group>
                        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
                            <boxGeometry args={[1.5, 0.5, 0.1]} />
                            <meshStandardMaterial color="#ff4444" />
                        </mesh>
                        <mesh castShadow receiveShadow position={[0, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <boxGeometry args={[1.5, 0.5, 0.1]} />
                            <meshStandardMaterial color="#ff4444" />
                        </mesh>
                    </group>
                </group>
            </Trail>

            {/* Flame Effect when powered */}
            {power > 0.1 && (
                <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.2 + power * 0.05, 1 + power * 0.3, 16]} />
                    <meshBasicMaterial color="orange" transparent opacity={0.8} />
                </mesh>
            )}
        </group>
        
        {!disabled && (
            <Html position={[1.5, 1, 0]} center distanceFactor={10}>
                <div style={{ 
                    color: 'white', 
                    background: 'rgba(0,0,0,0.6)', 
                    padding: '8px 12px', 
                    borderRadius: '20px', 
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif'
                }}>
                    Tekan Roketnya!
                </div>
            </Html>
        )}
    </RigidBody>
  )
}
