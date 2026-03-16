import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrainCircuit, Timer, CheckCircle, XCircle, Trophy, BarChart2 } from 'lucide-react'

const QuizGenerator = () => {
  const [step, setStep] = useState('start') // start, playing, result
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([
    { q: "What is the largest planet in our solar system?", a: ["Earth", "Jupiter", "Mars", "Saturn"], correct: 1 },
    { q: "Which galaxy is the Milky Way's nearest neighbor?", a: ["Andromeda", "Sombrero", "Whirlpool", "Triangulum"], correct: 0 },
    { q: "What force keeps planets in orbit?", a: ["Magnetism", "Gravity", "Friction", "Dark Matter"], correct: 1 }
  ])

  useState(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/quizzes/daily')
        const data = await response.json()
        if (data.questions) {
            // Transform mock data to component format if needed
            // For now, let's assume it matches or we keep defaults as fallback
        }
      } catch (e) { console.error(e) }
    }
    fetchQuiz()
  }, [])

  const handleAnswer = (idx) => {
     if (idx === questions[currentQ].correct) setScore(s => s + 1)
     if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1)
     } else {
        setStep('result')
     }
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center glass p-12"
          >
            <div className="w-20 h-20 bg-space-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-space-accent/20">
               <BrainCircuit className="text-space-accent" size={40} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">AI Quiz Challenge</h2>
            <p className="text-gray-400 mb-10 uppercase text-xs font-bold tracking-widest">Test your celestial intelligence</p>
            <div className="grid grid-cols-3 gap-6 mb-10">
               <div className="p-4 border border-white/5 rounded-lg">
                  <span className="block text-2xl font-black">15</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Questions</span>
               </div>
               <div className="p-4 border border-white/5 rounded-lg">
                  <span className="block text-2xl font-black">Expert</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Difficulty</span>
               </div>
               <div className="p-4 border border-white/5 rounded-lg">
                  <span className="block text-2xl font-black">500</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">XP Potential</span>
               </div>
            </div>
            <button 
              onClick={() => setStep('playing')}
              className="px-12 py-4 bg-space-accent text-space-dark font-black rounded-sm hover:scale-105 transition-transform tracking-[0.2em] uppercase"
            >
              Begin Evaluation
            </button>
          </motion.div>
        )}

        {step === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-12"
          >
             <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">QUESTION {currentQ + 1} OF {questions.length}</span>
                <span className="flex items-center text-space-accent text-[10px] font-black"><Timer size={14} className="mr-2" /> 00:30</span>
             </div>
             <h3 className="text-3xl font-bold mb-10 leading-tight">{questions[currentQ].q}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQ].a.map((ans, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="p-6 text-left bg-white/5 border border-white/10 hover:border-space-accent hover:bg-space-accent/5 transition-all rounded-lg group"
                  >
                    <div className="flex justify-between items-center">
                       <span className="font-bold">{ans}</span>
                       <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-space-accent flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-space-accent scale-0 group-hover:scale-100 transition-transform"></div>
                       </div>
                    </div>
                  </button>
                ))}
             </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center glass p-12"
          >
             <Trophy className="text-space-accent mx-auto mb-6" size={64} />
             <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Mission Report</h2>
             <div className="flex justify-center space-x-4 mb-10">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                   <span className="block text-4xl font-black">{score}/{questions.length}</span>
                   <span className="text-[10px] text-gray-500 font-bold uppercase">Accuracy Score</span>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                   <span className="block text-4xl font-black">+{score * 100}</span>
                   <span className="text-[10px] text-gray-500 font-bold uppercase">EXP Earned</span>
                </div>
             </div>
             <div className="flex flex-col md:flex-row justify-center gap-4">
                <button 
                  onClick={() => { setStep('start'); setCurrentQ(0); setScore(0); }}
                  className="px-8 py-3 bg-space-accent text-space-dark font-black tracking-widest text-xs uppercase"
                >
                  Restart Mission
                </button>
                <button className="px-8 py-3 bg-white/5 border border-white/10 font-black tracking-widest text-xs uppercase flex items-center justify-center space-x-2">
                   <BarChart2 size={16} /> <span>Leaderboards</span>
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuizGenerator
