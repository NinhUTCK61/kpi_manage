import AddIcon from 'public/assets/svgs/add_node.svg'
import { useCallback, useState } from 'react'
import { Position } from 'reactflow'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
import { NodeForm } from './NodeForm'
import { BottomHandler, IconImage, LeftHandler, NodeActiveContainer, RightHandler } from './styled'

const NodeActive: React.FC = () => {
  const addNode = useRFStore((state) => state.addNode)

  const { data, isConnectable } = useKPINodeContext()

  const [focus, setFocus] = useState<boolean>(false)

  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const handleCancelFocus = useCallback(() => {
    setFocus(false)
  }, [])

  return (
    <NodeActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm handleFocus={handleFocus} handleCancelFocus={handleCancelFocus} />

      {data.slug !== 'root' && data.input_title && (
        <BottomHandler
          sx={{ ...(focus && { opacity: 0 }) }}
          type="target"
          position={Position.Bottom}
          onClick={() => addNode(data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}

      {!!data.input_title && (
        <RightHandler
          sx={{ ...(focus && { opacity: 0 }) }}
          type="source"
          position={Position.Right}
          onClick={() => addNode(data.id)}
        >
          <IconImage src={AddIcon} alt="add" />
        </RightHandler>
      )}
    </NodeActiveContainer>
  )
}

export { NodeActive }
