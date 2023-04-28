import { RFStore, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { TemplateDataSchema } from '@/libs/schema'
import { Layout } from '@/libs/shared/components'
import { HEIGHT_HEADER } from '@/libs/shared/components/Layout/Header'
import { Box, styled } from '@mui/material'
import { useEffect, useRef } from 'react'
import { ReactFlow, useReactFlow } from 'reactflow'
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

  const containerRef = useRef<HTMLElement>(null)

  const { setViewport } = useReactFlow()

  useEffect(() => {
    if (containerRef.current) {
      setViewport({
        x: 10,
        y: (containerRef.current.clientHeight - 79) * 0.5,
        zoom: 0.75,
      })
    }
  }, [setViewport])

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate template={template} />}>
      <Toolbar />

      <Container display="flex" flex={1} ref={containerRef}>
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
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
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
