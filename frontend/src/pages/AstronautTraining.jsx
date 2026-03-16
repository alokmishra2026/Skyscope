import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from 'lucide-react'

const Station = () => {
  return (
    <group position={[0, 0, -10]}>
      <mesh>
        <cylinderGeometry args={[2, 2, 8, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#00d4ff" side={2} emissive="#00d4ff" emissiveIntensity={0.2} />
      </mesh>
      {/* Docking Port */}
      <mesh position={[0, 0, 4]}>
         <torusGeometry args={[0.5, 0.1, 16, 32]} />
         <meshStandardMaterial color="#ffcc00" />
      </mesh>
    </group>
  )
}

const Capsule = ({ position, setPosition }) => {
  const meshRef = useRef()

  return (
    <mesh ref={meshRef} position={position}>
      <coneGeometry args={[0.4, 1, 16]} rotation={[Math.PI / 2, 0, 0]} />
      <meshStandardMaterial color="#ffffff" />
      <pointLight intensity={0.5} distance={2} color="#00d4ff" />
    </mesh>
  )
}

const AstronautTraining = () => {
  const [pos, setPos] = useState([0, 0, 10])
  const [speed, setSpeed] = useState(0.05)

  const move = (dir) => {
    setPos(prev => {
      const newPos = [...prev]
      if (dir === 'up') newPos[1] += speed
      if (dir === 'down') newPos[1] -= speed
      if (dir === 'left') newPos[0] -= speed
      if (dir === 'right') newPos[0] += speed
      if (dir === 'forward') newPos[2] -= speed
      if (dir === 'backward') newPos[2] += speed
      return newPos
    })
  }

  return (
    <div className="h-[80vh] w-full relative bg-slate-950 overflow-hidden">
      <div className="absolute top-10 right-10 z-10 glass p-6 w-64">
        <h2 className="text-xl font-black tracking-tighter text-space-accent uppercase italic">Docking Simulation</h2>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">Manual RCS Controls Active</p>
        
        <div className="mt-8 space-y-4">
           <div className="flex justify-between text-[10px] font-bold">
              <span className="text-gray-400">DISTANCE</span>
              <span className="text-white">{(pos[2] + 6).toFixed(2)} M</span>
           </div>
           <div className="flex justify-between text-[10px] font-bold">
              <span className="text-gray-400">ALIGNMENT</span>
              <span className={Math.abs(pos[0]) < 0.2 && Math.abs(pos[1]) < 0.2 ? 'text-green-500' : 'text-red-500'}>
                 {Math.abs(pos[0]) < 0.2 && Math.abs(pos[1]) < 0.2 ? 'OPTIMAL' : 'CRITICAL'}
              </span>
           </div>
        </div>

        {/* Controls UI */}
        <div className="mt-10 grid grid-cols-3 gap-2">
           <div />
           <button onClick={() => move('up')} className="p-3 bg-white/5 border border-white/10 rounded flex justify-center"><ArrowUp size={20}/></button>
           <div />
           <button onClick={() => move('left')} className="p-3 bg-white/5 border border-white/10 rounded flex justify-center"><ArrowLeft size={20}/></button>
           <button onClick={() => move('forward')} className="p-3 bg-space-accent/20 border border-space-accent/50 rounded flex justify-center text-space-accent"><Zap size={20}/></button>
           <button onClick={() => move('right')} className="p-3 bg-white/5 border border-white/10 rounded flex justify-center"><ArrowRight size={20}/></button>
           <div />
           <button onClick={() => move('down')} className="p-3 bg-white/5 border border-white/10 rounded flex justify-center"><ArrowDown size={20}/></button>
           <div />
        </div>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 20]} fov={50} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={300} depth={50} count={10000} factor={4} saturation={0} fade speed={1} />
        <Suspense fallback={null}>
          <Station />
          <Capsule position={pos} />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>

      <div className="absolute bottom-10 left-10 text-[10px] font-black tracking-widest text-gray-600 uppercase">
         Simulation protocol: VYOM-DOC-ALPHA
      </div>
    </div>
  )
}

export default AstronautTraining
