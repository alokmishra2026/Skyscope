import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import SpaceExplorer from './pages/SpaceExplorer'
import KnowledgeDatabase from './pages/KnowledgeDatabase'
import SpaceGames from './pages/SpaceGames'
import SatelliteTracker from './pages/SatelliteTracker'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import StudentMode from './pages/StudentMode'
import AstronautTraining from './pages/AstronautTraining'
import EarthViewer from './pages/EarthViewer'
import QuizGenerator from './pages/QuizGenerator'
import SpaceCourses from './pages/SpaceCourses'
import Community from './pages/Community'
import LaunchTracker from './pages/LaunchTracker'
import TelescopeSimulator from './pages/TelescopeSimulator'
import ResearchUpdates from './components/ResearchUpdates'
import { Rocket, Satellite, Telescope, Brain, Gamepad2, LayoutDashboard, Search, User as UserIcon, Globe, Shield, Zap, Database, BookOpen, Users, Clock, Eye, ShieldCheck } from 'lucide-react'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setActivePage('student')
  }

  return (
    <div className="min-h-screen relative">
      <div className="star-field"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-space-accent rounded-full flex items-center justify-center animate-pulse">
            <Rocket className="text-space-dark" size={24} />
          </div>
          <span className="text-2xl font-bold neon-text tracking-tighter">VYOMVEDA <span className="text-space-accent">SKYSCOPE</span></span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          {['home', 'chatbot', 'explorer', 'knowledge', 'games', 'satellite', 'courses', 'community', 'quiz', 'launches', 'telescope', 'training', 'dashboard', 'earth'].map((item) => (
            <button 
              key={item}
              onClick={() => setActivePage(item)}
              className={`hover:text-space-accent transition-colors ${activePage === item ? 'text-space-accent border-b-2 border-space-accent' : 'text-gray-400'}`}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button 
            onClick={() => setActivePage('login')}
            className="flex items-center space-x-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-space-accent hover:border-space-accent hover:text-space-dark transition-all group"
          >
            <ShieldCheck size={18} className="text-space-accent group-hover:text-space-dark" />
            <span className="text-xs font-black uppercase tracking-widest">GATEWAY</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {activePage === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Home />
          </motion.div>
        )}

        {activePage === 'chatbot' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Chatbot />
          </motion.div>
        )}

        {activePage === 'explorer' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SpaceExplorer />
          </motion.div>
        )}

        {activePage === 'knowledge' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <KnowledgeDatabase />
          </motion.div>
        )}

        {activePage === 'games' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SpaceGames />
          </motion.div>
        )}

        {activePage === 'dashboard' && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}>
            <Dashboard />
          </motion.div>
        )}

        {activePage === 'login' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Login onLogin={handleLogin} />
          </motion.div>
        )}

        {activePage === 'student' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <StudentMode />
          </motion.div>
        )}

        {activePage === 'satellite' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SatelliteTracker />
          </motion.div>
        )}

        {activePage === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <QuizGenerator />
          </motion.div>
        )}

        {activePage === 'training' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AstronautTraining />
          </motion.div>
        )}

        {activePage === 'courses' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <SpaceCourses />
          </motion.div>
        )}

        {activePage === 'community' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Community />
          </motion.div>
        )}

        {activePage === 'launches' && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <LaunchTracker />
          </motion.div>
        )}

        {activePage === 'telescope' && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}>
            <TelescopeSimulator />
          </motion.div>
        )}

        {activePage === 'earth' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <EarthViewer />
          </motion.div>
        )}

        {activePage === 'research' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
            <ResearchUpdates />
          </motion.div>
        )}
        
        {/* Quick Access Menu (Mobile) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 bg-black/50 backdrop-blur-xl p-4 rounded-full border border-white/10">
           <Brain size={24} className="text-gray-400" />
           <Telescope size={24} className="text-gray-400" />
           <Gamepad2 size={24} className="text-gray-400" />
           <LayoutDashboard size={24} className="text-gray-400" />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-xs border-t border-white/5 bg-black/20">
        <p>&copy; 2026 Vyomveda Skyscope. Advanced Space AI & Learning Platform. Powered by NASA Open Data.</p>
      </footer>
    </div>
  )
}

export default App
