import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ChatRequest {
  message: string
  mode: string
  conversation_id?: string
  user_name?: string
  girlfriend_name?: string
  conversation_context?: string
  personality_traits?: {
    formality: number
    humor: number
    empathy: number
    flirtiness: number
    enthusiasm: number
  }
  language?: string
}

export interface ChatResponse {
  response: string
  conversation_id: string
  mode: string
}

export const chatApi = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post('/chat/message', data)
    return response.data
  },
  
  getConversations: async () => {
    const response = await api.get('/chat/conversations')
    return response.data
  },
  
  createConversation: async (mode: string) => {
    const response = await api.post('/chat/conversations', { mode })
    return response.data
  }
}