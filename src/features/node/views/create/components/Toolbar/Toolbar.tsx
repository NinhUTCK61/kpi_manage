import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow'
import { Stack, styled } from '@mui/material'
import Image from 'next/image'
import RedoIcon from 'public/assets/svgs/redo.svg'
import UndoIcon from 'public/assets/svgs/undo_active.svg'
import { memo } from 'react'
import { ChooseFontSize } from './ChooseFontSize'
import { ChooseShape } from './ChooseShape'
import { ChooseStroke } from './ChooseStroke'
import { ChooseStyleText } from './ChooseStyleText'
import { PickColorNode } from './PickColorNode'
import { PickColorShape } from './PickColorShape'
import { ViewportAction } from './ViewportAction'

const TOOLBAR_HEIGHT = 60

export const ToolbarInner: React.FC = () => {
  const viewportAction = useRFStore((state) => state.viewportAction)
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={2} mr={3}>
          <Image src={UndoIcon} alt="undo" style={{ cursor: 'pointer' }} />

          <Image src={RedoIcon} alt="undo" />
        </Stack>
        <Stack
          direction="row"
          {...(!nodeFocused && {
            style: {
              opacity: 0.3,
              pointerEvents: 'none',
            },
          })}
        >
          <ChooseFontSize />

          <ChooseStyleText />

          <PickColorNode />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            ...(viewportAction !== ViewPortAction.SpeechBallon && {
              opacity: 0.3,
              pointerEvents: 'none',
            }),
          }}
        >
          <ChooseStroke />

          <PickColorShape />

          <ChooseShape />
        </Stack>
      </Stack>

      <ViewportAction />
    </Container>
  )
}

const Container = styled(Stack)(({ theme }) => ({
  height: TOOLBAR_HEIGHT,
  backgroundColor: theme.palette.greyScale[100],
  padding: theme.spacing(2.5),
  flexDirection: 'row',
  alginItems: 'center',
  justifyContent: 'space-between',
}))

const Toolbar = memo(ToolbarInner) as typeof ToolbarInner

export { Toolbar, TOOLBAR_HEIGHT }
