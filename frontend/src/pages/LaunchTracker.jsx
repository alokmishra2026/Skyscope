import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, Clock, MapPin, Info } from 'lucide-react'

const LaunchTracker = () => {
  const [launches, setLaunches] = useState([
    { id: 1, mission: "Artemis III", rocket: "SLS Block 1", date: "2026-09-15T14:00:00Z", location: "KSC LC-39B", status: "Scheduled" },
    { id: 2, mission: "Starship Flight 5", rocket: "Starship", date: "2026-04-10T12:30:00Z", location: "Starbase, TX", status: "Testing" },
    { id: 3, mission: "Crew-10", rocket: "Falcon 9", date: "2026-05-22T08:45:00Z", location: "KSC LC-39A", status: "Pre-launch" }
  ])

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold neon-text mb-4">Rocket Launch Tracker</h1>
        <p className="text-gray-400 uppercase text-xs tracking-[0.3em] font-black">Global Launch Manifest & Countdown</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {launches.map((launch) => (
          <motion.div 
            key={launch.id}
            whileHover={{ scale: 1.02 }}
            className="glass p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-space-accent/20 rounded-lg flex items-center justify-center text-space-accent">
                  <Rocket size={24} />
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-space-accent/10 py-1 px-3 rounded text-space-accent border border-space-accent/20">
                  {launch.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{launch.mission}</h3>
              <p className="text-sm text-gray-400 mb-6 font-mono">{launch.rocket}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={14} className="mr-3 text-space-accent" />
                  <span>{new Date(launch.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin size={14} className="mr-3 text-space-accent" />
                  <span>{launch.location}</span>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-space-accent hover:text-space-dark rounded-xl font-black text-xs tracking-widest transition-all">
              VIEW LIVE STREAM
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LaunchTracker
