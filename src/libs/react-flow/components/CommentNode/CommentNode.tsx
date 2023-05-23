import { Stack } from '@mui/material'
import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { CommentNodeType } from '../../types'
import { ActiveComment } from './components/ActiveComment'
import { CommentNodeProvider } from './components/CommentNodeProvider'
import { InActiveComment } from './components/InActiveComment'

const CommentNodeInner = (props: NodeProps<CommentNodeType>) => {
  const { data } = props

  console.log(data)

  return (
    <CommentNodeProvider data={data}>
      <Stack direction="row" spacing={1}>
        <InActiveComment />

        <ActiveComment />
      </Stack>
    </CommentNodeProvider>
  )
}

export const CommentNode = memo(CommentNodeInner)
