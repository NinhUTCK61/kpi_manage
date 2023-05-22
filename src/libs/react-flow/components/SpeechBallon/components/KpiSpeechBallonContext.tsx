import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { Menu, Stack, styled } from '@mui/material'
import React from 'react'
import { shallow } from 'zustand/shallow'
import { OptionShape } from './OptionShape'

const storeSelector = (state: RFStore) => ({
  position: state.position,
  handleCloseSpeechBallon: state.handleCloseSpeechBallon,
  containerRef: state.containerRef,
})
const KpiSpeechBallonContext: React.FC = () => {
  const { position, handleCloseSpeechBallon } = useRFStore(storeSelector, shallow)

  return (
    <MuiMenuContext
      open={!!position}
      onClose={handleCloseSpeechBallon}
      anchorReference="anchorPosition"
      anchorPosition={!!position ? { top: position.y, left: position.x } : undefined}
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
