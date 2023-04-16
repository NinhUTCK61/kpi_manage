import {
  HierarchyFlowNode,
  KPINode,
  ReactFlowNode,
  TemplateProvider,
  useRFStore,
} from '@/libs/react-flow'
import { Layout } from '@/libs/shared/components'
import { Box, Button, Stack } from '@mui/material'
import { hierarchy } from 'd3-hierarchy'
import { GetStaticPropsContext, type NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Background, Edge, ReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const _nodes: ReactFlowNode[] = [
  {
    id: 'root',
    type: 'kpi',
    data: { id: 'root', parent_node_id: '', slug: 'root' },
    position: { x: 250, y: 25 },
  },
]
const _edges: Edge[] = []

const d3Root: HierarchyFlowNode = hierarchy({
  id: 'root',
  parent_node_id: '',
  slug: 'root',
})

const nodeTypes = {
  kpi: KPINode,
}

const Home: NextPage = () => {
  return (
    <Layout title="KPI Master">
      <TemplateProvider nodes={_nodes} edges={_edges} d3Root={d3Root}>
        <Template />
      </TemplateProvider>
    </Layout>
  )
}

const Template = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, addNode } = useRFStore((state) => state)

  return (
    <Stack display="flex" flex={1} height="100%">
      <Button onClick={() => addNode('root')}>Add new node</Button>
      <Button onClick={() => addNode('A')}>Add child A</Button>
      <Box className="reactflow-wrapper" flexGrow={1}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
        </ReactFlow>
      </Box>
    </Stack>
  )
}

export default Home
