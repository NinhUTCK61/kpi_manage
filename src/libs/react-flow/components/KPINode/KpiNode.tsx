import { Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { Active, InActive } from './components'
import { ContextMenu } from './components/ContextMenu'
import { KPINodeProvider } from './context'

function KpiNode(props: NodeProps<KPINodeType>) {
  const { data, isConnectable, selected } = props
  const focusedSlug = useRFStore((state) => state.nodeFocused)

  const slug = data.slug
  const isActive = (slug === 'root' && focusedSlug === 'root') || (focusedSlug === slug && selected)
  const contextValue = useMemo(() => ({ data, isConnectable }), [data, isConnectable])
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number
    mouseY: number
  } | null>(null)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
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
        {isActive ? <Active /> : <InActive />}{' '}
        <ContextMenu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        />
      </Stack>
    </KPINodeProvider>
  )
}

export { KpiNode }
