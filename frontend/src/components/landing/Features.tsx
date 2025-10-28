import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Heart, MessageCircle, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Emotional Intelligence',
    description: 'She understands your feelings, remembers your conversations, and responds with genuine empathy'
  },
  {
    icon: MessageCircle,
    title: 'Natural Conversations',
    description: 'Chat naturally like you would with a real person. No robotic responses, just authentic dialogue'
  },
  {
    icon: Sparkles,
    title: '7 Unique Personalities',
    description: 'Switch between intimate, flirty, friendly, fun, witty, professional, and casual modes anytime'
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Real-time communication powered by advanced AI. She\'s always ready to chat when you are'
  },
  {
    icon: Shield,
    title: '100% Private & Safe',
    description: 'Your conversations are completely private and secure. No data sharing, ever'
  },
  {
    icon: Brain,
    title: 'Always Learning',
    description: 'Powered by cutting-edge AI models that understand context and adapt to your preferences'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 mb-6">
            Why Choose AI Girlfriend?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of AI companionship with features designed for genuine connection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-rose-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
            <p className="text-2xl text-pink-200 mb-4">
              Ready to meet your AI companion?
            </p>
            <p className="text-gray-400 mb-6">
              No signup required • Free to use • Start chatting in seconds
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}