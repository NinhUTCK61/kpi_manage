import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { createContext, useContext } from 'react'

type SpeechBallonContextType = {
  data: SpeechBallonNodeType
  xPos: number
  yPos: number
  isEditing: boolean
  handleSetEditing: (isEditing: boolean) => void
  isResizeEnabled: boolean
  handleResize: (isResizeEnabled: boolean) => void
  isResizing: boolean
  handleResizing: (isResizeEnabled: boolean) => void
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
