import { TextAlign, ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow'
import { Stack } from '@mui/material'
import Image from 'next/image'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorCenterActive from 'public/assets/svgs/editor_center_active.svg'
import EditorChild from 'public/assets/svgs/editor_child.svg'
import EditorChildActive from 'public/assets/svgs/editor_child_active.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorLeftActive from 'public/assets/svgs/editor_left_active.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import EditorRightActive from 'public/assets/svgs/editor_right_active.svg'
import { useEffect, useMemo, useState } from 'react'

const ChooseStyleAlignText: React.FC = () => {
  const [textAlign, setTextAlign] = useState<TextAlign>('')
  const [child, setChild] = useState<boolean>(false)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi') return

    return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setTextAlign('')
      setChild(false)
      return
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setTextAlign(nodeStyle.textAlign || '')
  }, [nodeFocusedMemo])

  const handleChangeTextAlign = (value: TextAlign) => {
    let _value: TextAlign = ''
    if (value !== textAlign) {
      _value = value
    }
    setTextAlign(_value)
  }

  const handleChangeStyle = (key: string) => {
    if (!nodeFocusedMemo) return
    const _child = !child
    switch (key) {
      case 'child':
        setChild(_child)
        break
      default:
        handleChangeTextAlign(key as TextAlign)
        break
    }
  }

  const isShowForComment = viewportAction === ViewPortAction.Comment
  const isShowForSpeech = viewportAction === ViewPortAction.SpeechBallon

  const editors = [
    {
      key: 'left',
      icon: EditorLeft,
      iconActive: EditorLeftActive,
      active: textAlign === 'left',
    },
    {
      key: 'center',
      icon: EditorCenter,
      iconActive: EditorCenterActive,
      active: textAlign === 'center',
    },
    {
      key: 'right',
      icon: EditorRight,
      iconActive: EditorRightActive,
      active: textAlign === 'right',
    },
    {
      key: 'child',
      icon: EditorChild,
      iconActive: EditorChildActive,
      active: child,
    },
  ]

  return (
    <Stack
      direction="row"
      spacing={0.5}
      mr={3}
      {...(!(isShowForComment || isShowForSpeech) && {
        sx: {
          cursor: 'not-allowed',
          opacity: 0.3,
          pointerEvents: 'none',
        },
      })}
    >
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={editor.active ? editor.iconActive : editor.icon}
          alt={editor.key}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleChangeStyle(editor.key)}
        />
      ))}
    </Stack>
  )
}

export { ChooseStyleAlignText }
