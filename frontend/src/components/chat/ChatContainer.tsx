import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { ChatSidebar } from './ChatSidebar'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'
import { ChatHeader } from './ChatHeader'

export function ChatContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { messages } = useChatStore()

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatMessages messages={messages} />
          <ChatInput />
        </div>
      </div>
    </div>
  )
}