import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Info, Globe, Star, Zap, History, Map } from 'lucide-react'

const KnowledgeDatabase = () => {
  const [selected, setSelected] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const data = [
    { 
      id: 'mars', 
      type: 'Planet', 
      name: 'Mars', 
      desc: 'The Red Planet, known for its iron-oxide surface and potential for past life.',
      stats: { diameter: '6,779 km', gravity: '3.72 m/s²', day: '24h 37m', temp: '-65°C' },
      history: 'Named after the Roman god of war. Explored by numerous rovers including Curiosity and Perseverance.',
      img: 'https://images-assets.nasa.gov/image/PIA04591/PIA04591~medium.jpg'
    },
    { 
      id: 'andromeda', 
      type: 'Galaxy', 
      name: 'Andromeda', 
      desc: 'A spiral galaxy approximately 2.5 million light-years from Earth.',
      stats: { diameter: '220,000 ly', stars: '1 Trillion', type: 'Barred Spiral', dist: '2.5M ly' },
      history: 'First observed in 964 AD. It is on a collision course with the Milky Way.',
      img: 'https://images-assets.nasa.gov/image/PIA15416/PIA15416~medium.jpg'
    },
    { 
      id: 'blackhole', 
      type: 'Phenomenon', 
      name: 'Sagittarius A*', 
      desc: 'The supermassive black hole at the center of the Milky Way galaxy.',
      stats: { mass: '4.1M Suns', diameter: '24M km', type: 'Supermassive', spin: 'High' },
      history: 'Predicted by Einstein. Photographed by EHT in 2022.',
      img: 'https://images-assets.nasa.gov/image/PIA25175/PIA25175~medium.jpg'
    }
  ]

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar List */}
        <div className="w-full lg:w-80 space-y-6">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search Database..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-10 py-3 text-sm focus:border-space-accent focus:outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
           </div>

           <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {filteredData.map(item => (
                <button 
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`w-full text-left p-4 rounded border transition-all ${selected?.id === item.id ? 'bg-space-accent text-space-dark border-space-accent font-black' : 'bg-white/5 border-white/10 hover:border-space-accent/50'}`}
                >
                  <div className="text-[10px] font-bold uppercase opacity-60 mb-1">{item.type}</div>
                  <div className="text-lg tracking-tight">{item.name}</div>
                </button>
              ))}
           </div>
        </div>

        {/* Main Content Detail */}
        <div className="flex-1 glass p-10 min-h-[70vh] relative overflow-hidden">
           <AnimatePresence mode="wait">
              {selected ? (
                <motion.div 
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="md:w-1/2 rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                         <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:w-1/2">
                         <span className="inline-block bg-space-accent/10 text-space-accent text-[10px] font-black tracking-widest px-2 py-1 rounded mb-4 uppercase">
                            Vyomveda Entity {selected.id.toUpperCase()}
                         </span>
                         <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">{selected.name}</h2>
                         <p className="text-gray-400 leading-relaxed mb-6">{selected.desc}</p>
                         
                         <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selected.stats).map(([key, val]) => (
                               <div key={key} className="p-3 bg-white/5 border border-white/5 rounded">
                                  <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{key}</div>
                                  <div className="text-sm font-black text-white">{val}</div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                      <div>
                         <h3 className="text-xs font-black tracking-widest text-space-accent uppercase flex items-center mb-4">
                            <History size={16} className="mr-2" /> Discovery History
                         </h3>
                         <p className="text-xs text-gray-400 leading-relaxed">{selected.history}</p>
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-xs font-black tracking-widest text-space-accent uppercase flex items-center mb-4">
                            <Map size={16} className="mr-2" /> Quick Telemetry
                         </h3>
                         <div className="space-y-2">
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-space-accent w-[85%]" />
                            </div>
                            <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase">
                               <span>Signal Stability</span>
                               <span>85% OPTIMAL</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                   <Globe size={80} className="mb-6 animate-pulse" />
                   <h3 className="text-2xl font-black uppercase tracking-widest">Select an Entity</h3>
                   <p className="text-xs mt-2 uppercase font-bold tracking-tighter">Query the central galactic core database</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeDatabase
