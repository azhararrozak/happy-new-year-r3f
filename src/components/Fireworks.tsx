import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FireworksProps {
    position: [number, number, number]
}

export function Fireworks({ position }: FireworksProps) {
    const count = 300 // More particles
    const meshRef = useRef<THREE.InstancedMesh>(null)
    // Warm color palette for fireworks
    const colors = useMemo(() => ['#ff4136', '#ff851b', '#ffd700', '#ffdc00'], [])
    
    // Initial particle data
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const speed = 0.2 + Math.random() * 0.8
            // Random direction in sphere
            const u = Math.random()
            const v = Math.random()
            const theta = 2 * Math.PI * u
            const phi = Math.acos(2 * v - 1)
            
            const velocity = new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta),
                Math.sin(phi) * Math.sin(theta),
                Math.cos(phi)
            ).multiplyScalar(speed)

            const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])

            temp.push({ 
                velocity, 
                position: new THREE.Vector3(0,0,0), 
                scale: 1,
                color,
                life: 1.0 + Math.random() * 0.5
            })
        }
        return temp
    }, [colors])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state, delta) => {
        if (!meshRef.current) return

        particles.forEach((particle, i) => {
            // Physics
            particle.position.add(particle.velocity)
            particle.velocity.y -= 0.005 // Gravity
            particle.velocity.multiplyScalar(0.98) // Drag
            
            // Life/Scale
            particle.life -= delta * 0.5
            const scale = Math.max(0, particle.life)

            dummy.position.copy(particle.position)
            dummy.scale.setScalar(scale)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
            meshRef.current!.setColorAt(i, particle.color)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
    )
}
