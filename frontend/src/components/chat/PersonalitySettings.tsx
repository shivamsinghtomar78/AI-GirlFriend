import { useState } from 'react'
import { Languages, Save, X } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

export function PersonalitySettings() {
  const { personalityTraits, setPersonalityTraits, language, setLanguage, showCustomization, setShowCustomization } = useChatStore()
  const [tempTraits, setTempTraits] = useState(personalityTraits)
  const [tempLanguage, setTempLanguage] = useState(language)

  const handleSave = () => {
    setPersonalityTraits(tempTraits)
    setLanguage(tempLanguage)
    setShowCustomization(false)
  }

  if (!showCustomization) return null

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
          <h2 className="text-xl font-bold text-white mb-1">Personality & Language Settings</h2>
          <p className="text-xs text-gray-400">Customize AI personality traits and language preferences</p>
        </div>

        <div className="space-y-4">
            {/* Language Selection */}
            <div>
              <label className="text-xs font-medium text-gray-300 mb-2 flex items-center gap-1">
                <Languages className="w-3 h-3" />
                Response Language
              </label>
              <div className="flex gap-2 mt-2">
                {[
                  { value: 'english', label: 'English' },
                  { value: 'hindi', label: 'हिंदी' },
                  { value: 'hinglish', label: 'Hinglish' }
                ].map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setTempLanguage(lang.value as any)}
                    className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                      tempLanguage === lang.value
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Personality Traits */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-300">Personality Traits</h3>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Formality</label>
                  <Badge variant="secondary" className="text-xs">{tempTraits.formality}%</Badge>
                </div>
                <Slider
                  value={tempTraits.formality}
                  onValueChange={(value) => setTempTraits({ ...tempTraits, formality: value })}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Casual</span>
                  <span>Formal</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Humor</label>
                  <Badge variant="secondary" className="text-xs">{tempTraits.humor}%</Badge>
                </div>
                <Slider
                  value={tempTraits.humor}
                  onValueChange={(value) => setTempTraits({ ...tempTraits, humor: value })}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Serious</span>
                  <span>Funny</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Empathy</label>
                  <Badge variant="secondary" className="text-xs">{tempTraits.empathy}%</Badge>
                </div>
                <Slider
                  value={tempTraits.empathy}
                  onValueChange={(value) => setTempTraits({ ...tempTraits, empathy: value })}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Logical</span>
                  <span>Emotional</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Flirtiness</label>
                  <Badge variant="secondary" className="text-xs">{tempTraits.flirtiness}%</Badge>
                </div>
                <Slider
                  value={tempTraits.flirtiness}
                  onValueChange={(value) => setTempTraits({ ...tempTraits, flirtiness: value })}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Reserved</span>
                  <span>Flirty</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400">Enthusiasm</label>
                  <Badge variant="secondary" className="text-xs">{tempTraits.enthusiasm}%</Badge>
                </div>
                <Slider
                  value={tempTraits.enthusiasm}
                  onValueChange={(value) => setTempTraits({ ...tempTraits, enthusiasm: value })}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>
          </div>

        <Button
          onClick={handleSave}
          className="w-full py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 mt-4"
        >
          <Save className="w-3 h-3 mr-1" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}