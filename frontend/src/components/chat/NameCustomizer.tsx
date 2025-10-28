import { useState } from 'react'
import { Edit2, Heart } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export function NameCustomizer() {
  const { girlfriendName, setGirlfriendName } = useChatStore()
  const [isOpen, setIsOpen] = useState(false)
  const [tempName, setTempName] = useState(girlfriendName)

  const handleSave = () => {
    if (tempName.trim()) {
      setGirlfriendName(tempName.trim())
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setTempName(girlfriendName)
          setIsOpen(true)
        }}
        className="text-gray-400 hover:text-white"
      >
        <Edit2 className="w-4 h-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent onClose={() => setIsOpen(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              Customize Her Name
            </DialogTitle>
            <DialogDescription>
              Give your AI girlfriend a personalized name that feels special to you
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Name</label>
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter a name..."
                className="bg-gray-800 border-gray-700 text-white"
                maxLength={20}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!tempName.trim()}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                Save Name
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}