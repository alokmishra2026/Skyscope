import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { motion } from 'framer-motion'

const Planet = ({ color, size, speed, distort, position, name }) => {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={distort}
          radius={1}
        />
      </mesh>
      <mesh position={[position[0], position[1] - (size + 0.5), position[2]]}>
        <planeGeometry args={[2, 0.5]} />
        <meshBasicMaterial transparent opacity={0} />
        {/* Label could be added here with Html component */}
      </mesh>
    </Float>
  )
}

const SpaceExplorer = () => {
  return (
    <div className="h-[85vh] w-full relative mt-6">
      <div className="absolute top-10 left-10 z-10 glass p-6 max-w-xs">
        <h2 className="text-2xl font-black tracking-tighter text-space-accent">INTERACTIVE EXPLORER</h2>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          Use your mouse to rotate and zoom. Click on planetary bodies to retrieve detailed AI telemetry.
        </p>
        <div className="mt-6 space-y-2">
          {['Sun', 'Mercury', 'Venus', 'Earth', 'Mars'].map(p => (
            <div key={p} className="flex items-center justify-between p-2 border border-white/5 hover:bg-space-accent/10 cursor-pointer transition-colors text-[10px] font-bold uppercase tracking-widest">
              <span>{p}</span>
              <span className="text-space-accent">TRACKING</span>
            </div>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={10} color="#ffcc00" />
        <Suspense fallback={null}>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
          
          {/* Sun */}
          <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#ffcc00" />
          </Sphere>

          {/* Earth */}
          <Planet 
            color="#2277ff" 
            size={0.8} 
            speed={1.5} 
            distort={0.2} 
            position={[8, 0, 0]} 
            name="Earth" 
          />

          {/* Mars */}
          <Planet 
            color="#ff4422" 
            size={0.6} 
            speed={2} 
            distort={0.4} 
            position={[12, 2, -5]} 
            name="Mars" 
          />

        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>

      <div className="absolute bottom-10 right-10 glass p-4 text-[10px] tracking-widest uppercase font-bold text-gray-500">
         VIEWPORT: 3D_WEBGL_ACCELERATED
      </div>
    </div>
  )
}

export default SpaceExplorer
