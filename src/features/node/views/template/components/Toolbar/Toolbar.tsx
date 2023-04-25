import { Stack, styled } from '@mui/material'
import Image from 'next/image'
import AddSpeechIcon from 'public/assets/svgs/add_speech.svg'
import AddSpeechActiveIcon from 'public/assets/svgs/add_speech_active.svg'
import CommentIcon from 'public/assets/svgs/comment_tools.svg'
import CommentActiveIcon from 'public/assets/svgs/comment_tools_active.svg'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorChild from 'public/assets/svgs/editor_child.svg'
import EditorQuote from 'public/assets/svgs/editor_double_quote.svg'
import EditorItalic from 'public/assets/svgs/editor_italic.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import HandIcon from 'public/assets/svgs/hand_tools.svg'
import HandActiveIcon from 'public/assets/svgs/hand_tools_active.svg'
import MoveIcon from 'public/assets/svgs/move_tools.svg'
import MoveActiveIcon from 'public/assets/svgs/move_tools_active.svg'
import RedoIcon from 'public/assets/svgs/redo.svg'
import UndoIcon from 'public/assets/svgs/undo_active.svg'
import { useState } from 'react'
import { ActionTypes } from '../../Template'
import { ChoseFontSize } from './ChoseFontSize'
import { PickColor } from './PickColor'

const HEIGHT_TOOLBAR = 60

import { ChoseShape } from './ChoseShape'
import { ChoseStroke } from './ChoseStroke'

type ToolbarTypes = {
  handleChangeOption(option: keyof ActionTypes): void
  action: ActionTypes
  color: string
  handleChangeColor(color: string): void
  stroke: number
  handleChangeStroke(stroke: number): void
  colorShape: string
  handleChangeColorShape(color: string): void
  shape: string
  handleChangeShape(shape: string): void
}

const Toolbar: React.FC<ToolbarTypes> = ({
  action,
  color,
  shape,
  colorShape,
  stroke,
  handleChangeOption,
  handleChangeColor,
  handleChangeColorShape,
  handleChangeShape,
  handleChangeStroke,
}) => {
  const [size, setSize] = useState<string>('12')
  const actions = [
    {
      key: `move`,
      icon: action.move ? MoveActiveIcon : MoveIcon,
    },
    {
      key: `pan`,
      icon: action.pan ? HandActiveIcon : HandIcon,
    },
    {
      key: `comment`,
      icon: action.comment ? CommentActiveIcon : CommentIcon,
    },
    {
      key: `speech`,
      icon: action.speech ? AddSpeechActiveIcon : AddSpeechIcon,
    },
  ]

  const handleChangeSize = (value: string) => {
    setSize(value)
  }

  const editors = [
    { key: 'bold', icon: EditorBold },
    { key: 'italic', icon: EditorItalic },
    { key: 'quote', icon: EditorQuote },
    { key: 'left', icon: EditorLeft },
    { key: 'center', icon: EditorCenter },
    { key: 'right', icon: EditorRight },
    { key: 'child', icon: EditorChild },
  ]

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={2} mr={3}>
          <Image src={UndoIcon} alt="undo" />

          <Image src={RedoIcon} alt="undo" />
        </Stack>

        <ChoseFontSize value={size} handleChange={handleChangeSize} />

        <Stack direction="row" spacing={0.5} mr={3}>
          {editors.map((editor) => (
            <Image key={editor.key} src={editor.icon} alt={editor.key} />
          ))}
        </Stack>

        <PickColor color={color} handleChangeColor={handleChangeColor} mr={3} />

        <Stack
          direction="row"
          alignItems="center"
          sx={{ opacity: action.speech ? 1 : 0.3, pointerEvents: action.speech ? 'auto' : 'none' }}
        >
          <ChoseStroke stroke={stroke} handleChangeStroke={handleChangeStroke} />

          <PickColor
            forShape
            color={colorShape}
            handleChangeColor={handleChangeColorShape}
            mr={1}
          />

          <ChoseShape shape={shape} handleChangeShape={handleChangeShape} />
        </Stack>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        {actions.map((action) => (
          <ImageCursor
            key={action.key}
            alt={action.key}
            src={action.icon}
            onClick={() => handleChangeOption(action.key as keyof ActionTypes)}
          />
        ))}
      </Stack>
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

const ImageCursor = styled(Image)({ cursor: 'pointer' })

export { Toolbar, HEIGHT_TOOLBAR }
