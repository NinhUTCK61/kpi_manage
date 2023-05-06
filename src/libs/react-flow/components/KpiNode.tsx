import { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useRFStore } from '../hooks'
import { KPINodeType, RFStore } from '../types'
import { NodeActive, NodeUnActive } from './ComponentNode'

const selector = (state: RFStore) => ({
  addNode: state.addNode,
  nodeFocused: state.nodeFocused,
  isHasChild: state.isHasChild,
  setNodeFocused: state.setNodeFocused,
  removeNodes: state.removeNodes,
  viewportAction: state.viewportAction,
})

function KpiNode(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const { nodeFocused, removeNodes } = useRFStore(selector, shallow)

  const { input_title: inputTitle, input_value: inputValue, unit } = data

  const isFocus = useMemo(() => {
    if (data.slug === 'root' && nodeFocused === 'root') {
      return true
    } else {
      return nodeFocused === data.slug && selected
    }
  }, [data.slug, nodeFocused, selected])

  if (!isFocus && !inputTitle) {
    removeNodes(data.id, data.parent_node_id as string)
  }

  const style = JSON.parse(data.node_style as string)

  return isFocus ? (
    <NodeActive
      data={data}
      style={style}
      inputTitle={inputTitle}
      inputValue={inputValue}
      unit={unit}
      isConnectable={isConnectable}
    />
  ) : (
    <NodeUnActive data={data} style={style} isConnectable={isConnectable} />
  )
}

export { KpiNode }
