import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { formatNumber } from '@/libs/utils/format'
import { Position } from 'reactflow'
import { useKPINodeContext } from '../context'
import { generateColors } from '../utils'
import {
  LeftHandler,
  NodeIcon,
  NodeInActiveContainer,
  RightHandler,
  TextId,
  TextOverflow,
} from './styled'

const InActive: React.FC = () => {
  const viewportAction = useRFStore((state) => state.viewportAction)
  const d3Root = useRFStore((state) => state.d3Root)

  const { data, isConnectable } = useKPINodeContext()
  const style = JSON.parse(data.node_style || '{}')

  const d3Node = d3Root.find((node) => node.data.id === data.id)
  const hasChild = d3Node?.children && d3Node.children.length > 0

  const firstSlug = data.slug[0]
  const edgeColor = generateColors(firstSlug as string)

  return (
    <NodeInActiveContainer
      sx={{
        ...(viewportAction !== ViewPortAction.Move && {
          pointerEvents: 'none',
        }),
      }}
    >
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <TextOverflow variant="body2" mb={0.5} style={style}>
        {`${data.input_title}`}
      </TextOverflow>

      {data.input_value !== '' && (
        <TextOverflow variant="body2" style={style}>
          {`${formatNumber(data.value2number || 0)} ${data.unit && `(${data.unit})`} `}
        </TextOverflow>
      )}

      <RightHandler
        type="source"
        position={Position.Right}
        disabled={viewportAction === ViewPortAction.Pan}
      >
        {data.slug !== 'root' && hasChild && (
          <NodeIcon
            sx={{
              transform: 'translate(-50%,-25%)',
              stroke: edgeColor,
            }}
          />
        )}
      </RightHandler>

      <TextId variant="caption">{data.slug}</TextId>
    </NodeInActiveContainer>
  )
}

export { InActive }
