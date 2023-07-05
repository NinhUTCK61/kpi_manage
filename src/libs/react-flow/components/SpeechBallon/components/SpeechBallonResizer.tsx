import { ShapeType } from '@/features/node'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Stack } from '@mui/material'
import { useRef } from 'react'
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { useOnClickOutside } from 'usehooks-ts'
import { useSpeechBallonContext } from '../context'
import { useUpdateSpeechBallonMutation } from '../hooks'

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
    minHeight: 36,
  },
}

const SpeechBallonResizer = () => {
  const { data, handleResizing, isResizeEnabled, handleResize } = useSpeechBallonContext()
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const { mutate: updateSpeechBallon } = useUpdateSpeechBallonMutation()
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

  const onUpdateResize = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocused) return
    if (nodeFocused.type === 'speech_ballon') {
      const nodeStyle = JSON.parse(nodeFocused.data.node_style || '{}')

      const newNodeStyle = JSON.stringify({
        ...nodeStyle,
        width: `${params.width}px`,
        height: `${params.height}px`,
      })

      const dataUpdate = {
        id: nodeFocused.id,
        node_style: newNodeStyle,
        x: params.x,
        y: params.y,
      }

      updateSpeechBallon(dataUpdate)
      handleResizing(false)
    }
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
        lineStyle={{ padding: 2, zIndex: 100 }}
        isVisible={isResizeEnabled}
        onResizeEnd={onUpdateResize}
        onResize={onResizing}
      />
    </Stack>
  )
}

export { SpeechBallonResizer }
