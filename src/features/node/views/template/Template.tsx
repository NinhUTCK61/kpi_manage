import { NODE_HEIGHT_TEMPLATE, RFStore, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { Layout } from '@/libs/shared/components'
import { HEADER_HEIGHT } from '@/libs/shared/components/Layout/Header'
import { Box, styled } from '@mui/material'
import { MouseEvent, useLayoutEffect, useRef } from 'react'
import { useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'
import { KpiReactFlow, TOOLBAR_HEIGHT, Toolbar } from './components'
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
  setNodeFocused: state.setNodeFocused,
})

export const Template: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, viewportAction, setNodeFocused } = useRFStore(
    storeSelector,
    shallow,
  )

  const containerRef = useRef<HTMLElement>(null)

  const { setViewport } = useReactFlow()

  const onPaneClick = (_: MouseEvent<Element>) => {
    setNodeFocused('')
  }

  // TODO: Maybe subscribe nodes re-layout and update node position

  useLayoutEffect(() => {
    if (containerRef.current) {
      // set viewport to center like figma
      setViewport({
        x: 10,
        y: (containerRef.current.clientHeight - NODE_HEIGHT_TEMPLATE) * 0.5,
        zoom: 0.75,
      })
    }
  }, [setViewport])

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate />}>
      <Toolbar />

      <Container display="flex" flex={1} ref={containerRef}>
        <KpiReactFlow
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
          action={viewportAction}
          onPaneClick={onPaneClick}
        >
          <KpiControls />
        </KpiReactFlow>
      </Container>
    </Layout>
  )
}

const Container = styled(Box)({
  height: `calc(100vh - ${HEADER_HEIGHT}px - ${TOOLBAR_HEIGHT}px)`,
})
