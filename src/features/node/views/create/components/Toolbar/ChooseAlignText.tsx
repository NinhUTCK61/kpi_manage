import { TextAlign, ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow'
import Image from 'next/image'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorCenterActive from 'public/assets/svgs/editor_center_active.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorLeftActive from 'public/assets/svgs/editor_left_active.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import EditorRightActive from 'public/assets/svgs/editor_right_active.svg'
import { useEffect, useMemo, useState } from 'react'
import { StackEditor } from './StackEditor'

const editors = [
  {
    key: TextAlign.Left,
    icon: EditorLeft,
    iconActive: EditorLeftActive,
  },
  {
    key: TextAlign.Center,
    icon: EditorCenter,
    iconActive: EditorCenterActive,
  },
  {
    key: TextAlign.Right,
    icon: EditorRight,
    iconActive: EditorRightActive,
  },
]

const ChooseStyleAlignText: React.FC = () => {
  const [textAlign, setTextAlign] = useState<TextAlign>(TextAlign.Unset)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi') return

    return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setTextAlign(TextAlign.Unset)
      return
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setTextAlign(nodeStyle.textAlign || TextAlign.Unset)
  }, [nodeFocusedMemo])

  const handleChangeTextAlign = (value: TextAlign) => {
    setTextAlign(textAlign !== value ? value : TextAlign.Unset)
  }

  const isShowForSpeech = viewportAction === ViewPortAction.SpeechBallon

  return (
    <StackEditor direction="row" spacing={0.5} mr={3} disabled={!isShowForSpeech}>
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={textAlign === editor.key ? editor.iconActive : editor.icon}
          alt={editor.key}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleChangeTextAlign(editor.key)}
        />
      ))}
    </StackEditor>
  )
}

export { ChooseStyleAlignText }
