import { Popover } from '@/components/ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function PopoverDemo() {
  const avatars = [
    { id: '1', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna', name: 'Luna' },
    { id: '2', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia', name: 'Sophia' },
    { id: '3', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emma', name: 'Emma' }
  ]

  return (
    <div className="flex gap-4 p-8">
      {avatars.map((avatar) => (
        <Popover
          key={avatar.id}
          id={avatar.id}
          imageSize={50}
          trigger={
            <Avatar className="w-full h-full border-2 border-pink-400 hover:border-pink-500 transition-colors">
              <AvatarImage src={avatar.url} alt={avatar.name} />
              <AvatarFallback>{avatar.name[0]}</AvatarFallback>
            </Avatar>
          }
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-white">{avatar.name}</h3>
            <p className="text-sm text-gray-400">Click to select this avatar</p>
            <button className="w-full px-3 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm transition-colors">
              Select
            </button>
          </div>
        </Popover>
      ))}
    </div>
  )
}
