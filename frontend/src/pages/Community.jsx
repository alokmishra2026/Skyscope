import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Share2, Award, Users } from 'lucide-react'

const Community = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl font-bold neon-text">Global Space Community</h1>
          <p className="text-gray-400">Collaborate with researchers and enthusiasts across the globe.</p>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass p-6 rounded-xl border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-tr from-space-accent to-space-nebula rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-sm">SpaceExplorer_{i}23</h4>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Just analyzed the latest telemetry from Voyager 1. The data suggests an interesting shift in plasma density at the heliopause. Anyone else seeing this?
                </p>
                <div className="flex space-x-6 text-xs text-gray-500">
                  <button className="flex items-center hover:text-space-accent"><MessageSquare size={14} className="mr-2" /> 24</button>
                  <button className="flex items-center hover:text-space-accent"><Share2 size={14} className="mr-2" /> Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-80 space-y-6">
          <div className="glass p-6 rounded-xl border border-white/10 sticky top-24">
            <h3 className="font-bold mb-4 flex items-center"><Award size={18} className="mr-2 text-space-accent" /> TOP CONTRIBUTORS</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600 font-mono">#{i}</span>
                    <span>Astro_Dev</span>
                  </div>
                  <span className="text-space-accent font-bold">{1200 - i*100} pts</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-space-accent/30 text-space-accent text-xs font-bold rounded hover:bg-space-accent/10">
              VIEW LEADERBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
