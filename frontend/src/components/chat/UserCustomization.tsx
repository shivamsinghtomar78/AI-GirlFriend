import { useState } from 'react'
import { User, Image, Languages, Save, X } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const avatarOptions = [
  { id: 1, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna&backgroundColor=ffd5dc&hair=long01&hairColor=ff69b4', name: 'Luna' },
  { id: 2, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia&backgroundColor=ffe4e1&hair=long02&hairColor=8b4513', name: 'Sophia' },
  { id: 3, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emma&backgroundColor=fff0f5&hair=long03&hairColor=000000', name: 'Emma' },
  { id: 4, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Olivia&backgroundColor=ffc0cb&hair=long04&hairColor=daa520', name: 'Olivia' },
  { id: 5, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ava&backgroundColor=ffb6c1&hair=long05&hairColor=ff6347', name: 'Ava' },
  { id: 6, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Isabella&backgroundColor=fadadd&hair=long06&hairColor=4b0082', name: 'Isabella' },
  { id: 7, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia&backgroundColor=ffe4e1&hair=long07&hairColor=cd853f', name: 'Mia' },
  { id: 8, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Charlotte&backgroundColor=fff0f5&hair=long08&hairColor=8b0000', name: 'Charlotte' }
]

export function UserCustomization() {
  const { userName, setUserName, girlfriendName, setGirlfriendName, avatarUrl, setAvatarUrl, language, setLanguage, setShowCustomization } = useChatStore()
  const [tempUserName, setTempUserName] = useState(userName)
  const [tempGirlfriendName, setTempGirlfriendName] = useState(girlfriendName)
  const [tempAvatarUrl, setTempAvatarUrl] = useState(avatarUrl)
  const [tempLanguage, setTempLanguage] = useState(language)

  const handleSave = () => {
    if (tempUserName.trim()) setUserName(tempUserName.trim())
    if (tempGirlfriendName.trim()) setGirlfriendName(tempGirlfriendName.trim())
    setAvatarUrl(tempAvatarUrl)
    setLanguage(tempLanguage)
    setShowCustomization(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-4 my-auto relative">
        <button
          onClick={() => setShowCustomization(false)}
          className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-white mb-1">Customize Your Experience</h2>
          <p className="text-xs text-gray-400">Personalize your AI companion</p>
        </div>

        <div className="space-y-4">
          {/* Avatar Selection */}
          <div>
            <label className="flex items-center gap-1 text-xs font-medium text-gray-300 mb-2">
              <Image className="w-3 h-3 text-pink-400" />
              Choose Avatar
            </label>
            <div className="flex justify-center mb-3">
              <Avatar className="w-16 h-16 border-2 border-pink-400">
                <AvatarImage src={tempAvatarUrl} alt="Selected avatar" />
                <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 text-white text-lg">
                  {tempGirlfriendName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setTempAvatarUrl(avatar.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    tempAvatarUrl === avatar.url
                      ? 'border-pink-400 ring-2 ring-pink-500/50'
                      : 'border-gray-700 hover:border-pink-500/50'
                  }`}
                >
                  <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-300 mb-1">
                <User className="w-3 h-3 text-blue-400" />
                Your Name
              </label>
              <Input
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                placeholder="Enter your name"
                className="bg-gray-800 border-gray-700 text-white text-sm py-1.5"
                maxLength={30}
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-300 mb-1">
                <User className="w-3 h-3 text-pink-400" />
                Her Name
              </label>
              <Input
                value={tempGirlfriendName}
                onChange={(e) => setTempGirlfriendName(e.target.value)}
                placeholder="Enter her name"
                className="bg-gray-800 border-gray-700 text-white text-sm py-1.5"
                maxLength={30}
              />
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="flex items-center gap-1 text-xs font-medium text-gray-300 mb-2">
              <Languages className="w-3 h-3 text-purple-400" />
              Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'english', label: 'English' },
                { value: 'hindi', label: 'हिंदी' },
                { value: 'hinglish', label: 'Hinglish' }
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setTempLanguage(lang.value as any)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    tempLanguage === lang.value
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
          >
            <Save className="w-3 h-3 mr-1" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
