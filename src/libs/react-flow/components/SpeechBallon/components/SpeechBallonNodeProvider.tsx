import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { SpeechBallonContext } from '../context'

export const SpeechBallonNodeProvider: React.FC<
  PropsWithChildren<{
    data: SpeechBallonNodeType
    xPos: number
    yPos: number
  }>
> = ({ children, data, xPos, yPos }) => {
  const toggleDraggable = useRFStore((state) => state.toggleDraggable)
  const [isEditing, setEditing] = useState<boolean>(false)
  const handleSetEditing = useCallback((value: boolean) => {
    setEditing(value)
  }, [])

  const [isResizeEnabled, setResizeEnabled] = useState(false)
  const handleResize = useCallback((value: boolean) => {
    setResizeEnabled(value)
  }, [])

  const [isResizing, setResizing] = useState(false)
  const handleResizing = useCallback((value: boolean) => {
    setResizing(value)
  }, [])

  // disable draggable when editing
  useLayoutEffect(() => {
    toggleDraggable(data.id, !isEditing)
  }, [data.id, isEditing, toggleDraggable])

  const contextValue = useMemo(
    () => ({
      data,
      xPos,
      yPos,
      isEditing,
      handleSetEditing,
      isResizeEnabled,
      handleResize,
      isResizing,
      handleResizing,
    }),
    [
      data,
      xPos,
      yPos,
      isEditing,
      handleSetEditing,
      isResizeEnabled,
      handleResize,
      isResizing,
      handleResizing,
    ],
  )

  return (
    <SpeechBallonContext.Provider value={contextValue}>{children}</SpeechBallonContext.Provider>
  )
}
