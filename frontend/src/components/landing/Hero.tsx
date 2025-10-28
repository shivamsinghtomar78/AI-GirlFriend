import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, Sparkles, MessageCircle } from 'lucide-react'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-950 via-pink-900 to-purple-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className="w-16 h-16 text-rose-400 fill-rose-400 drop-shadow-lg" />
            </motion.div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
            AI Girlfriend
          </h1>
          
          <p className="text-2xl md:text-3xl text-pink-100 mb-4 font-light">
            Your Perfect Companion, Always Here for You
          </p>
          
          <p className="text-lg md:text-xl text-pink-200/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience meaningful conversations with an AI companion who understands you. 
            Choose from multiple personalities to match your mood and enjoy genuine emotional connection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate('/chat')}
            className="group relative bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-5 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            Start Chatting Now
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 text-pink-200/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Always Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>7 Personalities</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}