import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Menu, Stack, styled } from '@mui/material'
import React from 'react'
import { OptionShape } from './OptionShape'

const KpiSpeechBallonContext: React.FC = () => {
  const activePosition = useRFStore((state) => state.activePosition)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setActivePosition = useRFStore((state) => state.setActivePosition)

  const isOpen = !!activePosition && viewportAction === ViewPortAction.SpeechBallon

  const handleClose = () => {
    setActivePosition(null)
  }

  return (
    <MuiMenuContext
      open={isOpen}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        !!activePosition ? { top: activePosition.y, left: activePosition.x } : undefined
      }
    >
      <Stack spacing={0.5}>
        <OptionShape />
      </Stack>
    </MuiMenuContext>
  )
}

export { KpiSpeechBallonContext }

const MuiMenuContext = styled(Menu)(({ theme }) => ({
  '.MuiMenu-paper': {
    boxShadow: 'none',
    overflow: 'initial',
  },
}))
