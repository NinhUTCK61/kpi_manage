import { useRFStore } from '@/libs/react-flow'
import { Stack, styled } from '@mui/material'
import Image from 'next/image'
import RedoIcon from 'public/assets/svgs/redo.svg'
import UndoIcon from 'public/assets/svgs/undo_active.svg'
import { memo } from 'react'
import { ChooseStyleAlignText } from './ChooseAlignText'
import { ChooseFontSize } from './ChooseFontSize'
import { ChooseShape } from './ChooseShape'
import { ChooseStroke } from './ChooseStroke'
import { ChooseStyleText } from './ChooseStyleText'
import { ChooseTypeLayout } from './ChooseTypeLayout'
import { HelperFormula } from './HelperFormula'
import { PickColorNode } from './PickColorNode'
import { PickColorShape } from './PickColorShape'
import { ViewportAction } from './ViewportAction'

const TOOLBAR_HEIGHT = 60

export const ToolbarInner: React.FC = () => {
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={2} mr={3}>
          <Image src={UndoIcon} alt="undo" style={{ cursor: 'pointer' }} />

          <Image src={RedoIcon} alt="undo" />
        </Stack>

        <Stack direction="row" id="choose-style-area">
          <Stack
            direction="row"
            {...(!nodeFocused && {
              style: {
                opacity: 0.3,
                pointerEvents: 'none',
              },
            })}
            alignItems="center"
          >
            <ChooseFontSize />

            <ChooseStyleText />

            <ChooseStyleAlignText />

            <PickColorNode />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{
              ...(nodeFocused?.type !== 'speech_ballon' && {
                opacity: 0.3,
                pointerEvents: 'none',
              }),
            }}
          >
            <ChooseStroke />

            <PickColorShape />

            <ChooseTypeLayout />

            <ChooseShape />
          </Stack>
        </Stack>

        <HelperFormula />
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

export { TOOLBAR_HEIGHT, Toolbar }
