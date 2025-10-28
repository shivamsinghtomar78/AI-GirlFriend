import { useState, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { chatApi } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmojiPicker } from './EmojiPicker'

export function ChatInput() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { addMessage, currentMode, userName, girlfriendName, conversationContext, personalityTraits, language, setUserName, updateContext } = useChatStore()

  const handleEmojiSelect = (emoji: string) => {
    setInput(prev => prev + emoji)
    inputRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    addMessage({
      content: userMessage,
      sender: 'user'
    })

    try {
      // Extract user name from message if not set
      if (!userName) {
        const nameMatch = userMessage.match(/(?:my name is|i am|i'm|call me)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i)
        if (nameMatch) {
          setUserName(nameMatch[1].trim())
        }
      }

      const response = await chatApi.sendMessage({
        message: userMessage,
        mode: currentMode,
        user_name: userName,
        girlfriend_name: girlfriendName,
        conversation_context: conversationContext,
        personality_traits: personalityTraits,
        language: language
      })

      addMessage({
        content: response.response,
        sender: 'ai',
        mode: currentMode
      })

      // Update conversation context
      const newContext = `User: ${userMessage}\nAI: ${response.response}`
      updateContext(conversationContext ? `${conversationContext}\n${newContext}` : newContext)
    } catch (error) {
      console.error('Error sending message:', error)
      addMessage({
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-lg p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 pr-12 py-6 rounded-2xl focus-visible:ring-pink-500"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-12 w-12 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 shadow-lg shadow-pink-500/30"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}