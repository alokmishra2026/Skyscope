import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, ZoomIn, ZoomOut, Info } from 'lucide-react'

const TelescopeSimulator = () => {
  const [selectedObject, setSelectedObject] = useState('Nebula')
  const [zoom, setZoom] = useState(1)

  const objects = [
    { name: 'Nebula', image: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg', description: 'A giant cloud of dust and gas in space. Some nebulae come from the gas and dust thrown out by the explosion of a dying star.' },
    { name: 'Andromeda', image: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001579/GSFC_20171208_Archive_e001579~medium.jpg', description: 'The closest large galaxy to the Milky Way and is one of only a few galaxies that can be seen from Earth with the naked eye.' },
    { name: 'Saturn', image: 'https://images-assets.nasa.gov/image/PIA01364/PIA01364~medium.jpg', description: 'The sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine times that of Earth.' }
  ]

  const current = objects.find(o => o.name === selectedObject)

  return (
    <div className="container mx-auto px-6 py-20 relative">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Telescope Viewport */}
        <div className="relative w-full lg:w-2/3 aspect-square max-w-2xl rounded-full overflow-hidden border-8 border-white/5 shadow-[0_0_100px_rgba(0,212,255,0.2)] bg-black group">
          <motion.div 
            animate={{ scale: zoom }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="w-full h-full"
          >
            <img 
              src={current.image} 
              alt={current.name} 
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
          {/* Overlay Vingette */}
          <div className="absolute inset-0 bg-radial-gradient(transparent_40%,_black_100%) pointer-events-none"></div>
          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <div className="w-full h-px bg-white/50"></div>
            <div className="h-full w-px bg-white/50 absolute"></div>
            <div className="w-20 h-20 rounded-full border border-white/50"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold neon-text mb-6 flex items-center"><Eye size={24} className="mr-3"/> DEEP SKY VIEW</h2>
            <div className="space-y-4">
              {objects.map(obj => (
                <button 
                  key={obj.name}
                  onClick={() => setSelectedObject(obj.name)}
                  className={`w-full p-4 flex items-center justify-between rounded-xl border transition-all ${selectedObject === obj.name ? 'border-space-accent bg-space-accent/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                >
                  <span className="font-bold">{obj.name}</span>
                  <Search size={16} className={selectedObject === obj.name ? 'text-space-accent' : 'text-gray-600'} />
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Digital Zoom</span>
              <div className="flex space-x-2">
                <button onClick={() => setZoom(z => Math.max(1, z - 0.5))} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"><ZoomOut size={18}/></button>
                <button onClick={() => setZoom(z => Math.min(4, z + 0.5))} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"><ZoomIn size={18}/></button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedObject}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-8 rounded-2xl border border-white/10 border-l-4 border-l-space-accent"
            >
              <h3 className="text-xl font-bold mb-4">Object Intel</h3>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                "{current.description}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default TelescopeSimulator
