import { UndoRedo } from '@/features/node/views/create/components/Toolbar/UndoRedo'
import { useRFStore } from '@/libs/react-flow'
import { Stack, styled } from '@mui/material'
import { FC, memo } from 'react'
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

export const ToolbarInner: FC = () => {
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <UndoRedo />

        <Stack direction="row" id="choose-style-area">
          <Stack
            direction="row"
            {...((!nodeFocused || nodeFocused?.type === 'comment') && {
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
  padding: theme.spacing(0, 2),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 5,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.greyScale[300],
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.greyScale[700],
  },
  position: 'sticky',
}))

const Toolbar = memo(ToolbarInner) as typeof ToolbarInner

export { TOOLBAR_HEIGHT, Toolbar }
