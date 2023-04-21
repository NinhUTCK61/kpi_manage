import {
  HierarchyFlowNode,
  ReactFlowKPINode,
  stratifier,
  TemplateProvider,
  useRFStore,
} from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { Box } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Edge, ReactFlow, ReactFlowProvider, useStoreApi } from 'reactflow'
import 'reactflow/dist/style.css'
import { LayoutTemplate } from './components'
import { Toolbar } from './components/Toolbar'

const _nodes: ReactFlowKPINode[] = [
  {
    id: 'root',
    type: 'kpi',
    data: {
      id: 'root',
      parent_node_id: '',
      slug: 'root',
      x: 0,
      y: 0,
      input_title: 'root',
      input_value: '',
      is_formula: false,
      style: null,
      unit: '',
      value2number: 0,
      template_id: 'root',
      type: 'kpi',
    },
    position: { x: 0, y: 0 },
  },
]
const _edges: Edge[] = []
const d3Root: HierarchyFlowNode = stratifier(_nodes)
const nodeTypes = {
  kpi: KpiNode,
}
const edgeTypes = {
  kpi: KpiEdge,
}

const TemplateView: NextPage = () => {
  return (
    <ReactFlowProvider>
      <TemplateProvider nodes={_nodes} edges={_edges} d3Root={d3Root}>
        <Template />
      </TemplateProvider>
    </ReactFlowProvider>
  )
}

const Template = () => {
  const router = useRouter()
  const { id } = router.query
  const { nodes, edges, onNodesChange, onEdgesChange } = useRFStore((state) => state)
  const store = useStoreApi()

  return (
    <LayoutTemplate>
      <Toolbar />
      <Box display="flex" flex={1} height="100%" p={1}>
        <ReactFlow
          snapGrid={[20, 20]}
          snapToGrid
          maxZoom={2}
          minZoom={0.5}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <KpiControls />
        </ReactFlow>
      </Box>
    </LayoutTemplate>
  )
}

export { TemplateView }
