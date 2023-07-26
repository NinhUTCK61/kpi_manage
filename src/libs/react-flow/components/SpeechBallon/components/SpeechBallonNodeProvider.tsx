import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { SpeechBallonContext } from '../context'

export type ArrowResizeType = {
  width: number
  height: number
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
  const handleSetEditing = useCallback((value: boolean) => {
    setEditing(value)
  }, [])

  const [isResizing, setResizing] = useState(false)
  const [isResizeEnabled, setResizeEnabled] = useState(false)
  const handleResize = useCallback((value: boolean) => {
    setResizeEnabled(value)
  }, [])

  const handleResizing = useCallback((value: boolean) => {
    setResizing(value)
  }, [])

  const [shapeResize, setArrowResize] = useState<ArrowResizeType>({ width: 0, height: 0 })
  const handleShapeResize = useCallback((size: ArrowResizeType) => {
    setArrowResize(size)
  }, [])

  // disable draggable when editing
  useLayoutEffect(() => {
    toggleDraggable(data.id, !isEditing && !isResizeEnabled)
  }, [data.id, isEditing, toggleDraggable, isResizeEnabled])

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
      shapeResize,
      handleShapeResize,
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
      handleShapeResize,
      shapeResize,
    ],
  )

  return (
    <SpeechBallonContext.Provider value={contextValue}>{children}</SpeechBallonContext.Provider>
  )
}
