import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { Group } from 'three'

function MascotModel() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/mascot.glb')

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.8} position={[0, -1, 0]} />
    </group>
  )
}

useGLTF.preload('/mascot.glb')

export default function Mascot3DViewer() {
  return (
    <div className="w-56 h-56 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] mx-auto relative z-10">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        style={{ pointerEvents: 'auto' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#ff6b2c" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#ff6b2c" />

        <Suspense fallback={null}>
          <MascotModel />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          autoRotate={false}
        />

        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
