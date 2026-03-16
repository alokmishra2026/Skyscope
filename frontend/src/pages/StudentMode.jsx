import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, ChevronRight, CheckCircle2, Clock } from 'lucide-react'

const CourseCard = ({ title, progress, lessons, category }) => (
  <div className="glass p-6 relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
       <span className="text-[10px] font-black tracking-widest text-space-accent uppercase bg-space-accent/10 px-2 py-1 rounded">
         {category}
       </span>
       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
          <BookOpen size={14} className="text-gray-500" />
       </div>
    </div>
    <h4 className="text-lg font-bold mb-4 tracking-tight group-hover:text-space-accent transition-colors cursor-pointer">{title}</h4>
    
    <div className="space-y-4">
       <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Progress</span>
          <span>{progress}%</span>
       </div>
       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-space-accent"
          />
       </div>
       <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase font-black">
          <span className="flex items-center"><Clock size={12} className="mr-1" /> {lessons} Lessons</span>
          <button className="flex items-center text-white hover:text-space-accent transition-colors">
            Continue <ChevronRight size={14} />
          </button>
       </div>
    </div>
  </div>
)

const StudentMode = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase flex items-center space-x-4">
             <GraduationCap className="text-space-accent" size={48} />
             <span>CADET <span className="text-space-accent">ACADEMY</span></span>
          </h2>
          <p className="text-gray-400 mt-2 tracking-widest uppercase text-xs font-bold">Progress Tracking & Certification</p>
        </div>
        <div className="flex space-x-8">
           <div className="text-center">
              <span className="block text-3xl font-black text-space-accent">1,240</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Exp Points</span>
           </div>
           <div className="text-center">
              <span className="block text-3xl font-black text-space-nebula">04</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Locked Badges</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-space-accent pl-4">Active Courses</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CourseCard title="Introduction to Rocketry" progress={65} lessons={12} category="Engineering" />
              <CourseCard title="Astrobiology Fundamentals" progress={20} lessons={8} category="Science" />
              <CourseCard title="Cosmology & Black Holes" progress={0} lessons={15} category="Physics" />
              <CourseCard title="Orbital Mechanics" progress={90} lessons={10} category="Mathematics" />
           </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-space-nebula pl-4">Badges & Achievements</h3>
           <div className="glass p-8 space-y-6">
              {[
                { name: "First Launch", desc: "Successfully simulated a sub-orbital flight.", date: "Feb 10", done: true },
                { name: "Moon Walker", desc: "Completed the lunar landing simulation.", date: "Feb 22", done: true },
                { name: "Solar Citizen", desc: "Visit all planets in the explorer.", date: "Locked", done: false },
                { name: "Nebula Master", desc: "Identify 50 deep space objects.", date: "Locked", done: false }
              ].map((badge, idx) => (
                <div key={idx} className={`flex items-start space-x-4 ${!badge.done ? 'opacity-30' : ''}`}>
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${badge.done ? 'bg-space-accent/20 border border-space-accent/50' : 'bg-white/5 border border-white/10'}`}>
                      <Award size={24} className={badge.done ? 'text-space-accent' : 'text-gray-500'} />
                   </div>
                   <div>
                      <h4 className="text-sm font-black uppercase tracking-tight flex items-center">
                         {badge.name}
                         {badge.done && <CheckCircle2 size={12} className="ml-2 text-green-500" />}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{badge.desc}</p>
                      {badge.done && <span className="text-[10px] text-space-accent mt-2 block font-bold">{badge.date}</span>}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

export default StudentMode
