import { Stack } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { CommentNodeType } from '../../types'
import { ActiveComment } from './components/ActiveComment'
import { InActiveComment } from './components/InActiveComment'
import { CommentNodeProvider } from './context'

const CommentNode = (props: NodeProps<CommentNodeType>) => {
  const { data } = props
  const contextValue = useMemo(() => ({ data }), [data])
  const [active, setActive] = useState<null | HTMLElement>(null)

  const handleOpenComment = (event: React.MouseEvent<HTMLElement>) => {
    setActive(event.currentTarget)
  }

  const handleCloseComment = () => {
    setActive(null)
  }

  return (
    <CommentNodeProvider value={contextValue}>
      <Stack direction="row" spacing={1}>
        <InActiveComment handleOpen={handleOpenComment} />

        <ActiveComment
          open={!!active}
          onClose={handleCloseComment}
          handleClose={handleCloseComment}
          anchorEl={active}
        />
      </Stack>
    </CommentNodeProvider>
  )
}

export { CommentNode }
