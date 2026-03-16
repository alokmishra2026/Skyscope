import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Calendar, ZoomIn, Info, Download } from 'lucide-react'

const EarthViewer = () => {
  const [image, setImage] = useState('https://epic.gsfc.nasa.gov/archive/natural/2023/05/20/png/epic_1b_20230520002135.png')
  const [date, setDate] = useState('2023-05-20')

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="glass p-4 rounded-3xl border border-white/10 overflow-hidden relative group">
             <motion.img 
               key={image}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               src={image} 
               className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
               alt="Earth from Space"
             />
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="glass p-4 rounded-xl text-[10px] font-black tracking-widest uppercase">
                   DSCOVR · EPIC INSTRUMENT · 1.5M KM
                </div>
                <button className="p-3 bg-space-accent text-space-dark rounded-full shadow-lg">
                   <Download size={20} />
                </button>
             </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-8">
           <div className="glass p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-space-accent/5 to-transparent">
              <h2 className="text-3xl font-bold neon-text mb-6 flex items-center tracking-tighter">
                 <Globe className="mr-3 text-space-accent" /> EARTH VIEW
              </h2>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                 Real-time high-resolution imagery of Earth captured by the EPIC instrument on the DSCOVR satellite.
              </p>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Observation Date</label>
                    <div className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                       <Calendar size={18} className="mr-3 text-space-accent" />
                       <input 
                         type="date" 
                         value={date} 
                         onChange={(e) => setDate(e.target.value)}
                         className="bg-transparent border-none outline-none text-white text-sm w-full"
                       />
                    </div>
                 </div>

                 <button className="w-full py-4 bg-space-accent text-space-dark font-black tracking-[.2em] uppercase text-xs rounded-xl shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                    REFRESH TELEMETRY
                 </button>
              </div>
           </div>

           <div className="glass p-8 rounded-2xl border border-white/10 flex items-start space-x-4">
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                 <Info size={20} />
              </div>
              <div>
                 <h4 className="font-bold text-sm mb-1 uppercase tracking-tight">System Notice</h4>
                 <p className="text-[10px] text-gray-500 leading-normal">
                    Satellite lag may occur during solar flares or antenna reorientation. 
                    Data provided by NASA GSFC EPIC team.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default EarthViewer
