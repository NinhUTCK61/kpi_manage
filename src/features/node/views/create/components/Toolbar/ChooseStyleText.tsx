import { FontStyle, FontWeight, StyleText, ViewPortAction } from '@/features/node/constant'
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
    key: StyleText.FontWeight,
    icon: EditorBold,
    activeIcon: EditorBoldActive,
    value: FontWeight.Bold,
  },
  {
    key: StyleText.FontStyle,
    icon: EditorItalic,
    activeIcon: EditorItalicActive,
    value: FontStyle.Italic,
  },
]

const ChooseStyleText: React.FC = () => {
  const [styleText, setStyleText] = useState({
    [StyleText.FontWeight]: FontWeight.Normal,
    [StyleText.FontStyle]: FontStyle.Normal,
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
      setStyleText({
        fontWeight: FontWeight.Normal,
        fontStyle: FontStyle.Normal,
      })

      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setStyleText({
      fontWeight: nodeStyle.fontWeight || FontWeight.Normal,
      fontStyle: nodeStyle.fontStyle || FontStyle.Normal,
    })
  }, [nodeFocusedMemo])

  const handleChangeStyle = (key: StyleText, value: FontStyle | FontWeight) => {
    if (!nodeFocusedMemo) return

    const _styleText = {
      ...styleText,
      [key]: styleText[key] === value ? 'normal' : value,
    }

    setStyleText(_styleText)

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const style = {
      ...nodeStyle,
      ..._styleText,
    }

    console.log(2222, style)

    update(
      {
        id: nodeFocusedMemo.id,
        node_style: JSON.stringify(style),
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
      {editors.map(({ key, value, icon, activeIcon }) => (
        <Image
          key={key}
          src={styleText[key] !== 'normal' ? activeIcon : icon}
          alt={key}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleChangeStyle(key, value)}
        />
      ))}
    </StackEditor>
  )
}

export { ChooseStyleText }
