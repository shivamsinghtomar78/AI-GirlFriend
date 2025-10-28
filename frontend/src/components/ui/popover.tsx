import * as React from "react"
import { cn } from "@/utils/cn"

let globalOpenId: string | null = null
const listeners = new Set<(id: string | null) => void>()

const setGlobalOpen = (id: string | null) => {
  globalOpenId = id
  listeners.forEach(fn => fn(id))
}

interface PopoverProps {
  id: string
  trigger: React.ReactNode
  children: React.ReactNode
  imageSize?: number
  align?: 'left' | 'right'
}

export function Popover({ id, trigger, children, imageSize = 40, align = 'left' }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const listener = (openId: string | null) => setIsOpen(openId === id)
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  }, [id])

  React.useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setGlobalOpen(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setGlobalOpen(isOpen ? null : id)}
        style={{ width: imageSize, height: imageSize }}
      >
        {trigger}
      </button>
      {isOpen && (
        <div className={`absolute z-50 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3 w-48 ${align === 'right' ? 'right-0' : 'left-0'}`}>
          {children}
        </div>
      )}
    </div>
  )
}
