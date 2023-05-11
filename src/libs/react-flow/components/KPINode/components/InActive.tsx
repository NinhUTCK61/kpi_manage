import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import NodeIcon from 'public/assets/svgs/node.svg'
import { Position } from 'reactflow'
import { useKPINodeContext } from '../context'
import {
  IconImageNode,
  LeftHandler,
  NodeInActiveContainer,
  RightHandler,
  TextId,
  TextOverflow,
} from './styled'

const InActive: React.FC = () => {
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const viewportAction = useRFStore((state) => state.viewportAction)
  const isHasChild = useRFStore((state) => state.isHasChild)

  const { data, isConnectable } = useKPINodeContext()
  const style = JSON.parse(data.node_style || '{}')

  return (
    <NodeInActiveContainer
      onClick={() => setNodeFocused(data.slug)}
      sx={{
        ...(viewportAction !== ViewPortAction.Move && {
          pointerEvents: 'none',
        }),
      }}
    >
      <LeftHandler type="target" position={Position.Left} isConnectable={isConnectable} />

      <TextOverflow variant="body2" mb={0.5} style={style} align="center">
        {`${data.input_title}`}
      </TextOverflow>

      {!!data.value2number && (
        <TextOverflow variant="body2" style={style} align="center">
          {`${data.value2number} ${data.unit && `(${data.unit})`} `}
        </TextOverflow>
      )}

      <RightHandler type="source" position={Position.Right}>
        {data.slug !== 'root' && isHasChild(data.id) && <IconImageNode src={NodeIcon} alt="add" />}
      </RightHandler>

      <TextId variant="caption">{data.slug}</TextId>
    </NodeInActiveContainer>
  )
}

export { InActive }
