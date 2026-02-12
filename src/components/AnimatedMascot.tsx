import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import type { Group, Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

function MascotModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/mascot.glb')
  const targetRotY = useRef(0)
  const targetRotX = useRef(0)

  // Add emissive orange glow to the model materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh
        const mat = mesh.material as MeshStandardMaterial
        if (mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 1.5
          // Add subtle emissive to darker parts
          if (mat.color && mat.color.r < 0.3) {
            mat.emissive = new THREE.Color('#FF6B2C')
            mat.emissiveIntensity = 0.05
          }
        }
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    
    // Slow auto-rotation
    targetRotY.current = mouseX * 0.3 + performance.now() * 0.0002
    targetRotX.current = mouseY * 0.15
    
    // Smooth lerp
    groupRef.current.rotation.y += (targetRotY.current - groupRef.current.rotation.y) * delta * 2
    groupRef.current.rotation.x += (targetRotX.current - groupRef.current.rotation.x) * delta * 2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={scene} scale={2} position={[0, -1.2, 0]} />
      </group>
    </Float>
  )
}

useGLTF.preload('/mascot.glb')

interface Props {
  className?: string
}

export default function AnimatedMascot({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Scroll entrance with GSAP
  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{ opacity: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 2]}
      >
        {/* Dramatic lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -3]} intensity={0.8} color="#FF6B2C" />
        <pointLight position={[0, 4, 2]} intensity={1} color="#FF6B2C" distance={10} />
        <pointLight position={[-3, -1, 3]} intensity={0.4} color="#00E5FF" distance={8} />
        <spotLight position={[0, 6, 0]} intensity={0.6} angle={0.5} penumbra={1} color="#FF6B2C" />

        <Suspense fallback={null}>
          <MascotModel mouseX={mousePos.x} mouseY={mousePos.y} />
          <Environment preset="city" environmentIntensity={0.4} />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={6} blur={2.5} color="#FF6B2C" />
        </Suspense>

        {/* Post-processing for premium glow */}
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
