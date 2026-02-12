import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Star shape for eyes (4-pointed)
function StarShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    const points = 4
    const outerRadius = 0.08
    const innerRadius = 0.03
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) s.moveTo(x, y)
      else s.lineTo(x, y)
    }
    s.closePath()
    return s
  }, [])
  
  return <extrudeGeometry args={[shape, { depth: 0.02, bevelEnabled: false }]} />
}

// Glowing seam line component
function SeamLine({ points, color = "#FF6B35" }: { points: [number, number, number][]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.3 + 0.7
      ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 2
    }
  })
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points])
  
  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 20, 0.01, 8, false]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

// Floating particle system
function Particles() {
  const count = 30
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ] as [number, number, number],
        speed: 0.1 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2
      })
    }
    return temp
  }, [])
  
  return (
    <group>
      {particles.map((particle, i) => (
        <FloatingParticle key={i} {...particle} />
      ))}
    </group>
  )
}

function FloatingParticle({ position, speed, offset }: { position: [number, number, number]; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed + offset) * 0.3
      ref.current.position.x = position[0] + Math.cos(clock.getElapsedTime() * speed * 0.5 + offset) * 0.2
    }
  })
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={3} />
    </mesh>
  )
}

// Main mascot mesh
function RoboMonkey() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Slow rotation animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5 // Full rotation every 12.56s (~12s)
    }
  })
  
  // Glossy black material
  const blackMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#0a0a0a"
      metalness={0.9}
      roughness={0.1}
    />
  ), [])
  
  // Orange glow material for joints
  const orangeGlow = useMemo(() => (
    <meshStandardMaterial
      color="#FF6B35"
      emissive="#FF6B35"
      emissiveIntensity={2}
    />
  ), [])
  
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={groupRef}>
        <Particles />
        
        {/* HEAD - Large sphere */}
        <group position={[0, 1, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            {blackMaterial}
          </mesh>
          
          {/* Segmented panel seams on head */}
          <SeamLine points={[
            [-0.5, 0, 0],
            [-0.3, 0.3, 0.3],
            [0, 0.5, 0],
            [0.3, 0.3, 0.3],
            [0.5, 0, 0]
          ]} />
          <SeamLine points={[
            [0, 0.5, 0],
            [0, 0.3, -0.4],
            [0, 0, -0.5]
          ]} />
          
          {/* EARS - Half spheres on sides */}
          <group position={[-0.45, 0.1, 0]}>
            <mesh>
              <sphereGeometry args={[0.15, 16, 16, 0, Math.PI]} />
              {blackMaterial}
            </mesh>
            {/* Orange ring seam at base */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.15, 0.01, 8, 24]} />
              {orangeGlow}
            </mesh>
          </group>
          
          <group position={[0.45, 0.1, 0]} rotation={[0, Math.PI, 0]}>
            <mesh>
              <sphereGeometry args={[0.15, 16, 16, 0, Math.PI]} />
              {blackMaterial}
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.15, 0.01, 8, 24]} />
              {orangeGlow}
            </mesh>
          </group>
          
          {/* EYES - 4-pointed white stars with emissive glow */}
          <mesh position={[-0.18, 0.1, 0.42]}>
            <StarShape />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
          </mesh>
          <mesh position={[0.18, 0.1, 0.42]}>
            <StarShape />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
          </mesh>
          
          {/* MUZZLE - Small dark plate */}
          <mesh position={[0, -0.15, 0.45]}>
            <boxGeometry args={[0.2, 0.15, 0.05]} />
            <meshStandardMaterial color="#050505" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* NOSE - Tiny nub */}
          <mesh position={[0, -0.12, 0.48]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
        </group>
        
        {/* BODY/TORSO - Compact barrel */}
        <group position={[0, 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.35, 0.3, 0.6, 24]} />
            {blackMaterial}
          </mesh>
          
          {/* Vertical orange seam down center chest */}
          <SeamLine points={[
            [0, 0.3, 0.35],
            [0, 0, 0.35],
            [0, -0.3, 0.3]
          ]} />
          
          {/* Pectoral panel definition seams */}
          <SeamLine points={[
            [-0.15, 0.15, 0.32],
            [-0.25, 0, 0.3],
            [-0.2, -0.15, 0.28]
          ]} />
          <SeamLine points={[
            [0.15, 0.15, 0.32],
            [0.25, 0, 0.3],
            [0.2, -0.15, 0.28]
          ]} />
        </group>
        
        {/* LEFT ARM */}
        <group position={[-0.5, 0.35, 0]}>
          {/* Ball joint shoulder */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            {orangeGlow}
          </mesh>
          
          {/* Upper arm */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          
          {/* Elbow joint */}
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            {orangeGlow}
          </mesh>
          
          {/* Lower arm */}
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          
          {/* Fist */}
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {blackMaterial}
          </mesh>
        </group>
        
        {/* RIGHT ARM (mirror of left) */}
        <group position={[0.5, 0.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            {orangeGlow}
          </mesh>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            {orangeGlow}
          </mesh>
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {blackMaterial}
          </mesh>
        </group>
        
        {/* LEFT LEG */}
        <group position={[-0.15, -0.15, 0]}>
          {/* Upper leg */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          
          {/* Knee joint */}
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {orangeGlow}
          </mesh>
          
          {/* Lower leg */}
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          
          {/* Foot/boot */}
          <mesh position={[0, -0.62, 0.05]}>
            <boxGeometry args={[0.12, 0.1, 0.18]} />
            {blackMaterial}
          </mesh>
        </group>
        
        {/* RIGHT LEG (mirror) */}
        <group position={[0.15, -0.15, 0]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            {orangeGlow}
          </mesh>
          <mesh position={[0, -0.45, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.25, 16]} />
            {blackMaterial}
          </mesh>
          <mesh position={[0, -0.62, 0.05]}>
            <boxGeometry args={[0.12, 0.1, 0.18]} />
            {blackMaterial}
          </mesh>
        </group>
        
        {/* TAIL - Segmented mechanical tail */}
        <group position={[0, 0, -0.25]} rotation={[0.3, 0.2, 0]}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <group key={i}>
              {/* Tail segment */}
              <mesh position={[
                i * 0.08 * Math.cos(i * 0.3),
                0.1 - i * 0.05,
                -i * 0.08 * Math.sin(i * 0.3)
              ]} rotation={[i * 0.15, i * 0.1, 0]}>
                <cylinderGeometry args={[0.04 - i * 0.003, 0.04 - i * 0.003, 0.06, 12]} />
                {blackMaterial}
              </mesh>
              
              {/* Orange glowing gap between segments */}
              {i < 6 && (
                <mesh position={[
                  (i + 0.5) * 0.08 * Math.cos((i + 0.5) * 0.3),
                  0.1 - (i + 0.5) * 0.05,
                  -(i + 0.5) * 0.08 * Math.sin((i + 0.5) * 0.3)
                ]} rotation={[i * 0.15, i * 0.1, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
                  {orangeGlow}
                </mesh>
              )}
            </group>
          ))}
        </group>
      </group>
    </Float>
  )
}

// Main component
export default function Mascot3D({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} />
        <pointLight position={[0, 2, 2]} intensity={1} color="#FF6B35" />
        
        <RoboMonkey />
        
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
