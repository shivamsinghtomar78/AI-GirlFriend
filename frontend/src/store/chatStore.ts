import { create } from 'zustand'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  mode?: string
}

export interface PersonalityTraits {
  formality: number
  humor: number
  empathy: number
  flirtiness: number
  enthusiasm: number
}

export interface ChatState {
  messages: Message[]
  currentMode: string
  isTyping: boolean
  isConnected: boolean
  girlfriendName: string
  avatarUrl: string
  userName: string
  conversationContext: string
  personalityTraits: PersonalityTraits
  language: 'english' | 'hindi' | 'hinglish'
  showCustomization: boolean
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setMode: (mode: string) => void
  setTyping: (typing: boolean) => void
  setConnected: (connected: boolean) => void
  setGirlfriendName: (name: string) => void
  setAvatarUrl: (url: string) => void
  setUserName: (name: string) => void
  updateContext: (context: string) => void
  setPersonalityTraits: (traits: PersonalityTraits) => void
  setLanguage: (language: 'english' | 'hindi' | 'hinglish') => void
  setShowCustomization: (show: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentMode: 'friendly_mode',
  isTyping: false,
  isConnected: false,
  girlfriendName: localStorage.getItem('girlfriendName') || 'Luna',
  avatarUrl: localStorage.getItem('avatarUrl') || 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna&backgroundColor=ffd5dc&hair=long01&hairColor=ff69b4',
  userName: localStorage.getItem('userName') || '',
  conversationContext: localStorage.getItem('conversationContext') || '',
  personalityTraits: JSON.parse(localStorage.getItem('personalityTraits') || '{"formality":50,"humor":50,"empathy":70,"flirtiness":50,"enthusiasm":60}'),
  language: (localStorage.getItem('language') as 'english' | 'hindi' | 'hinglish') || 'english',
  showCustomization: localStorage.getItem('showCustomization') !== 'false',
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]
  })),
  
  setMode: (mode) => set({ currentMode: mode }),
  setTyping: (typing) => set({ isTyping: typing }),
  setConnected: (connected) => set({ isConnected: connected }),
  setGirlfriendName: (name) => {
    localStorage.setItem('girlfriendName', name)
    set({ girlfriendName: name })
  },
  setAvatarUrl: (url) => {
    localStorage.setItem('avatarUrl', url)
    set({ avatarUrl: url })
  },
  setUserName: (name) => {
    localStorage.setItem('userName', name)
    set({ userName: name })
  },
  updateContext: (context) => {
    localStorage.setItem('conversationContext', context)
    set({ conversationContext: context })
  },
  setPersonalityTraits: (traits) => {
    localStorage.setItem('personalityTraits', JSON.stringify(traits))
    set({ personalityTraits: traits })
  },
  setLanguage: (language) => {
    localStorage.setItem('language', language)
    set({ language })
  },
  setShowCustomization: (show) => {
    localStorage.setItem('showCustomization', String(show))
    set({ showCustomization: show })
  },
  clearMessages: () => set({ messages: [] })
}))