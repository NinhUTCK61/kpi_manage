import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { SpeechBallonContext } from '../context'

export type ArrowResizeType = {
  widthArrow: number | null
  heightArrow: number | null
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

  const [arrowResize, setArrowResize] = useState<ArrowResizeType>({
    widthArrow: null,
    heightArrow: null,
  })
  const handleArrowResize = useCallback((size: ArrowResizeType) => {
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
      arrowResize,
      handleArrowResize,
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
      arrowResize,
      handleArrowResize,
    ],
  )

  return (
    <SpeechBallonContext.Provider value={contextValue}>{children}</SpeechBallonContext.Provider>
  )
}
