import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener, Popper, Stack, styled } from '@mui/material'
import { FC, memo, useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonProvider } from '../context'
import { OptionShape } from './OptionShape'

const KpiSpeechBallonInputInner: FC = () => {
  const activePosition = useRFStore((state) => state.activePosition)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setActivePosition = useRFStore((state) => state.setActivePosition)
  const container = useRFStore((state) => state.container)

  const isOpen = !!activePosition && viewportAction === ViewPortAction.SpeechBallon

  const handleClose = () => {
    setActivePosition(null)
  }

  const x = activePosition?.x ?? 0
  const y = activePosition?.y ?? 0

  const contextValue = useMemo(() => ({}), [])
  return (
    <Popper
      open={isOpen}
      anchorEl={{
        contextElement: container as Element,
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          top: y,
          right: x,
          bottom: y,
          left: x,
          x,
          y,
          toJSON: () => null,
        }),
      }}
      placement="top-start"
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [-30, 20],
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Stack spacing={0.5}>
          <SpeechBallonProvider value={contextValue as NodeProps<SpeechBallonNodeType>}>
            <OptionShape />
          </SpeechBallonProvider>
        </Stack>
      </ClickAwayListener>
      <Arrow />
    </Popper>
  )
}

export const KpiSpeechBallonInput = memo(KpiSpeechBallonInputInner)

export const Arrow = styled('div')(({ theme }) => ({
  position: 'absolute',
  content: '""',
  left: 30,
  borderLeft: '12px solid transparent',
  borderRight: '12px solid transparent',
  borderTop: `20px solid ${theme.palette.customPrimary[600]}`,
  height: 22,
  width: 20,
}))
