import { X, Plus, MessageCircle, Trash2 } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { clearMessages, girlfriendName, avatarUrl } = useChatStore()

  const handleNewChat = () => {
    clearMessages()
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-md opacity-60" />
              <Avatar className="relative w-10 h-10 border-2 border-pink-400 shadow-lg shadow-pink-500/40 ring-1 ring-pink-500/20">
                <AvatarImage src={avatarUrl} alt={girlfriendName} className="object-cover bg-gradient-to-br from-pink-100 to-purple-100" />
                <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white font-semibold">
                  {girlfriendName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-lg font-semibold text-white">{girlfriendName}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)] px-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3 px-2">Recent Chats</h3>
            
            <div className="group flex items-center justify-between p-3 text-gray-300 hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <MessageCircle className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <span className="text-sm truncate">Previous conversation...</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}