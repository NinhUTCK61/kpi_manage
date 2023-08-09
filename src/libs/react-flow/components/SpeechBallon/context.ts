import { createContext, useContext } from 'react'
import { ReactFlowSpeechBallonNode, SpeechBallonNodeType } from '../../types'

type SpeechBallonContextType = {
  data: SpeechBallonNodeType
  xPos: number
  yPos: number
  isEditing: boolean
  handleSetEditing: (isEditing: boolean) => void
  isResizeEnabled: boolean
  handleSetResize: (isResizeEnabled: boolean) => void
  nodeResizing: ReactFlowSpeechBallonNode | null
  isResizing: boolean
  handleSetResizing: (nodeResizing: ReactFlowSpeechBallonNode | null) => void
}

export const SpeechBallonContext = createContext<SpeechBallonContextType | null>(null)

export const useSpeechBallonContext = () => {
  const value = useContext(SpeechBallonContext)

  if (!value) {
    throw new Error('useKPISpeechBallonContext must be used within a KPISpeechBallon')
  }

  return value
}
