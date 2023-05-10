import { EdgeProps, getBezierPath } from 'reactflow'
import { useRFStore } from '../hooks'
import { generateColors } from './KPINode/utils'

function KpiEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  target,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const getNodeById = useRFStore((state) => state.getKPINodeById)
  const node = getNodeById(target)
  const firstSlug = node?.type === 'kpi' && node?.data.slug.split('')[0]
  const _style = {
    ...style,
    strokeWidth: 4,
    stroke: generateColors(firstSlug as string),
  }

  return (
    <>
      <path
        id={id}
        style={_style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  )
}

export { KpiEdge }
