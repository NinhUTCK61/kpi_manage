import AddIcon from 'public/assets/svgs/add_node.svg'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Position, useKeyPress } from 'reactflow'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
import { useNodeHandler } from '../hooks'
import { NodeForm } from './NodeForm'
import { BottomHandler, IconImage, LeftHandler, NodeActiveContainer, RightHandler } from './styled'

const Active: React.FC = () => {
  const addKPINode = useRFStore((state) => state.addKPINode)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { data, isConnectable } = useKPINodeContext()
  const [formFocus, setFormFocus] = useState<boolean>(false)
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const { saveHandler } = useNodeHandler()

  const changeFormFocusState = useCallback((state: boolean) => {
    setFormFocus(state)
  }, [])

  const handleAddNode = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation()
    addKPINode(id)
  }

  const isValidFocusToShowHandler = !formFocus && nodeFocused
  const isShowBottomHandler = isValidFocusToShowHandler && data.slug !== 'root' && data.input_title
  const isShowRightHandler = isValidFocusToShowHandler && data.input_title

  const copy = useKeyPress(['ControlLeft+KeyC', 'ControlRight+KeyC'])
  const paste = useKeyPress(['ControlLeft+KeyV', 'ControlRight+KeyV'])

  const handlePaste = useCallback(() => {
    if (!nodeCopy) return
    if (nodeCopy.type !== 'kpi') return

    saveHandler({
      ...data,
      input_title: nodeCopy.data.input_title,
      input_value: nodeCopy.data.input_value,
      unit: nodeCopy.data.unit,
    })
  }, [data, nodeCopy, saveHandler])

  useEffect(() => {
    if (!copy) return
    setNodeCopy(data.id)
  }, [copy, data.id, setNodeCopy])

  useEffect(() => {
    if (!paste) return
    handlePaste()
  }, [handlePaste, paste])

  return (
    <NodeActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm changeFormFocusState={changeFormFocusState} />

      {isShowBottomHandler && (
        <BottomHandler
          type="target"
          position={Position.Bottom}
          onClick={(e) => handleAddNode(e, data.parent_node_id as string)}
        >
          <IconImage src={AddIcon} alt="add" />
        </BottomHandler>
      )}

      {isShowRightHandler && (
        <RightHandler
          type="source"
          position={Position.Right}
          onClick={(e) => handleAddNode(e, data.id)}
        >
          <IconImage src={AddIcon} alt="add" />
        </RightHandler>
      )}
    </NodeActiveContainer>
  )
}

export { Active }
