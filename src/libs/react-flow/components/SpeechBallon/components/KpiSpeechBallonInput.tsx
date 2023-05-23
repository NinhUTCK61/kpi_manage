import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Popover, Stack, styled } from '@mui/material'
import React from 'react'
import { OptionShape } from './OptionShape'

const KpiSpeechBallonInput: React.FC = () => {
  const activePosition = useRFStore((state) => state.activePosition)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setActivePosition = useRFStore((state) => state.setActivePosition)

  const isOpen = !!activePosition && viewportAction === ViewPortAction.SpeechBallon

  const handleClose = () => {
    setActivePosition(null)
  }

  return (
    <SpeechBallonPopover
      elevation={0}
      open={isOpen}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        !!activePosition ? { top: activePosition.y - 50, left: activePosition.x - 50 } : undefined
      }
    >
      <Stack spacing={0.5}>
        <OptionShape />
      </Stack>
    </SpeechBallonPopover>
  )
}

export { KpiSpeechBallonInput }

const SpeechBallonPopover = styled(Popover)({
  '.MuiPopover-paper': {
    boxShadow: 'none',
    overflow: 'initial',
  },
})
