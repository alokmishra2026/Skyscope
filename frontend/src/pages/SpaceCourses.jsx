import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Award, Users, Star } from 'lucide-react'

const SpaceCourses = () => {
  const [courses, setCourses] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses/')
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        // Fallback to defaults if API fails
        setCourses([
          { title: "Basic Astronomy", level: "Beginner", duration: "4 Weeks", students: "1200+", rating: 4.8 },
          { title: "Rocket Science 101", level: "Intermediate", duration: "8 Weeks", students: "800+", rating: 4.9 },
          { title: "Satellite Engineering", level: "Advanced", duration: "12 Weeks", students: "450+", rating: 4.7 }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold neon-text mb-4">Space Academy</h1>
        <p className="text-gray-400">Structured learning paths for future astronauts and engineers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-space-accent/50 transition-all group"
          >
            <div className="w-12 h-12 bg-space-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-space-accent group-hover:text-space-dark transition-colors">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
              <span className="flex items-center"><Star size={12} className="mr-1 text-yellow-500" /> {course.rating}</span>
              <span>{course.level}</span>
              <span>{course.duration}</span>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-space-accent hover:text-space-dark rounded-lg font-bold border border-white/10 transition-all">
              ENROLL NOW
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SpaceCourses
