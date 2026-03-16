import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Globe, ShieldCheck } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-10 rounded-[2rem] border border-white/10 relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-space-accent/20 blur-[80px] rounded-full" />
        
        <div className="relative">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-space-accent/10 border border-space-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
               <ShieldCheck className="text-space-accent" size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">MISSION GATEWAY</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">AUTHENTICATE TO ACCESS SKY_SCOPE</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Universal Identifier</label>
              <div className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl focus-within:border-space-accent transition-colors">
                <Mail size={18} className="text-gray-500 mr-4" />
                <input 
                  type="email" 
                  placeholder="name@agency.gov"
                  className="bg-transparent border-none outline-none text-white text-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Protocol</label>
              <div className="flex items-center p-4 bg-white/5 border border-white/10 rounded-xl focus-within:border-space-accent transition-colors">
                <Lock size={18} className="text-gray-500 mr-4" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none text-white text-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full py-5 bg-space-accent text-space-dark font-black tracking-[.25em] text-xs uppercase rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(0,212,255,0.4)] flex items-center justify-center">
               <LogIn className="mr-3" size={18} /> INITIATE AUTH
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <button className="text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
               REQUEST NEW CLEARANCE (SIGN UP)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
