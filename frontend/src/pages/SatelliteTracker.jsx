import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

const Satellite = ({ orbitRadius, speed, name, color }) => {
  const meshRef = useRef()
  const [position, setPosition] = useState([orbitRadius, 0, 0])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    const x = Math.cos(t) * orbitRadius
    const z = Math.sin(t) * orbitRadius
    meshRef.current.position.set(x, 0, z)
  })

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#00d4ff" side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="bg-black/80 text-[8px] p-1 border border-space-accent text-white uppercase font-bold whitespace-nowrap">
          {name}
        </div>
      </Html>
    </group>
  )
}

const SatelliteTracker = () => {
  const [satellites, setSatellites] = useState([])

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/satellites/live')
        const data = await response.json()
        setSatellites(data)
      } catch (error) {
        console.error("Error fetching satellites:", error)
        // Fallback data
        setSatellites([
          {id: 1, name: "ISS", alt: 408, velocity: 7.66},
          {id: 2, name: "STARLINK-4211", alt: 550, velocity: 7.5}
        ])
      }
    }
    fetchSatellites()
    const interval = setInterval(fetchSatellites, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[80vh] w-full relative bg-black">
      <div className="absolute top-10 left-10 z-10 glass p-6 max-w-xs">
        <h2 className="text-2xl font-black tracking-tighter text-space-accent uppercase leading-none">Live Satellite Tracking</h2>
        <p className="text-[10px] text-gray-500 mt-2 tracking-widest uppercase font-bold">Orbital Telemetry Data Stream</p>
        
        <div className="mt-8 space-y-4">
          {satellites.map(sat => (
            <div key={sat.id} className="p-3 bg-white/5 border border-white/10 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-gray-400">{sat.name}</span>
                <span className="text-green-500 text-[10px] font-black animate-pulse">ACTIVE</span>
              </div>
              <div className="text-sm font-bold tracking-tight">ALTITUDE: {sat.alt} KM</div>
              <div className="text-[10px] text-gray-500">VELOCITY: {sat.velocity} KM/S</div>
            </div>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[100, 100, 100]} intensity={1.5} />
        <Suspense fallback={null}>
          <Stars radius={300} depth={60} count={15000} factor={6} saturation={0} fade speed={1} />
          
          {/* Earth */}
          <Sphere args={[5, 64, 64]}>
            <meshStandardMaterial 
              color="#1a1a1a" 
              wireframe 
              emissive="#004466"
              emissiveIntensity={0.5}
            />
          </Sphere>

          {/* Satellites */}
          <Satellite orbitRadius={8} speed={0.5} name="ISS" color="#ffffff" />
          <Satellite orbitRadius={10} speed={0.8} name="STARLINK-1" color="#00d4ff" />
          <Satellite orbitRadius={12} speed={0.3} name="HUBBLE" color="#7d5fff" />
          <Satellite orbitRadius={15} speed={1.2} name="GPS-III" color="#ff3e00" />
          
          {/* Orbit Paths */}
          {[8, 10, 12, 15].map(radius => (
            <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
              <meshBasicMaterial color="white" transparent opacity={0.05} />
            </mesh>
          ))}
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  )
}

export default SatelliteTracker
