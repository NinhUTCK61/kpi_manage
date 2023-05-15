import { NODE_HEIGHT_TEMPLATE, RFStore, ReactFlowNode, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { HEADER_HEIGHT, Layout } from '@/libs/shared/components'
import { Box, styled } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import { useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'
import { useReactFlowHandler } from '../hooks'
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
  viewportAction: state.viewportAction,
  setNodeFocused: state.setNodeFocused,
  nodeFocused: state.nodeFocused,
})

export const CreateView: React.FC = () => {
  const { nodes, edges, viewportAction, setNodeFocused, nodeFocused } = useRFStore(
    storeSelector,
    shallow,
  )

  const {
    handleEdgesChange,
    handleNodesChange,
    handlePaneClick,
    handleWheel,
    handleNodesDelete,
    handleNodeClick,
  } = useReactFlowHandler()

  const containerRef = useRef<HTMLElement>(null)
  const { setViewport } = useReactFlow()

  useLayoutEffect(() => {
    if (containerRef.current) {
      // set viewport to center like design
      setViewport({
        x: 30,
        y: (containerRef.current.clientHeight - NODE_HEIGHT_TEMPLATE) * 0.5,
        zoom: 0.75,
      })
    }
  }, [setViewport])

  const firstFocus = useRef(false)
  useLayoutEffect(() => {
    if (!firstFocus.current) {
      setNodeFocused(nodes[0] as ReactFlowNode)
      firstFocus.current = true
    }
  }, [setNodeFocused, nodes, nodeFocused])

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate />}>
      <Toolbar />

      <Container display="flex" flex={1} ref={containerRef}>
        <KpiReactFlow
          maxZoom={2}
          minZoom={0.25}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodesDelete={handleNodesDelete}
          onPaneClick={handlePaneClick}
          onWheel={handleWheel}
          onNodeClick={handleNodeClick}
          proOptions={{
            hideAttribution: true,
          }}
          panOnDrag={viewportAction === ViewPortAction.Pan}
          panOnScroll
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          action={viewportAction}
          multiSelectionKeyCode={null}
          zoomActivationKeyCode={['ControlLeft', 'ControlRight']}
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
