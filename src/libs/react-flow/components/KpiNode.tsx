import { Typography } from '@mui/material'
import AddIcon from 'public/assets/svgs/add_node.svg'
import NodeIcon from 'public/assets/svgs/node.svg'
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

  const { addNode, nodeFocused } = useRFStore(
    (state) => ({
      addNode: state.addNode,
      nodeFocused: state.nodeFocused,
    }),
    shallow,
  )

  const isFocused = nodeFocused === data.id && selected

  return false ? (
    <NodeUnActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <Typography variant="body2" mb={0.5}>
        {`${data.input_title}${data.unit && `(${data.unit})`}`}
      </Typography>
      <Typography variant="body2">{data.value2number}</Typography>

      <RightHandler type="source" position={Position.Right}>
        {id !== 'root' && <IconImageNode src={NodeIcon} alt="add" />}
      </RightHandler>

      <TextId variant="caption">{id}</TextId>
    </NodeUnActiveContainer>
  ) : (
    <StackNodeActive>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm />

      {id !== 'root' && (
        <BottomHandler
          type="target"
          position={Position.Bottom}
          onClick={() => addNode(data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}
      <RightHandler type="source" position={Position.Right} onClick={() => addNode(data.id)}>
        <IconImage src={AddIcon} alt="add" />
      </RightHandler>
    </StackNodeActive>
  )
}

export { KpiNode }
