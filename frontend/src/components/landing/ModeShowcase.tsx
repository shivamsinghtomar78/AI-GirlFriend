import { motion } from 'framer-motion'
import { Heart, Zap, Smile, Briefcase, Users, Sparkles, Coffee } from 'lucide-react'

const modes = [
  { id: 'intimate_mode', name: 'Intimate', icon: Heart, color: 'from-rose-400 to-pink-500', description: 'Deep emotional connection and meaningful conversations' },
  { id: 'flirty_mode', name: 'Flirty', icon: Sparkles, color: 'from-pink-400 to-rose-500', description: 'Playful charm and romantic interactions' },
  { id: 'friendly_mode', name: 'Friendly', icon: Users, color: 'from-purple-400 to-pink-400', description: 'Warm support and genuine care' },
  { id: 'fun_mode', name: 'Fun', icon: Smile, color: 'from-fuchsia-400 to-purple-500', description: 'Energetic and entertaining conversations' },
  { id: 'witty_mode', name: 'Witty', icon: Zap, color: 'from-yellow-400 to-orange-500', description: 'Sharp humor and clever banter' },
  { id: 'professional_mode', name: 'Professional', icon: Briefcase, color: 'from-blue-400 to-indigo-500', description: 'Focused and productive discussions' },
  { id: 'lightweight_mode', name: 'Casual', icon: Coffee, color: 'from-amber-400 to-orange-500', description: 'Relaxed and easy-going chats' }
]

export function ModeShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 mb-6">
            Choose Her Personality
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Switch between different personalities to match your mood. Each mode brings a unique conversation style and emotional connection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 group-hover:border-pink-500/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${mode.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <mode.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{mode.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}