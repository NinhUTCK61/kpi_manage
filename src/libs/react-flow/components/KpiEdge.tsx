import { EdgeProps, getBezierPath } from 'reactflow'
import { useRFStore } from '../hooks'
import { convertSlugToString, generateColors } from './KPINode/utils'

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
  const nodeTarget = getNodeById(target)
  if (nodeTarget?.type !== 'kpi') return null
  const slug = convertSlugToString(nodeTarget.data.slug)
  //'A get A, AA get A, AB get B'
  const _style = {
    ...style,
    strokeWidth: 4,
    stroke: generateColors(slug[String(slug).length - 1] as string),
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
