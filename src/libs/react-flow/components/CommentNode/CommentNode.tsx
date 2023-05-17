import { Stack } from '@mui/system'
import { NodeProps } from 'reactflow'
import { KPINodeType } from '../../types'

function CommentNode(props: NodeProps<KPINodeType>) {
  return <Stack>This is comment</Stack>
}

export { CommentNode }
