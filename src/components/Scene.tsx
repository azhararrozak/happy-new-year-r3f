import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Stars } from '@react-three/drei'

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
      />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Ground */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[50, 0.5, 50]} position={[0, -0.5, 0]} />
        {/* <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#202020" />
        </mesh> */}
      </RigidBody>
    </>
  )
}
