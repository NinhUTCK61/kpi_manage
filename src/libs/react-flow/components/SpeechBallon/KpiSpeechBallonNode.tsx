import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import { NodeProps, NodeResizer } from 'reactflow'
import { SpeechBallonNodeType } from '../../types'
import { ContextMenu } from './components/ContextMenu'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonProvider } from './context'

type KpiSpeechBallonNodeProps = NodeProps<SpeechBallonNodeType>

const KpiSpeechBallonNodeInner: React.FC<KpiSpeechBallonNodeProps> = ({ data, xPos, yPos }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)

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

  const contextValue = useMemo(
    () => ({ data, xPos, yPos, isEditing, handleSetEditing }),
    [data, xPos, yPos, isEditing, handleSetEditing],
  )

  return (
    <SpeechBallonProvider value={contextValue}>
      <Stack onContextMenu={handleContextMenu} height="100%">
        <NodeResizer minWidth={234} minHeight={48} />

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
