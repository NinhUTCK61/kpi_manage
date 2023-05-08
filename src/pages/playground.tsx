import {
  HierarchyFlowNode,
  KpiNode,
  ReactFlowKPINode,
  TemplateProvider,
  stratifier,
  useRFStore,
} from '@/libs/react-flow'
import { Box } from '@mui/material'
import { GetStaticPropsContext, type NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Background, Edge, ReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

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
      node_style: null,
      unit: '',
      value2number: 0,
      template_id: 'root',
    },
    position: { x: 0, y: 0 },
  },
]
const _edges: Edge[] = []

const d3Root: HierarchyFlowNode = stratifier(_nodes)
const nodeTypes = {
  kpi: KpiNode,
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KPI Master</title>
      </Head>

      <TemplateProvider nodes={_nodes} edges={_edges} d3Root={d3Root}>
        <Template />
      </TemplateProvider>
    </>
  )
}

const Template = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useRFStore((state) => state)

  return (
    <Box display="flex" flex={1} height="100vh">
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
  )
}

export default Home
