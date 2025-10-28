import { Hero } from './Hero'
import { ModeShowcase } from './ModeShowcase'
import { Features } from './Features'

export function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ModeShowcase />
      <Features />
    </div>
  )
}