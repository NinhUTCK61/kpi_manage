import { TextAlign, ViewPortAction } from '@/features/node/constant'
import { useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
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
import { useEffect, useMemo, useState } from 'react'

const ChooseStyleText: React.FC = () => {
  const [bold, setBold] = useState<boolean>(false)
  const [italic, setItalic] = useState<boolean>(false)
  const [textAlign, setTextAlign] = useState<TextAlign>('')
  const [child, setChild] = useState<boolean>(false)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const { mutate: update } = useNodeUpdateMutation()

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi') return

    return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setBold(false)
      setItalic(false)
      setTextAlign('')
      setChild(false)
      return
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setBold(nodeStyle.fontWeight === 'bold')
    setItalic(nodeStyle.fontStyle === 'italic')
    setTextAlign(nodeStyle.textAlign || '')
  }, [nodeFocusedMemo])

  const setNodeFocused = useRFStore((state) => state.setNodeFocused)

  const handleChangeTextAlign = (value: TextAlign) => {
    let _value: TextAlign = ''
    if (value === textAlign) {
      _value = ''
    } else {
      _value = value
    }
    setTextAlign(_value)
    return _value
  }

  const handleChangeStyle = (key: string) => {
    if (!nodeFocusedMemo) return

    const _bold = !bold
    const _italic = !italic
    let _textAlign = ''
    const _child = !child
    switch (key) {
      case 'bold':
        setBold(_bold)
        break
      case 'italic':
        setItalic(_italic)
        break
      case 'left':
        _textAlign = handleChangeTextAlign('left')
        break
      case 'center':
        _textAlign = handleChangeTextAlign('center')
        break
      case 'right':
        _textAlign = handleChangeTextAlign('right')
        break
      case 'child':
        setChild(_child)
        break
      default:
        break
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const style = {
      ...nodeStyle,
      ...(key === 'bold' && { fontWeight: _bold ? 'bold' : 'normal' }),
      ...(key === 'italic' && { fontStyle: _italic ? 'italic' : 'normal' }),
    }

    update(
      {
        id: nodeFocusedMemo.id,
        node_style: JSON.stringify({ ...style }),
      },
      {
        onSuccess(data) {
          setNodeFocused(data.id)
        },
      },
    )
  }

  const isShowForNode = viewportAction === ViewPortAction.Move
  const isShowForComment = viewportAction === ViewPortAction.Comment
  const isShowForSpeech = viewportAction === ViewPortAction.SpeechBallon

  const editors = [
    {
      key: 'bold',
      icon: EditorBold,
      iconActive: EditorBoldActive,
      active: bold,
      handle: () => handleChangeStyle('bold'),
      show: isShowForNode,
    },
    {
      key: 'italic',
      icon: EditorItalic,
      iconActive: EditorItalicActive,
      active: italic,
      handle: () => handleChangeStyle('italic'),
      show: isShowForNode,
    },
    {
      key: 'left',
      icon: EditorLeft,
      iconActive: EditorLeftActive,
      active: textAlign === 'left',
      handle: () => handleChangeStyle('left'),
      type: isShowForComment || isShowForSpeech,
    },
    {
      key: 'center',
      icon: EditorCenter,
      iconActive: EditorCenterActive,
      active: textAlign === 'center',
      handle: () => handleChangeStyle('center'),
      type: isShowForComment || isShowForSpeech,
    },
    {
      key: 'right',
      icon: EditorRight,
      iconActive: EditorRightActive,
      active: textAlign === 'right',
      handle: () => handleChangeStyle('right'),
      type: isShowForComment || isShowForSpeech,
    },
    {
      key: 'child',
      icon: EditorChild,
      iconActive: EditorChildActive,
      active: child,
      handle: () => handleChangeStyle('child'),
      type: isShowForComment || isShowForSpeech,
    },
  ]

  return (
    <Stack direction="row" spacing={0.5} mr={3}>
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={editor.active ? editor.iconActive : editor.icon}
          alt={editor.key}
          style={{
            ...(editor.show
              ? { cursor: 'pointer' }
              : {
                  cursor: 'not-allowed',
                  opacity: 0.5,
                  pointerEvents: 'none',
                }),
          }}
          onClick={editor.handle}
        />
      ))}
    </Stack>
  )
}

export { ChooseStyleText }
