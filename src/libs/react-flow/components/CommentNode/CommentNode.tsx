import { Stack } from '@mui/material'
import { memo, useMemo, useState } from 'react'
import { NodeProps } from 'reactflow'
import { CommentNodeType } from '../../types'
import { ActiveComment } from './components/ActiveComment'
import { InActiveComment } from './components/InActiveComment'
import { CommentNodeProvider } from './context'

const CommentNodeInner = (props: NodeProps<CommentNodeType>) => {
  const { data } = props
  const contextValue = useMemo(() => ({ data }), [data])
  const [active, setActive] = useState<null | HTMLElement>(null)

  return (
    <CommentNodeProvider value={{ ...contextValue, active, setActive }}>
      <Stack direction="row" spacing={1}>
        <InActiveComment />

        <ActiveComment open={!!active} anchorEl={active} />
      </Stack>
    </CommentNodeProvider>
  )
}

export const CommentNode = memo(CommentNodeInner)
