import { ShapeType } from '@/features/node'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { NodeProps, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { useOnClickOutside } from 'usehooks-ts'
import { useRFStore } from '../../hooks'
import { SpeechBallonNodeType } from '../../types'
import { ContextMenu } from './components/ContextMenu'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonActionProvider, SpeechBallonProvider } from './context'
import { useUpdateSpeechBallonMutation } from './hooks'

type KpiSpeechBallonNodeProps = NodeProps<SpeechBallonNodeType>

const KpiSpeechBallonNodeInner: React.FC<KpiSpeechBallonNodeProps> = ({ data, xPos, yPos }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)

  const { mutate: updateSpeechBallon } = useUpdateSpeechBallonMutation()

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : null,
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

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

  const contextValue = useMemo(
    () => ({
      data,
      xPos,
      yPos,
      isEditing,
    }),
    [data, xPos, yPos, isEditing],
  )

  const actionContextValue = useMemo(
    () => ({
      handleSetEditing,
      isResizeEnabled,
      handleResize,
      isResizing,
      handleResizing,
    }),
    [handleSetEditing, isResizeEnabled, handleResize, isResizing, handleResizing],
  )

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const onUpdateResize = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocused) return
    if (nodeFocused.type === 'speech_ballon') {
      const nodeStyle = JSON.parse(nodeFocused.data.node_style || '{}')

      const newNodeStyle = JSON.stringify({
        ...nodeStyle,
        width: `${params.width}px`,
        height: `${params.height}px`,
      })

      const dataUpdate = {
        id: nodeFocused.id,
        node_style: newNodeStyle,
        x: params.x,
        y: params.y,
      }

      updateSpeechBallon(dataUpdate)
      handleResizing(false)
    }
  }

  const onResizing = (_: ResizeDragEvent) => {
    handleResizing(true)
  }

  const resizeRef = useRef(null)

  const handleCloseResize = (event: MouseEvent) => {
    const styleArea = document.getElementById('menu-speech-ballon')
    if (!styleArea?.contains(event.target as HTMLElement)) handleResize(false)
  }

  useOnClickOutside(resizeRef, handleCloseResize)

  const minSizeResize = {
    [ShapeType.SQUARE]: {
      minWidth: 190,
      minHeight: 190,
    },
    [ShapeType.CIRCULAR]: {
      minWidth: 190,
      minHeight: 190,
    },
    [ShapeType.MEDIUM_ROUND_SQUARE]: {
      minWidth: 190,
      minHeight: 190,
    },
    [ShapeType.ROUND_SQUARE]: {
      minWidth: 210,
      minHeight: 36,
    },
  }

  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const minSizeStyle = minSizeResize[shapeType]

  return (
    <SpeechBallonProvider value={contextValue}>
      <SpeechBallonActionProvider value={actionContextValue}>
        <Stack onContextMenu={handleContextMenu} height="100%" ref={resizeRef}>
          <NodeResizer
            minWidth={minSizeStyle.minWidth}
            minHeight={minSizeStyle.minHeight}
            handleStyle={{ width: 12, height: 12, zIndex: 100 }}
            lineStyle={{ padding: 2, zIndex: 100 }}
            isVisible={isResizeEnabled}
            onResizeEnd={onUpdateResize}
            onResize={onResizing}
          />

          <OptionShape />

          <ContextMenu
            open={!!contextMenu}
            onClose={handleClose}
            anchorPosition={
              !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
            }
          />
        </Stack>
      </SpeechBallonActionProvider>
    </SpeechBallonProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(KpiSpeechBallonNodeInner)
