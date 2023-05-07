import { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { NodeActive, NodeUnActive } from './components'
import { KPINodeProvider } from './context'

function KpiNode(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const isFocus =
    (data.slug === 'root' && nodeFocused === 'root') || (nodeFocused === data.slug && selected)

  const contextValue = useMemo(() => ({ data, isConnectable }), [data, isConnectable])

  return (
    <KPINodeProvider value={contextValue}>
      {isFocus ? <NodeActive /> : <NodeUnActive />}
    </KPINodeProvider>
  )
}

export { KpiNode }
