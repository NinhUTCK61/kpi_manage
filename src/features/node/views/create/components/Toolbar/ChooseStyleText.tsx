import { TextAlign } from '@/features/node/constant'
import { Stack } from '@mui/material'
import Image from 'next/image'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorBoldActive from 'public/assets/svgs/editor_bold_active.svg'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorCenterActive from 'public/assets/svgs/editor_center_active.svg'
import EditorChild from 'public/assets/svgs/editor_child.svg'
import EditorChildActive from 'public/assets/svgs/editor_child_active.svg'
import EditorItalic from 'public/assets/svgs/editor_italic.svg'
import EditorItalicActive from 'public/assets/svgs/editor_italic_active.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorLeftActive from 'public/assets/svgs/editor_left_active.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import EditorRightActive from 'public/assets/svgs/editor_right_active.svg'
import { useState } from 'react'

const ChooseStyleText: React.FC = () => {
  const [bold, setBold] = useState<boolean>(false)
  const [italic, setItalic] = useState<boolean>(false)
  const [textAlign, setTextAlign] = useState<TextAlign>('')
  const [child, setChild] = useState<boolean>(false)

  const handleChangeTextAlign = (value: TextAlign) => {
    let _value: TextAlign = ''
    if (value === textAlign) {
      _value = ''
    } else {
      _value = value
    }
    setTextAlign(_value)
  }

  const editors = [
    {
      key: 'bold',
      icon: EditorBold,
      iconActive: EditorBoldActive,
      active: bold,
      handle: () => setBold(!bold),
    },
    {
      key: 'italic',
      icon: EditorItalic,
      iconActive: EditorItalicActive,
      active: italic,
      handle: () => setItalic(!italic),
    },
    {
      key: 'left',
      icon: EditorLeft,
      iconActive: EditorLeftActive,
      active: textAlign === 'left',
      handle: () => handleChangeTextAlign('left'),
    },
    {
      key: 'center',
      icon: EditorCenter,
      iconActive: EditorCenterActive,
      active: textAlign === 'center',
      handle: () => handleChangeTextAlign('center'),
    },
    {
      key: 'right',
      icon: EditorRight,
      iconActive: EditorRightActive,
      active: textAlign === 'right',
      handle: () => handleChangeTextAlign('right'),
    },
    {
      key: 'child',
      icon: EditorChild,
      iconActive: EditorChildActive,
      active: child,
      handle: () => setChild(!child),
    },
  ]

  return (
    <Stack direction="row" spacing={0.5} mr={3}>
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={editor.active ? editor.iconActive : editor.icon}
          alt={editor.key}
          style={{ cursor: 'pointer' }}
          onClick={editor.handle}
        />
      ))}
    </Stack>
  )
}

export { ChooseStyleText }
