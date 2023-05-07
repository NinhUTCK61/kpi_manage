import AddIcon from 'public/assets/svgs/add_node.svg'
import { useCallback, useState } from 'react'
import { Position } from 'reactflow'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
import { NodeForm } from './NodeForm'
import { BottomHandler, IconImage, LeftHandler, NodeActiveContainer, RightHandler } from './styled'

const NodeActive: React.FC = () => {
  const addKPINode = useRFStore((state) => state.addKPINode)
  const { data, isConnectable } = useKPINodeContext()
  const [focus, setFocus] = useState<boolean>(false)

  const changeFocusState = useCallback((state: boolean) => {
    setFocus(state)
  }, [])

  const isHasBottomHandler = data.slug !== 'root' && data.input_title
  const isHasRightHandler = !!data.input_title

  return (
    <NodeActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm changeFocusState={changeFocusState} />

      {isHasBottomHandler && (
        <BottomHandler
          sx={{ ...(focus && { opacity: 0 }) }}
          type="target"
          position={Position.Bottom}
          onClick={() => addKPINode(data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}

      {isHasRightHandler && (
        <RightHandler
          sx={{ ...(focus && { opacity: 0 }) }}
          type="source"
          position={Position.Right}
          onClick={() => addKPINode(data.id)}
        >
          <IconImage src={AddIcon} alt="add" />
        </RightHandler>
      )}
    </NodeActiveContainer>
  )
}

export { NodeActive }
