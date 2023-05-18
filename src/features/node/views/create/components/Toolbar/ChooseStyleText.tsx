import { ViewPortAction } from '@/features/node/constant'
import { useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
import { Stack } from '@mui/material'
import Image from 'next/image'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorBoldActive from 'public/assets/svgs/editor_bold_active.svg'
import EditorItalic from 'public/assets/svgs/editor_italic.svg'
import EditorItalicActive from 'public/assets/svgs/editor_italic_active.svg'
import { useEffect, useMemo, useState } from 'react'

const ChooseStyleText: React.FC = () => {
  const [bold, setBold] = useState<boolean>(false)
  const [italic, setItalic] = useState<boolean>(false)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { mutate: update } = useNodeUpdateMutation()

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi') return

    return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setBold(false)
      setItalic(false)
      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return
    setBold(nodeStyle.fontWeight === 'bold')
    setItalic(nodeStyle.fontStyle === 'italic')
  }, [nodeFocusedMemo])

  const handleChangeStyle = (key: string) => {
    if (!nodeFocusedMemo) return
    const _bold = !bold
    const _italic = !italic
    switch (key) {
      case 'bold':
        setBold(_bold)
        break
      case 'italic':
        setItalic(_italic)
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

  const editors = [
    {
      key: 'bold',
      icon: EditorBold,
      iconActive: EditorBoldActive,
      active: bold,
    },
    {
      key: 'italic',
      icon: EditorItalic,
      iconActive: EditorItalicActive,
      active: italic,
    },
  ]

  return (
    <Stack
      direction="row"
      spacing={0.5}
      mr={0.5}
      {...(!isShowForNode && {
        cursor: 'not-allowed',
        opacity: 0.3,
        pointerEvents: 'none',
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

export { ChooseStyleText }
