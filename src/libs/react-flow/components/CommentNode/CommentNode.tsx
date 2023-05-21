import { ContextMenuState } from '@/libs/shared/types/utils'
import { Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { CommentNodeType } from '../../types'
import { Active } from './components/Active'
import { InActive } from './components/InActive'
import { CommentNodeProvider } from './context'

const CommentNode = (props: NodeProps<CommentNodeType>) => {
  const { data } = props
  const contextValue = useMemo(() => ({ data }), [data])

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    console.log(event.currentTarget)
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX + 36,
            mouseY: event.clientY - 40,
          }
        : null,
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  return (
    <CommentNodeProvider value={contextValue}>
      <Stack direction="row" spacing={1}>
        <InActive handleOpen={handleContextMenu} />

        <Active
          open={!!contextMenu}
          onClose={handleClose}
          handleClose={handleClose}
          anchorPosition={
            !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
          }
        />
      </Stack>
    </CommentNodeProvider>
  )
}

export { CommentNode }
