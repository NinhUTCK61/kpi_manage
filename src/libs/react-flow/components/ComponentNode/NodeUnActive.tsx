import { ViewPortAction } from '@/features/node/constant'
import { Typography } from '@mui/material'
import NodeIcon from 'public/assets/svgs/node.svg'
import { CSSProperties } from 'react'
import { Position } from 'reactflow'
import { useRFStore } from '../../hooks'
import { KPINodeType } from '../../types'
import { IconImageNode, LeftHandler, NodeUnActiveContainer, RightHandler, TextId } from './styled'

type NodeUnActiveTypes = {
  isConnectable: boolean
  style: CSSProperties
  data: KPINodeType
}

const NodeUnActive: React.FC<NodeUnActiveTypes> = ({ isConnectable, style, data }) => {
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const isHasChild = useRFStore((state) => state.isHasChild)

  return (
    <NodeUnActiveContainer
      onClick={() => setNodeFocused(data.slug)}
      style={{
        ...(viewportAction !== ViewPortAction.Move && {
          pointerEvents: 'none',
        }),
      }}
    >
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <Typography variant="body2" mb={0.5}>
        {`${data.input_title}${data.unit && `(${data.unit})`}`}
      </Typography>

      {!!data.value2number && <Typography variant="body2">{data.value2number}</Typography>}

      <RightHandler type="source" position={Position.Right}>
        {data.slug !== 'root' && isHasChild(data.id) && <IconImageNode src={NodeIcon} alt="add" />}
      </RightHandler>

      <TextId variant="caption">{data.slug}</TextId>
    </NodeUnActiveContainer>
  )
}

export { NodeUnActive }
