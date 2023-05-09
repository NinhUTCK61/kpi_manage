import { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { Active, InActive } from './components'
import { KPINodeProvider } from './context'

function KpiNode(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const focusedSlug = useRFStore((state) => state.nodeFocused)

  const slug = data.slug
  const isActive = (slug === 'root' && focusedSlug === 'root') || (focusedSlug === slug && selected)
  const contextValue = useMemo(() => ({ data, isConnectable }), [data, isConnectable])

  return (
    <KPINodeProvider value={contextValue}>{isActive ? <Active /> : <InActive />}</KPINodeProvider>
  )
}

export { KpiNode }
