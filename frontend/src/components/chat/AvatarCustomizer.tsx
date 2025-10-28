import { useState, useRef } from 'react'
import { Image, Check, Upload } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

const avatarOptions = [
  { id: 1, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna&backgroundColor=ffd5dc&hair=long01&hairColor=ff69b4', name: 'Luna' },
  { id: 2, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia&backgroundColor=ffe4e1&hair=long02&hairColor=8b4513', name: 'Sophia' },
  { id: 3, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emma&backgroundColor=fff0f5&hair=long03&hairColor=000000', name: 'Emma' },
  { id: 4, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Olivia&backgroundColor=ffc0cb&hair=long04&hairColor=daa520', name: 'Olivia' },
  { id: 5, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ava&backgroundColor=ffb6c1&hair=long05&hairColor=ff6347', name: 'Ava' },
  { id: 6, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Isabella&backgroundColor=fadadd&hair=long06&hairColor=4b0082', name: 'Isabella' },
  { id: 7, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia&backgroundColor=ffe4e1&hair=long07&hairColor=cd853f', name: 'Mia' },
  { id: 8, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Charlotte&backgroundColor=fff0f5&hair=long08&hairColor=8b0000', name: 'Charlotte' },
  { id: 9, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Amelia&backgroundColor=ffd5dc&hair=long09&hairColor=ff1493', name: 'Amelia' },
  { id: 10, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Harper&backgroundColor=ffb6c1&hair=long10&hairColor=daa520', name: 'Harper' },
  { id: 11, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Evelyn&backgroundColor=ffc0cb&hair=long11&hairColor=8b4513', name: 'Evelyn' },
  { id: 12, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Abigail&backgroundColor=fadadd&hair=long12&hairColor=000000', name: 'Abigail' },
  { id: 13, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emily&backgroundColor=ffe4e1&hair=long13&hairColor=d2691e', name: 'Emily' },
  { id: 14, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Madison&backgroundColor=fff0f5&hair=long14&hairColor=ff6347', name: 'Madison' },
  { id: 15, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ella&backgroundColor=ffd5dc&hair=long15&hairColor=4b0082', name: 'Ella' },
  { id: 16, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Scarlett&backgroundColor=ffb6c1&hair=long16&hairColor=cd853f', name: 'Scarlett' }
]

export function AvatarCustomizer() {
  const { avatarUrl, setAvatarUrl } = useChatStore()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setSelectedAvatar(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setAvatarUrl(selectedAvatar)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setSelectedAvatar(avatarUrl)
          setIsOpen(true)
        }}
        className="text-gray-400 hover:text-white"
      >
        <Image className="w-4 h-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent onClose={() => setIsOpen(false)} className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="pr-8">Choose Avatar</DialogTitle>
            <DialogDescription>
              Select a preset avatar or upload your own custom image
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Custom Avatar
            </Button>
          </div>

          <ScrollArea className="h-[400px] mt-4">
            <div className="grid grid-cols-4 gap-4 pr-4">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.url)}
                  className="relative group"
                >
                  <div className={`absolute inset-0 rounded-2xl blur-md transition-opacity ${
                    selectedAvatar === avatar.url
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 opacity-75'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-50'
                  }`} />
                  <div className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group-hover:scale-105 shadow-lg ${
                    selectedAvatar === avatar.url
                      ? 'border-pink-400 ring-2 ring-pink-500/50 shadow-pink-500/50'
                      : 'border-gray-700 group-hover:border-pink-500/50 shadow-gray-900'
                  }`}>
                    <img
                      src={avatar.url}
                      alt={avatar.name}
                      className="w-full h-full object-cover bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500"
                    />
                    {selectedAvatar === avatar.url && (
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 to-transparent flex items-center justify-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-3 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              Save Avatar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}