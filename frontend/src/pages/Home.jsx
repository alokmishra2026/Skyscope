import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ResearchUpdates from '../components/ResearchUpdates'

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold neon-text">Mission to the Beyond</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Vyomveda Skyscope is your gateway to the universe. Combining NASA Open Data with advanced AI, we bring the cosmos to your screen. Explore, learn, and discover like never before.
            </p>
            <div className="flex space-x-4">
              <div className="p-4 glass rounded-lg border-l-4 border-space-accent">
                <h3 className="text-space-accent font-bold">10k+</h3>
                <p className="text-xs text-gray-500 uppercase">Satellites Tracked</p>
              </div>
              <div className="p-4 glass rounded-lg border-l-4 border-space-nebula">
                <h3 className="text-space-nebula font-bold">500+</h3>
                <p className="text-xs text-gray-500 uppercase">Daily Updates</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-space-accent/20 blur-3xl rounded-full animate-pulse-slow"></div>
            <img 
              src="https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg" 
              alt="Space" 
              className="rounded-2xl relative z-10 border border-white/10 shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
      <ResearchUpdates />
    </motion.div>
  )
}

export default Home
