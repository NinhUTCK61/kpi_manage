import {
  HierarchyFlowNode,
  KPINode,
  ReactFlowNode,
  TemplateProvider,
  stratifier,
  useRFStore,
} from '@/libs/react-flow'
import { Layout } from '@/libs/shared/components'
import { Box, Stack } from '@mui/material'
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
    data: { id: 'root', parent_node_id: '', slug: 'root', x: 0, y: 0 },
    position: { x: 0, y: 0 },
  },
]
const _edges: Edge[] = []

const d3Root: HierarchyFlowNode = stratifier(_nodes)
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
  const { nodes, edges, onNodesChange, onEdgesChange } = useRFStore((state) => state)

  console.log(111, nodes)

  return (
    <Stack display="flex" flex={1} height="100%">
      <Box className="reactflow-wrapper" flexGrow={1}>
        <ReactFlow
          snapGrid={[20, 20]}
          snapToGrid
          maxZoom={1}
          minZoom={1}
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
