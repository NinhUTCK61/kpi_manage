import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowSpeechBallonNode, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { SpeechBallonContext } from '../context'

export type ArrowResizeType = {
  arrowWidth: number | null
  arrowHeight: number | null
}

export const SpeechBallonNodeProvider: React.FC<
  PropsWithChildren<{
    data: SpeechBallonNodeType
    xPos: number
    yPos: number
  }>
> = ({ children, data, xPos, yPos }) => {
  const toggleDraggable = useRFStore((state) => state.toggleDraggable)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [nodeResizing, setNodeResizing] = useState<ReactFlowSpeechBallonNode | null>(null)
  const [isResizeEnabled, setResizeEnabled] = useState(false)

  const handleSetEditing = useCallback(
    (value: boolean) => {
      setEditing(value)
      // disable draggable when editing
      toggleDraggable(data.id, !value)
    },
    [data.id, toggleDraggable],
  )

  const handleSetResize = useCallback((value: boolean) => {
    setResizeEnabled(value)
  }, [])

  const handleSetResizing = useCallback((value: ReactFlowSpeechBallonNode | null) => {
    setNodeResizing(value)
  }, [])

  const isResizing = nodeResizing?.id === data.id

  const contextValue = useMemo(
    () => ({
      data,
      xPos,
      yPos,
      isEditing,
      handleSetEditing,
      isResizeEnabled,
      handleSetResize,
      nodeResizing,
      handleSetResizing,
      isResizing,
    }),
    [
      data,
      handleSetEditing,
      handleSetResize,
      handleSetResizing,
      isEditing,
      isResizeEnabled,
      nodeResizing,
      xPos,
      yPos,
      isResizing,
    ],
  )

  return (
    <SpeechBallonContext.Provider value={contextValue}>{children}</SpeechBallonContext.Provider>
  )
}
