import { StyleText, ViewPortAction } from '@/features/node/constant'
import { useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
import Image from 'next/image'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorBoldActive from 'public/assets/svgs/editor_bold_active.svg'
import EditorItalic from 'public/assets/svgs/editor_italic.svg'
import EditorItalicActive from 'public/assets/svgs/editor_italic_active.svg'
import { useEffect, useMemo, useState } from 'react'
import { StackEditor } from './StackEditor'

const editors = [
  {
    key: StyleText.Bold,
    icon: EditorBold,
    iconActive: EditorBoldActive,
  },
  {
    key: StyleText.Italic,
    icon: EditorItalic,
    iconActive: EditorItalicActive,
  },
]

const ChooseStyleText: React.FC = () => {
  const [styleText, setStyleText] = useState({
    [StyleText.Bold]: 'normal',
    [StyleText.Italic]: 'normal',
  })

  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { mutate: update } = useNodeUpdateMutation()

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type === 'kpi' || nodeFocused?.type === 'speech_ballon') return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setStyleText({
      bold: nodeStyle.fontWeight || 'normal',
      italic: nodeStyle.fontStyle || 'normal',
    })
  }, [nodeFocusedMemo])

  const handleChangeStyle = (key: StyleText) => {
    if (!nodeFocusedMemo) return

    const _styleText = {
      ...styleText,
      [key]: styleText[key] === 'normal' ? key : 'normal',
    }

    setStyleText({
      ..._styleText,
    })

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const style = {
      ...nodeStyle,
      fontStyle: _styleText.italic,
      fontWeight: _styleText.bold,
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
  const isShowForSpeechBallon = viewportAction === ViewPortAction.SpeechBallon

  return (
    <StackEditor
      direction="row"
      spacing={0.5}
      mr={0.5}
      disabled={!(isShowForNode || isShowForSpeechBallon)}
    >
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={styleText[editor.key] !== 'normal' ? editor.iconActive : editor.icon}
          alt={editor.key}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleChangeStyle(editor.key)}
        />
      ))}
    </StackEditor>
  )
}

export { ChooseStyleText }
