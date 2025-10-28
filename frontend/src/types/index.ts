export interface User {
  id: string
  username: string
  created_at: string
}

export interface Conversation {
  id: string
  mode: string
  title: string
  created_at: string
  message_count: number
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  mode?: string
  timestamp: Date
}

export interface ChatMode {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}