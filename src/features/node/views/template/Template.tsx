import { RFStore, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { TemplateDataSchema } from '@/libs/schema'
import { Layout } from '@/libs/shared/components'
import { HEIGHT_HEADER } from '@/libs/shared/components/Layout/Header'
import { Box, styled } from '@mui/material'
import { ReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import { z } from 'zod'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'
import { HEIGHT_TOOLBAR, Toolbar } from './components'
import { HeaderTemplate } from './components/Header'

const nodeTypes = {
  kpi: KpiNode,
}
const edgeTypes = {
  kpi: KpiEdge,
}

const storeSelector = (state: RFStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  viewportAction: state.viewportAction,
  onNodeClick: state.onNodeClick,
})

type TemplateTypes = {
  template: z.infer<typeof TemplateDataSchema>
}

export const Template: React.FC<TemplateTypes> = ({ template }) => {
  const { nodes, edges, onNodesChange, onEdgesChange, viewportAction, onNodeClick } = useRFStore(
    storeSelector,
    shallow,
  )

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate template={template} />}>
      <Toolbar />

      <Container display="flex" flex={1}>
        <ReactFlow
          maxZoom={2}
          minZoom={0.5}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          proOptions={{
            hideAttribution: true,
          }}
          panOnDrag={viewportAction === ViewPortAction.Pan}
          onNodeClick={onNodeClick}
          defaultViewport={{
            x: 0,
            y: 0.5,
            zoom: 0.5,
          }}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <KpiControls />
        </ReactFlow>
      </Container>
    </Layout>
  )
}

const Container = styled(Box)({
  height: `calc(100vh - ${HEIGHT_HEADER}px - ${HEIGHT_TOOLBAR}px)`,
})
