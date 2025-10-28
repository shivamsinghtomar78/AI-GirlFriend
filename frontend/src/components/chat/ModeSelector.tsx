import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'

const modes = [
  { id: 'intimate_mode', name: 'Intimate', color: 'bg-rose-500', emoji: '💕' },
  { id: 'flirty_mode', name: 'Flirty', color: 'bg-pink-500', emoji: '😘' },
  { id: 'friendly_mode', name: 'Friendly', color: 'bg-purple-500', emoji: '🤗' },
  { id: 'fun_mode', name: 'Fun', color: 'bg-fuchsia-500', emoji: '🎉' },
  { id: 'witty_mode', name: 'Witty', color: 'bg-yellow-500', emoji: '😏' },
  { id: 'professional_mode', name: 'Professional', color: 'bg-blue-500', emoji: '💼' },
  { id: 'lightweight_mode', name: 'Casual', color: 'bg-orange-500', emoji: '☕' }
]

export function ModeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentMode, setMode } = useChatStore()

  const currentModeData = modes.find(mode => mode.id === currentMode) || modes[0]

  const handleModeSelect = (modeId: string) => {
    setMode(modeId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 hover:text-white"
      >
        <span className="text-lg mr-2">{currentModeData.emoji}</span>
        <span className="font-medium">{currentModeData.name}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 right-0 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl z-20 min-w-[220px] overflow-hidden">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-700/50 transition-colors ${
                  mode.id === currentMode ? 'bg-gray-700/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{mode.emoji}</span>
                  <span className="text-white font-medium">{mode.name}</span>
                </div>
                {mode.id === currentMode && (
                  <Check className="w-4 h-4 text-pink-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}