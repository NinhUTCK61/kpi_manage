import { TextAlign } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow'
import Image from 'next/image'
import EditorCenter from 'public/assets/svgs/editor_center.svg'
import EditorCenterActive from 'public/assets/svgs/editor_center_active.svg'
import EditorLeft from 'public/assets/svgs/editor_left.svg'
import EditorLeftActive from 'public/assets/svgs/editor_left_active.svg'
import EditorRight from 'public/assets/svgs/editor_right.svg'
import EditorRightActive from 'public/assets/svgs/editor_right_active.svg'
import { useEffect, useMemo, useState } from 'react'
import { useReactFlowUpdateNode } from '../../../hooks'
import { StackEditor } from './StackEditor'

const editors = [
  {
    key: TextAlign.Left,
    icon: EditorLeft,
    activeIcon: EditorLeftActive,
  },
  {
    key: TextAlign.Center,
    icon: EditorCenter,
    activeIcon: EditorCenterActive,
  },
  {
    key: TextAlign.Right,
    icon: EditorRight,
    activeIcon: EditorRightActive,
  },
]

const ChooseStyleAlignText: React.FC = () => {
  const [textAlign, setTextAlign] = useState<TextAlign>(TextAlign.Unset)
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type === 'kpi' || nodeFocused?.type === 'speech_ballon') return nodeFocused
  }, [nodeFocused])

  const { handleValidType } = useReactFlowUpdateNode(nodeFocusedMemo)

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
    if (!nodeFocusedMemo) return

    setTextAlign(textAlign !== value ? value : TextAlign.Unset)

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    const newNodeStyle = JSON.stringify({
      ...nodeStyle,
      textAlign: value,
    })
    handleValidType(newNodeStyle)
  }
  const isShowForSpeech = nodeFocusedMemo?.type === 'speech_ballon'

  return (
    <StackEditor direction="row" spacing={0.5} mr={3} disabled={!isShowForSpeech}>
      {editors.map((editor) => (
        <Image
          key={editor.key}
          src={textAlign === editor.key ? editor.activeIcon : editor.icon}
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
