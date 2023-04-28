import { Typography } from '@mui/material'
import AddIcon from 'public/assets/svgs/add_node.svg'
import NodeIcon from 'public/assets/svgs/node.svg'
import { useCallback, useState } from 'react'
import { NodeProps, Position } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useRFStore } from '../hooks'
import { KPINodeType } from '../types'
import { NodeForm } from './KPINode/NodeForm'
import {
  BottomHandler,
  IconImage,
  IconImageNode,
  LeftHandler,
  NodeUnActiveContainer,
  RightHandler,
  StackNodeActive,
  TextId,
} from './KPINode/styled'

function KpiNode(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected, id } = props
  const [focus, setFocus] = useState<boolean>(false)

  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const handleCancelFocus = useCallback(() => {
    setFocus(false)
  }, [])

  const { addNode, nodeFocused, isHasChild, setNodeFocused, removeNodes } = useRFStore(
    (state) => ({
      addNode: state.addNode,
      nodeFocused: state.nodeFocused,
      isHasChild: state.isHasChild,
      setNodeFocused: state.setNodeFocused,
      removeNodes: state.removeNodes,
    }),
    shallow,
  )

  const { input_title, input_value, unit } = data

  const checkFocused = () => {
    if (data.slug === 'root' && nodeFocused === 'root') {
      return true
    } else {
      return nodeFocused === data.slug && selected
    }
  }

  if (!selected && !input_title) {
    removeNodes(data.id, data.parent_node_id as string)
  }

  console.log('data', data.node_style)

  const style = JSON.parse(data.node_style as string)

  console.log('style', style)

  return !checkFocused() ? (
    <NodeUnActiveContainer onClick={() => setNodeFocused(data.slug)}>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <Typography variant="body2" mb={0.5} sx={{ color: style?.color }}>
        {`${data.input_title}${data.unit && `(${data.unit})`}`}
      </Typography>

      {data.value2number && (
        <Typography variant="body2" sx={{ color: style?.color }}>
          {data.value2number}
        </Typography>
      )}

      <RightHandler type="source" position={Position.Right}>
        {id !== 'root' && isHasChild(data.id) && <IconImageNode src={NodeIcon} alt="add" />}
      </RightHandler>

      <TextId variant="caption">{data.slug}</TextId>
    </NodeUnActiveContainer>
  ) : (
    <StackNodeActive sx={{ borderColor: style?.color }}>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm
        input_title={input_title}
        input_value={input_value}
        unit={unit}
        nodeSlug={data.slug}
        handleFocus={handleFocus}
        handleCancelFocus={handleCancelFocus}
      />

      {data.slug !== 'root' && (
        <BottomHandler
          sx={{ ...(focus && { opacity: 0 }) }}
          type="target"
          position={Position.Bottom}
          onClick={() => addNode(data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}

      <RightHandler
        sx={{ ...(focus && { opacity: 0 }) }}
        type="source"
        position={Position.Right}
        onClick={() => addNode(data.id)}
      >
        <IconImage src={AddIcon} alt="add" />
      </RightHandler>
    </StackNodeActive>
  )
}

export { KpiNode }
