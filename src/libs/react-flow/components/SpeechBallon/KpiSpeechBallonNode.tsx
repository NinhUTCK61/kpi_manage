import { ViewPortAction } from '@/features/node'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { SpeechBallonNodeType } from '../../types'
import { SpeechBallonResizer } from './components'
import { ContextMenu } from './components/ContextMenu'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonNodeProvider } from './components/SpeechBallonNodeProvider'

type KpiSpeechBallonNodeProps = NodeProps<SpeechBallonNodeType>

const KpiSpeechBallonNodeInner: React.FC<KpiSpeechBallonNodeProps> = ({ data, xPos, yPos }) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const changeViewportAction = useRFStore((state) => state.changeViewportAction)

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
    changeViewportAction(ViewPortAction.SpeechBallon)
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <SpeechBallonNodeProvider data={data} xPos={xPos} yPos={yPos}>
      <Stack onContextMenu={handleContextMenu} height="100%" direction="column" alignItems="center">
        <SpeechBallonResizer />

        <OptionShape />

        <ContextMenu
          open={!!contextMenu}
          onClose={handleClose}
          anchorPosition={
            !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        />
      </Stack>
    </SpeechBallonNodeProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(KpiSpeechBallonNodeInner)
