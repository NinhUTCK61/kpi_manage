import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { Active, InActive } from './components'
import { ContextMenu, CtxMenuType } from './components/ContextMenu'
import { KPINodeProvider } from './context'

function KpiNodeInner(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)

  const isMatches = nodeFocused?.id === data.id
  const isActive = (data.slug === 'root' && isMatches) || (isMatches && selected)
  const contextValue = useMemo(() => ({ data, isConnectable }), [data, isConnectable])

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : null,
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <KPINodeProvider value={contextValue}>
      <Stack onContextMenu={handleContextMenu}>
        {isActive ? <Active /> : <InActive />}
        <ContextMenu
          open={!!contextMenu}
          onClose={handleClose}
          disabledMenu={data.slug === 'root' ? [CtxMenuType.Delete] : []}
          anchorPosition={
            !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        />
      </Stack>
    </KPINodeProvider>
  )
}

export const KpiNode = memo(KpiNodeInner)
