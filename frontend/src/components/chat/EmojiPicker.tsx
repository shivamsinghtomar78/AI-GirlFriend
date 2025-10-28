import { useState } from 'react'
import { Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'

const emojiCategories = {
  'Smileys': ['😊', '😂', '🥰', '😍', '😘', '😋', '😎', '🤗', '🥳', '😇', '🤩', '😏', '😌', '😉', '🙂', '😀', '😁', '😆', '🤣', '😅', '😄'],
  'Hearts': ['❤️', '💕', '💖', '💗', '💓', '💞', '💘', '💝', '💟', '♥️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'],
  'Gestures': ['👋', '🤚', '✋', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  'Faces': ['😳', '🥺', '🥹', '😢', '😭', '😤', '😠', '😡', '🤬', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'],
  'Activities': ['🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍾', '🥂', '🍻', '🍺', '🍷', '🥃', '🍸', '🍹', '🍶', '☕', '🍵', '🥤', '🧃', '🧋', '🍼', '🥛'],
  'Nature': ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '💐', '🌿', '🍀', '🌱', '🌾', '🌵', '🌴', '🌳', '🌲', '⭐', '🌟', '✨', '💫', '☀️', '🌙', '🌈', '☁️', '⛅', '🌤️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️']
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Smileys')

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-300"
      >
        <Smile className="w-5 h-5" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl z-20 w-80">
            <div className="p-3 border-b border-gray-700">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {Object.keys(emojiCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 h-64 overflow-y-auto">
              <div className="grid grid-cols-8 gap-2">
                {emojiCategories[activeCategory as keyof typeof emojiCategories].map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onEmojiSelect(emoji)
                      setIsOpen(false)
                    }}
                    className="text-2xl hover:bg-gray-700 rounded-lg p-2 transition-colors hover:scale-125 transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}