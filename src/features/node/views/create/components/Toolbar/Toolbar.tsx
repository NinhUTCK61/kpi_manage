import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow'
import { Stack, styled } from '@mui/material'
import Image from 'next/image'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorChild from 'public/assets/svgs/editor_child.svg'
import EditorQuote from 'public/assets/svgs/editor_double_quote.svg'
import EditorItalic from 'public/assets/svgs/editor_italic.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import RedoIcon from 'public/assets/svgs/redo.svg'
import UndoIcon from 'public/assets/svgs/undo_active.svg'
import { memo } from 'react'
import { ChooseFontSize } from './ChooseFontSize'
import { ChooseShape } from './ChooseShape'
import { ChooseStroke } from './ChooseStroke'
import { PickColorNode } from './PickColorNode'
import { PickColorShape } from './PickColorShape'
import { ViewportAction } from './ViewportAction'

const TOOLBAR_HEIGHT = 60

const editors = [
  { key: 'bold', icon: EditorBold },
  { key: 'italic', icon: EditorItalic },
  { key: 'quote', icon: EditorQuote },
  { key: 'left', icon: EditorLeft },
  { key: 'center', icon: EditorCenter },
  { key: 'right', icon: EditorRight },
  { key: 'child', icon: EditorChild },
]

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
          <Stack direction="row" spacing={0.5} mr={3}>
            {editors.map((editor) => (
              <Image
                key={editor.key}
                src={editor.icon}
                alt={editor.key}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>

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
