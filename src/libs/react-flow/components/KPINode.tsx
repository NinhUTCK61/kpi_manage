import { Box, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { NODE_HEIGHT, NODE_WIDTH } from '../constant'
import { useRFStore } from '../hooks'
import { KPINode } from '../types'

const StyledImage = styled(Image)({
  transform: 'translate(-50%, -100%)',
  cursor: 'pointer',
})

export const KPINode = memo(function KPINode({ data }: NodeProps<KPINode>) {
  const addNode = useRFStore((state) => state.addNode)

  const handleAddNode = (id: string) => {
    const nodes = addNode(id)
    console.log(nodes)
  }

  return (
    <Box width={NODE_WIDTH} height={NODE_HEIGHT} border={1}>
      <Typography variant="subtitle1">{data.slug}</Typography>
      <Handle type="source" onClick={() => handleAddNode(data.id)} position={Position.Right}>
        <StyledImage src="/assets/svgs/add.svg" alt="add" width={12} height={12} />
      </Handle>
      {data.id !== 'root' && (
        <Handle
          type="source"
          onClick={() => handleAddNode(data.parent_node_id as string)}
          position={Position.Bottom}
        >
          <StyledImage src="/assets/svgs/add.svg" alt="add" width={12} height={12} />
        </Handle>
      )}
      <Handle type="target" onClick={() => handleAddNode(data.id)} position={Position.Left} />
    </Box>
  )
})
