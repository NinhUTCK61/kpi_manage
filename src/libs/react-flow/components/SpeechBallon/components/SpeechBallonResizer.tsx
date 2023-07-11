import { ShapeType } from '@/features/node'
import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Stack } from '@mui/material'
import { useMemo, useRef } from 'react'
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { useOnClickOutside } from 'usehooks-ts'
import { useSpeechBallonContext } from '../context'

export const minSizeResize = {
  [ShapeType.SQUARE]: {
    minWidth: 190,
    minHeight: 190,
  },
  [ShapeType.CIRCULAR]: {
    minWidth: 190,
    minHeight: 190,
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    minWidth: 190,
    minHeight: 190,
  },
  [ShapeType.ROUND_SQUARE]: {
    minWidth: 210,
    minHeight: 45,
  },
}

const SpeechBallonResizer = () => {
  const { data, handleResizing, isResizeEnabled, handleResize } = useSpeechBallonContext()
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const { updateReactFlowNode } = useNodeUpdateHandler()
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const minSizeStyle = minSizeResize[shapeType]
  const resizeRef = useRef(null)

  const handleCloseResize = (event: MouseEvent) => {
    const styleArea = document.getElementById(`menu-speech-ballon-${data.id}`)
    const styleArrow = document.getElementById(`arrow-${data.id}`)
    if (
      !styleArea?.contains(event.target as HTMLElement) &&
      !styleArrow?.contains(event.target as HTMLElement)
    ) {
      handleResize(false)
    }
  }

  useOnClickOutside(resizeRef, handleCloseResize)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type === 'speech_ballon') return nodeFocused
  }, [nodeFocused])

  const onUpdateResize = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocusedMemo) return

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    const newNodeStyle = JSON.stringify({
      ...nodeStyle,
      width: `${params.width}px`,
      height: `${params.height}px`,
    })
    const dataUpdate = {
      id: nodeFocusedMemo.id,
      node_style: newNodeStyle,
      x: params.x,
      y: params.y,
      is_saved: nodeFocusedMemo.data.is_saved,
    }

    updateReactFlowNode(dataUpdate, 'speech_ballon')
    handleResizing(false)
  }

  const onResizing = (_: ResizeDragEvent) => {
    handleResizing(true)
  }

  return (
    <Stack ref={resizeRef}>
      <NodeResizer
        minWidth={minSizeStyle.minWidth}
        minHeight={minSizeStyle.minHeight}
        handleStyle={{ width: 12, height: 12, zIndex: 100 }}
        lineStyle={{ padding: 2, zIndex: -1 }}
        isVisible={isResizeEnabled}
        onResizeEnd={onUpdateResize}
        onResize={onResizing}
      />
    </Stack>
  )
}

export { SpeechBallonResizer }
