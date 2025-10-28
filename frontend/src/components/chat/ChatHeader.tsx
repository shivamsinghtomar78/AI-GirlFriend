import { Menu, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ModeSelector } from './ModeSelector'
import { NameCustomizer } from './NameCustomizer'
import { AvatarCustomizer } from './AvatarCustomizer'

import { useChatStore } from '@/store/chatStore'

interface ChatHeaderProps {
  onMenuClick: () => void
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  const { isConnected, girlfriendName, avatarUrl, setShowCustomization } = useChatStore()

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
              <Avatar className="relative w-12 h-12 border-2 border-pink-400 shadow-lg shadow-pink-500/50 ring-2 ring-pink-500/20 transition-transform group-hover:scale-105">
                <AvatarImage src={avatarUrl} alt={girlfriendName} className="object-cover bg-gradient-to-br from-pink-100 to-purple-100" />
                <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white font-semibold">
                  {girlfriendName[0]}
                </AvatarFallback>
              </Avatar>
              {isConnected && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 shadow-lg animate-pulse" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  {girlfriendName}
                  <Sparkles className="w-4 h-4 text-pink-400" />
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomization(true)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  Settings
                </Button>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
          </div>
        </div>

        <ModeSelector />
      </div>
    </div>
  )
}