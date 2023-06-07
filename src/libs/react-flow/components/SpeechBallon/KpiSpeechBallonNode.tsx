import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { NodeProps, NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { useOnClickOutside } from 'usehooks-ts'
import { useRFStore } from '../../hooks'
import { SpeechBallonNodeType } from '../../types'
import { ContextMenu } from './components/ContextMenu'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonProvider } from './context'
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

  const [isSetSize, setSize] = useState(false)
  const handleSetSize = useCallback((value: boolean) => {
    setSize(value)
  }, [])

  const contextValue = useMemo(
    () => ({
      data,
      xPos,
      yPos,
      isEditing,
      handleSetEditing,
      isSetSize,
      handleSetSize,
    }),
    [data, xPos, yPos, isEditing, handleSetEditing, isSetSize, handleSetSize],
  )

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const onUpdateSize = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocused) return
    if (nodeFocused.type === 'speech_ballon') {
      const nodeStyle = JSON.parse(nodeFocused.data.node_style || '{}')

      const newNodeStyle = JSON.stringify({
        ...nodeStyle,
        width: `${params.width}px`,
        height: `${params.height}px`,
      })

      updateSpeechBallon({
        id: nodeFocused.id,
        node_style: newNodeStyle,
        x: params.x,
        y: params.y,
      })

      handleSetSize(false)
    }
  }

  const resizeRef = useRef(null)

  const handleCloseResize = () => {
    handleSetSize(false)
  }

  useOnClickOutside(resizeRef, handleCloseResize)

  return (
    <SpeechBallonProvider value={contextValue}>
      <Stack onContextMenu={handleContextMenu} height="100%" ref={resizeRef}>
        <NodeResizer
          minWidth={234}
          minHeight={48}
          handleStyle={{ width: 12, height: 12, zIndex: 100 }}
          lineStyle={{ padding: 2, zIndex: 100 }}
          isVisible={isSetSize}
          onResizeEnd={onUpdateSize}
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
    </SpeechBallonProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(KpiSpeechBallonNodeInner)
