import { ViewPortAction } from '@/features/node/constant'
import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { Active, InActive } from './components'
import { ContextMenu, CtxMenuType } from './components/ContextMenu'
import { KPINodeProvider } from './components/KPINodeProvider'

function KpiNodeInner(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const viewportAction = useRFStore((state) => state.viewportAction)

  const isMatches = nodeFocused?.id === data.id
  const isActive =
    ((data.slug === 'root' && isMatches) || (isMatches && selected)) &&
    viewportAction === ViewPortAction.Move

  const disabledMenu = []

  if (data.slug === 'root') {
    disabledMenu.push(CtxMenuType.Delete)
  }

  if (!nodeCopy || nodeCopy.type !== 'kpi') {
    disabledMenu.push(CtxMenuType.Paste)
  }

  if (!data.is_saved) {
    disabledMenu.push(CtxMenuType.Delete)
    disabledMenu.push(CtxMenuType.Copy)
  }

  return (
    <KPINodeProvider data={data} isConnectable={isConnectable}>
      {isActive ? <Active /> : <InActive />}
      <ContextMenu disabledMenu={disabledMenu} />
    </KPINodeProvider>
  )
}

export const KpiNode = memo(KpiNodeInner)
