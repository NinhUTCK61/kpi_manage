import { FontWeight, StyleText, ViewPortAction } from '@/features/node/constant'
import { NodeType, useRFStore } from '@/libs/react-flow'
import Image from 'next/image'
import EditorBold from 'public/assets/svgs/editor_bold.svg'
import EditorBoldActive from 'public/assets/svgs/editor_bold_active.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'
import { StackEditor } from './StackEditor'

const editors = [
  {
    key: StyleText.FontWeight,
    icon: EditorBold,
    activeIcon: EditorBoldActive,
    value: FontWeight.Bold,
  },
]

const ChooseStyleText: React.FC = () => {
  const [styleText, setStyleText] = useState({
    [StyleText.FontWeight]: FontWeight.Normal,
  })

  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type === 'kpi' || nodeFocused?.type === 'speech_ballon') return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setStyleText({
        fontWeight: FontWeight.Normal,
      })

      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (!nodeStyle) return

    setStyleText({
      fontWeight: nodeStyle.fontWeight || FontWeight.Normal,
    })
  }, [nodeFocusedMemo])

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleChangeStyle = (key: StyleText, value: FontWeight) => {
    if (!nodeFocusedMemo) return

    const _styleText = {
      ...styleText,
      [key]: styleText[key] === value ? FontWeight.Normal : value,
    }

    setStyleText(_styleText)

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    const newNodeStyle = JSON.stringify({
      ...nodeStyle,
      ..._styleText,
    })

    updateReactFlowNode(
      {
        node_style: newNodeStyle,
        id: nodeFocusedMemo.data.id,
        is_saved: nodeFocusedMemo.data.is_saved,
      },
      nodeFocusedMemo.type as NodeType,
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
