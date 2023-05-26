import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonNodeType } from '../../types'
import { ContextMenu } from './components/ContextMenu'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonProvider } from './context'

type KpiSpeechBallonNodeProps = NodeProps<SpeechBallonNodeType>

const KpiSpeechBallonNodeInner: React.FC<KpiSpeechBallonNodeProps> = ({ data, xPos, yPos }) => {
  const [typeContext, setTypeContext] = useState<string | null>(null)

  const contextValue = useMemo(
    () => ({ data, xPos, yPos, typeContext, setTypeContext }),
    [data, xPos, yPos, typeContext, setTypeContext],
  )

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
  return (
    <SpeechBallonProvider value={contextValue}>
      <Stack onContextMenu={handleContextMenu}>
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
