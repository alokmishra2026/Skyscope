import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Rocket, Target, Zap, Trophy } from 'lucide-react'

const GameCard = ({ title, type, desc, icon: Icon, difficulty }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 relative group cursor-pointer"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
       <Zap className="text-space-accent" size={40} />
    </div>
    <div className="w-16 h-16 rounded-xl bg-space-accent/10 flex items-center justify-center mb-6">
       <Icon className="text-space-accent" size={32} />
    </div>
    <span className="text-[10px] font-black tracking-widest text-space-accent uppercase border border-space-accent/20 px-2 py-1 rounded">
      {type}
    </span>
    <h3 className="text-2xl font-black mt-4 mb-3 tracking-tighter uppercase">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {desc}
    </p>
    <div className="flex items-center justify-between mt-auto">
       <div className="flex space-x-1">
         {[1,2,3].map(i => (
           <div key={i} className={`w-3 h-1 rounded-full ${i <= difficulty ? 'bg-space-accent' : 'bg-white/10'}`}></div>
         ))}
       </div>
       <button className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-space-accent transition-colors">
         Play Now
       </button>
    </div>
  </motion.div>
)

const SpaceGames = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-space-accent/10 border border-space-accent/20 text-space-accent text-xs font-bold mb-6 tracking-[0.2em] uppercase">
          <Gamepad2 size={14} />
          <span>Interactive Academy</span>
        </div>
        <h2 className="text-6xl font-black tracking-tighter mb-6">LEARN THROUGH <span className="text-space-accent">PLAY</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master the laws of physics and astronautics with our advanced simulation games.
          Earn credit towards your Cadet Certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GameCard 
          title="Rocket Builder"
          type="Simulator"
          desc="Test various staged-rocket configurations to reach stable orbit. Balance fuel weight and thrust."
          icon={Rocket}
          difficulty={2}
        />
        <GameCard 
          title="Mars Mission"
          type="Strategy"
          desc="Manage a Martian colony. Navigate dust storms, radiation, and resource scarcity to ensure survival."
          icon={Target}
          difficulty={3}
        />
        <GameCard 
          title="Space Quiz"
          type="Challenge"
          desc="Prove your cosmic knowledge. Compete against other cadets in a global real-time astronomy trivia."
          icon={Trophy}
          difficulty={1}
        />
      </div>
    </section>
  )
}

export default SpaceGames
