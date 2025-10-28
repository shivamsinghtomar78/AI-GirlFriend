import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, useChatStore } from '@/store/chatStore'
import { User } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserCustomization } from './UserCustomization'
import { PersonalitySettings } from './PersonalitySettings'

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { girlfriendName, avatarUrl, showCustomization } = useChatStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (showCustomization) {
    return messages.length === 0 ? <UserCustomization /> : <PersonalitySettings />
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse" />
            <Avatar className="relative w-24 h-24 border-4 border-pink-400 shadow-2xl shadow-pink-500/50 ring-4 ring-pink-500/20">
              <AvatarImage src={avatarUrl} alt={girlfriendName} className="object-cover bg-gradient-to-br from-pink-100 to-purple-100" />
              <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white text-3xl font-bold">
                {girlfriendName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">Start a conversation with {girlfriendName}</h3>
          <p className="text-gray-400 leading-relaxed">
            Choose a personality mode and send your first message to begin chatting
          </p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                  <Avatar className="relative w-10 h-10 border-2 border-pink-400 shadow-lg shadow-pink-500/30 ring-1 ring-pink-500/20">
                    <AvatarImage src={avatarUrl} alt={girlfriendName} className="object-cover bg-gradient-to-br from-pink-100 to-purple-100" />
                    <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white font-semibold text-sm">
                      {girlfriendName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-br-sm'
                    : 'bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-700/50 rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.sender === 'user' && (
                <Avatar className="w-10 h-10 border-2 border-blue-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500">
                    <User className="w-5 h-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
}