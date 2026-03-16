import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Bot, Sparkles, Image as ImageIcon, Link as LinkIcon, Mic, MicOff, Volume2 } from 'lucide-react'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Greetings, explorer! I am Vyomveda AI. Ask me anything about the cosmos, from black holes to the latest NASA missions.' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [])

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      setIsListening(true)
      recognitionRef.current?.start()
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { id: Date.now(), type: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // API Call to Backend
    try {
      const response = await fetch('http://localhost:8000/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await response.json()
      
      const botResponse = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: data.response || "I'm having trouble connecting to my central processing unit. Please try again.",
        images: data.images || [],
        source: data.source || "System"
      }
      setMessages(prev => [...prev, botResponse])
      speak(botResponse.text)
    } catch (error) {
      console.error("Chatbot API Error:", error)
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: "Communication link offline. Please ensure the backend server is operational." 
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col glass rounded-xl overflow-hidden mt-6 mb-12">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-space-accent/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-space-accent/20 flex items-center justify-center">
            <Bot className="text-space-accent" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-widest uppercase">Space AI Assistant</h2>
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-400">RESEARCH SYNC ACTIVE</span>
            </div>
          </div>
        </div>
        <Sparkles className="text-space-accent/50" />
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-space-nebula/50 ml-3' : 'bg-space-accent/20 mr-3'}`}>
                  {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.type === 'user' ? 'bg-space-nebula/20 border border-space-nebula/30' : 'bg-white/5 border border-white/10'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.images?.length > 0 && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                      <img src={msg.images[0]} alt="Space Data" className="w-full h-auto object-cover max-h-60" />
                      <div className="bg-black/50 p-2 text-[10px] flex items-center justify-between">
                        <span className="flex items-center space-x-1"><ImageIcon size={12} /> <span>SOURCE: NASA JPL</span></span>
                        <LinkIcon size={12} className="cursor-pointer hover:text-space-accent" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex space-x-1">
               <span className="w-1.5 h-1.5 bg-space-accent rounded-full animate-bounce"></span>
               <span className="w-1.5 h-1.5 bg-space-accent rounded-full animate-bounce [animation-delay:0.2s]"></span>
               <span className="w-1.5 h-1.5 bg-space-accent rounded-full animate-bounce [animation-delay:0.4s]"></span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        <div className="flex items-center space-x-4 bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus-within:border-space-accent transition-colors">
          <button 
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-white/10 text-gray-400'}`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening..." : "Ask about planets, missions, or physics..."}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-space-accent text-space-dark rounded-md hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-500 mt-2 tracking-widest uppercase">
          AI generated content may contain scientific simplifications.
        </p>
      </div>
    </div>
  )
}

export default Chatbot
