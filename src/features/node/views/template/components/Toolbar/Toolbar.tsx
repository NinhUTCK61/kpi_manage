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
import { ChoseFontSize } from './ChoseFontSize'
import { PickColor } from './PickColor'

import { ChoseShape } from './ChoseShape'
import { ChoseStroke } from './ChoseStroke'
import { ViewportAction } from './ViewportAction'

const HEIGHT_TOOLBAR = 60

const editors = [
  { key: 'bold', icon: EditorBold },
  { key: 'italic', icon: EditorItalic },
  { key: 'quote', icon: EditorQuote },
  { key: 'left', icon: EditorLeft },
  { key: 'center', icon: EditorCenter },
  { key: 'right', icon: EditorRight },
  { key: 'child', icon: EditorChild },
]

export const ToolbarMemo: React.FC = () => {
  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={2} mr={3}>
          <Image src={UndoIcon} alt="undo" />

          <Image src={RedoIcon} alt="undo" />
        </Stack>

        <ChoseFontSize />

        <Stack direction="row" spacing={0.5} mr={3}>
          {editors.map((editor) => (
            <Image key={editor.key} src={editor.icon} alt={editor.key} />
          ))}
        </Stack>

        <PickColor mr={3} />

        <Stack direction="row" alignItems="center">
          <ChoseStroke />

          <PickColor forShape mr={1} />

          <ChoseShape />
        </Stack>
      </Stack>

      <ViewportAction />
    </Container>
  )
}

const Container = styled(Stack)(({ theme }) => ({
  height: HEIGHT_TOOLBAR,
  backgroundColor: theme.palette.greyScale[100],
  padding: theme.spacing(2.5),
  flexDirection: 'row',
  alginItems: 'center',
  justifyContent: 'space-between',
}))

const Toolbar = memo(ToolbarMemo) as typeof ToolbarMemo

export { Toolbar, HEIGHT_TOOLBAR }
