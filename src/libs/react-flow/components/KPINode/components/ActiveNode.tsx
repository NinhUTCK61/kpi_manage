import AddIcon from 'public/assets/svgs/add_node.svg'
import { MouseEvent, useCallback, useState } from 'react'
import { Position, useReactFlow, useViewport } from 'reactflow'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
import { useHandleKeyPress } from '../hooks'
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
  const { setViewport } = useReactFlow()
  const { x, y, zoom } = useViewport()
  const container = document.querySelector('.react-flow')
  const handleAddNode = (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation()

    const newNode = addKPINode(id)
    if (container) {
      //TODO: Hiện tại thư viện đang lỗi Nếu node mới tạo ra nằm ngoài viewport thì sẽ không thao tác với được
      // Trường hợp node mới nằm dưới root
      // Thêm dấu - trước Y vì biều đồ viewport và value postion bị ngược nhau
      const check = newNode.position.y > -(y - container.clientHeight) / zoom
      const _y = -(newNode.position.y - container.clientHeight) * zoom //chỉnh đúng tỉ lể theo zoom
      if (check) {
        setViewport({
          x,
          y: _y,
          zoom,
        })
      }
    }
  }

  const isValidFocusToShowHandler = !formFocus && nodeFocused
  const isShowBottomHandler = isValidFocusToShowHandler && data.slug !== 'root' && data.input_title
  const isShowRightHandler = isValidFocusToShowHandler && data.input_title
  useHandleKeyPress()

  return (
    <NodeActiveContainer>
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <NodeForm changeFormFocusState={changeFormFocusState} formFocus={formFocus} />

      <BottomHandler
        type="target"
        position={Position.Bottom}
        onClick={(e) => handleAddNode(e, data.parent_node_id as string)}
        hidden={!isShowBottomHandler}
      >
        <IconImage src={AddIcon} alt="add" />
      </BottomHandler>

      <RightHandler
        type="source"
        position={Position.Right}
        onClick={(e) => handleAddNode(e, data.id)}
        hidden={!isShowRightHandler}
      >
        <IconImage src={AddIcon} alt="add" />
      </RightHandler>
    </NodeActiveContainer>
  )
}

export { Active }
