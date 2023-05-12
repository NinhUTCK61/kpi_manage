import AddIcon from 'public/assets/svgs/add_node.svg'
import { useCallback, useState } from 'react'
import { Position } from 'reactflow'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
import { NodeForm } from './NodeForm'
import { BottomHandler, IconImage, LeftHandler, NodeActiveContainer, RightHandler } from './styled'

const Active: React.FC = () => {
  const addKPINode = useRFStore((state) => state.addKPINode)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { data, isConnectable } = useKPINodeContext()
  const [formFocus, setFormFocus] = useState<boolean>(false)

  const changeFormFocusState = useCallback((state: boolean) => {
    setFormFocus(state)
  }, [])

  const isValidFocusToShowHandler = !formFocus && nodeFocused
  const isShowBottomHandler = isValidFocusToShowHandler && data.slug !== 'root' && data.input_title
  const isShowRightHandler = isValidFocusToShowHandler && data.input_title

  return (
    <NodeActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm changeFormFocusState={changeFormFocusState} />

      {isShowBottomHandler && (
        <BottomHandler
          type="target"
          position={Position.Bottom}
          onClick={() => addKPINode(data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}

      {isShowRightHandler && (
        <RightHandler type="source" position={Position.Right} onClick={() => addKPINode(data.id)}>
          <IconImage src={AddIcon} alt="add" />
        </RightHandler>
      )}
    </NodeActiveContainer>
  )
}

export { Active }
