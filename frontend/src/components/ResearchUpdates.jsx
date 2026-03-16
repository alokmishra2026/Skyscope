import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react'

const ResearchUpdates = () => {
  const [news, setNews] = useState([
    { id: 1, title: "Artemis III Update", category: "Missions", date: "Mar 16, 2026", desc: "NASA systems check for upcoming lunar descent." },
    { id: 2, title: "Dark Matter Mapping", category: "Research", date: "Mar 15, 2026", desc: "Subtle gravitational lensing reveals invisible cosmic structures." },
  ])

  useEffect(() => {
    // Basic fetch with no complex logic
    fetch('http://localhost:8000/api/research/updates')
      .then(res => res.json())
      .then(data => {
        if (data && data.latest_discovery) {
          setNews(prev => [
            { id: Date.now(), title: data.latest_discovery, category: "Live Data", date: data.date, desc: data.description || "" },
            ...prev
          ])
        }
      })
      .catch(err => console.error("Sync error:", err))
  }, [])

  return (
    <div className="p-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Latest Research</h2>
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="p-4 glass rounded-xl border border-white/10">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm opacity-70">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResearchUpdates
