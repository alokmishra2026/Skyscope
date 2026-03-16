import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Radio, Milestone, Timer, Satellite, MapPin } from 'lucide-react'

const StatBox = ({ label, value, unit, icon: Icon, color }) => (
  <div className="glass p-6 border-l-4" style={{ borderColor: color }}>
     <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">{label}</span>
        <Icon size={18} className="text-gray-500" />
     </div>
     <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-black tracking-tighter">{value}</span>
        <span className="text-xs font-bold text-gray-500 uppercase">{unit}</span>
     </div>
  </div>
)

const Dashboard = () => {
  const [stats, setStats] = React.useState({
    satellites: "8,245",
    missions: "42",
    velocity: "27,562"
  })

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/satellites/live')
        const data = await response.json()
        setStats(prev => ({
          ...prev,
          satellites: (8000 + data.length).toLocaleString(),
          missions: (40 + data.length).toString()
        }))
      } catch (error) {
        console.error("Dashboard Stats Error:", error)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <StatBox label="Satellites in Orbit" value={stats.satellites} unit="Active" icon={Satellite} color="#00d4ff" />
        <StatBox label="Next Launch T-Minus" value="14:22:05" unit="HH:MM:SS" icon={Timer} color="#7d5fff" />
        <StatBox label="ISS Velocity" value={stats.velocity} unit="KM/H" icon={Activity} color="#ff3e00" />
        <StatBox label="Active Missions" value={stats.missions} unit="Global" icon={Milestone} color="#00ff88" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Timeline */}
        <div className="lg:col-span-2 glass p-8">
           <h3 className="text-xl font-black mb-8 flex items-center space-x-3 tracking-tighter">
              <Radio className="text-space-accent animate-pulse" />
              <span>LIVE MISSION TIMELINE</span>
           </h3>
           <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {[
                { time: "T+ 05:22", event: "Stage 2 Separation Successful", status: "Done" },
                { time: "T+ 08:45", event: "Orbital Insertion Phase", status: "Active" },
                { time: "T+ 12:00", event: "Satellite Deployment", status: "Scheduled" }
              ].map((item, idx) => (
                <div key={idx} className="flex space-x-6 relative">
                   <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ${item.status === 'Active' ? 'bg-space-accent animate-pulse shadow-[0_0_15px_rgba(0,212,255,0.5)]' : 'bg-white/10'}`}>
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                   </div>
                   <div>
                      <span className="text-[10px] font-black text-space-accent">{item.time}</span>
                      <h4 className="text-lg font-bold tracking-tight">{item.event}</h4>
                      <p className="text-xs text-gray-500 uppercase font-black">{item.status}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Asteroid Monitoring */}
        <div className="lg:col-span-3 glass p-8 border-t-4 border-yellow-500/50">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black flex items-center space-x-3 tracking-tighter">
                 <Zap className="text-yellow-500" />
                 <span>ASTEROID MONITORING (NEO)</span>
              </h3>
              <span className="text-[10px] font-black bg-yellow-500/10 text-yellow-500 py-1 px-3 rounded border border-yellow-500/20">3 HAZARDS DETECTED</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "2024 JX1", dist: "0.023 AU", size: "42M", color: "text-red-500" },
                { name: "Apophis", dist: "0.0002 AU", size: "370M", color: "text-red-600" },
                { name: "Bennu", dist: "0.15 AU", size: "490M", color: "text-yellow-500" }
              ].map(neo => (
                <div key={neo.name} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                   <div className="flex justify-between mb-2">
                      <span className="font-bold">{neo.name}</span>
                      <span className={`text-[10px] font-black ${neo.color}`}>HIGH ALERT</span>
                   </div>
                   <div className="flex justify-between text-[10px] text-gray-500 uppercase font-black">
                      <span>Miss Distance</span>
                      <span className="text-white">{neo.dist}</span>
                   </div>
                   <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Diameter</span>
                      <span>{neo.size}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
