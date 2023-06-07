import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { createContext, useContext } from 'react'

type SpeechBallonContextType = {
  data: SpeechBallonNodeType
  xPos: number
  yPos: number
  isEditing: boolean
  handleSetEditing: (isEditing: boolean) => void
  isSetSize: boolean
  handleSetSize: (isSetSize: boolean) => void
}

export const SpeechBallonContext = createContext<SpeechBallonContextType | null>(null)

export const SpeechBallonProvider = SpeechBallonContext.Provider

export const useSpeechBallonContext = () => {
  const value = useContext(SpeechBallonContext)

  if (!value) {
    throw new Error('useKPISpeechBallonContext must be used within a KPISpeechBallon')
  }

  return value
}
