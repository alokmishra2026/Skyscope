import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { MoveRight, Sparkles } from 'lucide-react'

const Sphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00d4ff"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  )
}

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sphere />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-space-accent/10 border border-space-accent/20 text-space-accent text-xs font-bold mb-6 tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            <span>Real-time Space AI Research Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
            EXPLORE THE <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-space-accent via-white to-space-nebula animate-pulse">
              FINAL FRONTIER
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vyomveda Skyscope uses advanced AI to bring the mysteries of the cosmos to your fingertips. 
            Automated research, 3D exploration, and interactive gaming.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button className="group relative px-8 py-4 bg-space-accent text-space-dark font-black rounded-sm overflow-hidden transition-all hover:pr-12">
              <span className="relative z-10">START EXPLORING</span>
              <MoveRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/10 transition-colors font-bold tracking-widest text-xs">
              VIEW LATEST MISSIONS
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats/Ticker */}
      <div className="absolute bottom-10 left-0 w-full flex justify-around items-center px-10 text-xs tracking-[0.3em] font-medium text-gray-500 uppercase overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex space-x-20">
           <span>NASA LIVE DATA: ACTIVE</span>
           <span>JPL DATABASE: CONNECTED</span>
           <span>ACTIVE MISSIONS: 154</span>
           <span>EXOPLANETS DISCOVERED: 5,200+</span>
           <span>MARS WEATHER: -65°C</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
