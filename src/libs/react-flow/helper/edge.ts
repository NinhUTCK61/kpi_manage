import { Edge } from 'reactflow'

export const removeEdgeByNodeId = (edges: Edge[], nodeId: string) => {
  return edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
}
