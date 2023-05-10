import { NODE_HEIGHT_TEMPLATE, RFStore, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { HEADER_HEIGHT, Layout } from '@/libs/shared/components'
import { Box, styled } from '@mui/material'
import { MouseEvent, useCallback, useLayoutEffect, useRef } from 'react'
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
  handleNodesChange: state.handleNodesChange,
  handleEdgesChange: state.handleEdgesChange,
  viewportAction: state.viewportAction,
  setNodeFocused: state.setNodeFocused,
  scrollZoom: state.scrollZoom,
})

export const CreateView: React.FC = () => {
  // TODO: wrap it in a hook
  const {
    nodes,
    edges,
    handleNodesChange,
    handleEdgesChange,
    viewportAction,
    setNodeFocused,
    scrollZoom,
  } = useRFStore(storeSelector, shallow)

  const containerRef = useRef<HTMLElement>(null)

  const { setViewport } = useReactFlow()

  const onPaneClick = (_: MouseEvent<Element>) => {
    setNodeFocused('')
  }

  // TODO: Maybe subscribe nodes re-layout and update node position

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

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (event.ctrlKey) {
        // Ctrl key is pressed
        const delta = event.deltaY
        // Handle scroll event here
        if (delta > 0) {
          scrollZoom()
        } else {
          scrollZoom(true)
        }
      }
    },
    [scrollZoom],
  )

  console.log(nodes, edges)

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
          nodeOrigin={[0, 0.5]}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          proOptions={{
            hideAttribution: true,
          }}
          onNodesDelete={(nodes) => {
            console.log('delete', nodes)
          }}
          panOnDrag={viewportAction === ViewPortAction.Pan}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          action={viewportAction}
          onPaneClick={onPaneClick}
          onWheel={handleWheel}
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
