import { ShapeType } from '@/features/node'
import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useMemo } from 'react'
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow'
import { useSpeechBallonContext } from '../context'
import { HEIGHT_ARROW, WIDTH_ARROW } from '../helper'

export const minSizeResize = {
  [ShapeType.SQUARE]: {
    minWidth: 150,
    minHeight: 150,
  },
  [ShapeType.CIRCULAR]: {
    minWidth: 150,
    minHeight: 150,
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    minWidth: 150,
    minHeight: 150,
  },
  [ShapeType.ROUND_SQUARE]: {
    minWidth: 150,
    minHeight: 45,
  },
}

const SpeechBallonResizer = () => {
  const { data, handleSetResizing, isResizeEnabled, isResizing } = useSpeechBallonContext()

  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const { updateReactFlowNode } = useNodeUpdateHandler()
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const getNodeById = useRFStore((state) => state.getNodeById)

  const minSizeStyle = minSizeResize[shapeType]

  const node = getNodeById(data.id)
  const defaultDimensions = {
    position: { ...node?.position },
    positionAbsolute: { ...node?.positionAbsolute },
    style: node?.style,
    width: node?.width,
    height: node?.height,
  }

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type === 'speech_ballon') return nodeFocused
  }, [nodeFocused])

  const onResizeEnd = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    const newNodeStyle = JSON.stringify({
      ...nodeStyle,
      width: `${params.width}px`,
      height: `${params.height}px`,
      widthArrow: handleArrowCalculate(params).widthArrow,
      heightArrow: handleArrowCalculate(params).heightArrow,
      transformArrow: nodeStyle.transformArrow,
    })

    const dataUpdate = {
      id: nodeFocusedMemo.id,
      node_style: newNodeStyle,
      x: params.x,
      y: params.y,
      is_saved: nodeFocusedMemo.data.is_saved,
      defaultDimensions,
    }

    updateReactFlowNode(dataUpdate, 'speech_ballon')
    handleSetResizing(null)
  }

  const onResizing = (_: ResizeDragEvent, params: ResizeParams) => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    if (!isResizing) {
      handleSetResizing(nodeFocusedMemo ?? null)
    }
    const newNodeStyle = JSON.stringify({
      ...nodeStyle,
      widthArrow: handleArrowCalculate(params).widthArrow,
      heightArrow: handleArrowCalculate(params).heightArrow,
    })

    handleSetResizing({
      ...nodeFocusedMemo,
      data: {
        ...nodeFocusedMemo.data,
        node_style: newNodeStyle,
      },
    })
  }

  const handleArrowCalculate = (params: ResizeParams) => {
    const percentResize = params.height / minSizeResize[ShapeType.ROUND_SQUARE].minHeight
    return {
      widthArrow: Math.min(WIDTH_ARROW * percentResize, params.width - 20),
      heightArrow: HEIGHT_ARROW * percentResize,
    }
  }

  return (
    <NodeResizer
      minWidth={minSizeStyle.minWidth}
      minHeight={minSizeStyle.minHeight}
      handleStyle={{ width: 18, height: 18, zIndex: 100 }}
      lineStyle={{ padding: 2, zIndex: -1 }}
      isVisible={isResizeEnabled}
      onResizeEnd={onResizeEnd}
      onResize={onResizing}
    />
  )
}

export { SpeechBallonResizer }
