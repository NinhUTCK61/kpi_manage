import { useMatchesSize } from '@/libs/hooks'
import { NODE_HEIGHT_TEMPLATE, RFStore, ReactFlowNode, useRFStore } from '@/libs/react-flow'
import {
  CommentForm,
  CommentNode,
  ContextMenu,
  KpiControls,
  KpiEdge,
  KpiNode,
  KpiSpeechBallonNode,
} from '@/libs/react-flow/components'
import { HEADER_HEIGHT, Layout } from '@/libs/shared/components'
import { Box, styled } from '@mui/material'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useKeyPress, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'
import { useReactFlowHandler } from '../hooks'
import {
  DialogDeleteNode,
  DialogWarning,
  HeaderTemplate,
  KpiReactFlow,
  TOOLBAR_HEIGHT,
  Toolbar,
} from './components'

const nodeTypes = {
  kpi: KpiNode,
  comment: CommentNode,
  speech_ballon: KpiSpeechBallonNode,
}

const edgeTypes = {
  kpi: KpiEdge,
}

const storeSelector = (state: RFStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  viewportAction: state.viewportAction,
  changeViewportAction: state.changeViewportAction,
  setNodeFocused: state.setNodeFocused,
  nodeFocused: state.nodeFocused,
  container: state.container,
  setContainer: state.setContainer,
})

export const CreateView: React.FC = () => {
  const { nodes, edges, viewportAction, setNodeFocused, nodeFocused, container, setContainer } =
    useRFStore(storeSelector, shallow)

  const {
    handleEdgesChange,
    handleNodesChange,
    handlePaneClick,
    handleWheel,
    handleNodesDelete,
    handleNodeClick,
    handleNodeDragStart,
    handleNodeDragStop,
    handleContextMenu,
  } = useReactFlowHandler()

  const { setViewport } = useReactFlow()
  const { isDownLarge } = useMatchesSize()

  useLayoutEffect(() => {
    if (container) {
      // set viewport to center like design
      setViewport({
        x: 30,
        y: (container.clientHeight - NODE_HEIGHT_TEMPLATE) * 0.5,
        zoom: 0.75,
      })
    }
  }, [container, setViewport])

  const ctrl = useKeyPress(['ControlLeft', 'ControlRight'])

  const firstFocus = useRef(false)
  useLayoutEffect(() => {
    if (!firstFocus.current) {
      setNodeFocused(nodes[0] as ReactFlowNode)
      firstFocus.current = true
    }
  }, [setNodeFocused, nodes, nodeFocused])

  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    setOpenDialog(isDownLarge)
  }, [isDownLarge])

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Layout disableSidebar sx={{ p: '0 !important' }} HeaderComponent={<HeaderTemplate />}>
      <Toolbar />

      <Container display="flex" flex={1} ref={setContainer}>
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
          onWheel={handleWheel}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onNodeDragStart={handleNodeDragStart}
          onNodeDragStop={handleNodeDragStop}
          proOptions={{
            hideAttribution: true,
          }}
          panOnDrag={viewportAction === ViewPortAction.Pan}
          panOnScroll
          zoomOnScroll={false}
          zoomOnPinch={!ctrl}
          zoomOnDoubleClick={false}
          action={viewportAction}
          multiSelectionKeyCode={null}
          zoomActivationKeyCode={['ControlLeft', 'ControlRight']}
          onContextMenu={handleContextMenu}
        >
          <ContextMenu />
          <CommentForm />
        </KpiReactFlow>
        <KpiControls />
      </Container>

      <DialogDeleteNode />
      <DialogWarning open={openDialog} handleClose={handleClose} />
    </Layout>
  )
}

const Container = styled(Box)({
  height: `calc(100vh - ${HEADER_HEIGHT}px - ${TOOLBAR_HEIGHT}px)`,
  position: 'relative',
})
