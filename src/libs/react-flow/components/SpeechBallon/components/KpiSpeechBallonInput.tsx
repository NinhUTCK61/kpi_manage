import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { Popover, Stack, styled } from '@mui/material'
import { FC, memo, useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonProvider } from '../context'
import { OptionShape } from './OptionShape'

const KpiSpeechBallonInputInner: FC = () => {
  const activePosition = useRFStore((state) => state.activePosition)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setActivePosition = useRFStore((state) => state.setActivePosition)

  const isOpen = !!activePosition && viewportAction === ViewPortAction.SpeechBallon

  const handleClose = () => {
    setActivePosition(null)
  }

  const contextValue = useMemo(() => ({}), [])

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
        <SpeechBallonProvider value={contextValue as NodeProps<SpeechBallonNodeType>}>
          <OptionShape />
        </SpeechBallonProvider>
      </Stack>
    </SpeechBallonPopover>
  )
}

export const KpiSpeechBallonInput = memo(KpiSpeechBallonInputInner)

const SpeechBallonPopover = styled(Popover)({
  '.MuiPopover-paper': {
    overflow: 'initial',
  },
})
