import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { FlowNode } from '../types'

export const KPINode = memo(function KPINode({ data }: NodeProps<FlowNode>) {
  return (
    <Box>
      {data.id !== 'root' && <Handle type="target" position={Position.Top} />}
      <Typography variant="subtitle1">{data.slug}</Typography>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  )
})
