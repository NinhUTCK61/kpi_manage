import { NODE_HEIGHT_TEMPLATE, RFStore, ReactFlowNode, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { CommentNode } from '@/libs/react-flow/components/CommentNode'
import { CommentForm } from '@/libs/react-flow/components/CommentNode/components'
import { HEADER_HEIGHT, Layout } from '@/libs/shared/components'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { Box, styled } from '@mui/material'
import { useLayoutEffect, useRef, useState } from 'react'
import { useKeyPress, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'
import { useReactFlowHandler } from '../hooks'
import { KpiReactFlow, TOOLBAR_HEIGHT, Toolbar } from './components'
import { HeaderTemplate } from './components/Header'

const nodeTypes = {
  kpi: KpiNode,
  comment: CommentNode,
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
  } = useReactFlowHandler()

  const { setViewport } = useReactFlow()

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

  const [comment, setComment] = useState<ContextMenuState>(null)

  const handleOpenComment = (event: React.MouseEvent) => {
    event.preventDefault()

    setComment(
      !comment
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY - 16,
          }
        : null,
    )
  }

  const handleCloseComment = () => {
    setComment(null)
  }

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate />}>
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
          onPaneClick={(e) => handlePaneClick(e, () => handleOpenComment(e))}
          onWheel={handleWheel}
          onNodeClick={handleNodeClick}
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
        >
          <CommentForm
            open={!!comment}
            onClose={handleCloseComment}
            handleClose={handleCloseComment}
            positionMenu={comment}
            anchorPosition={!!comment ? { top: comment.mouseY, left: comment.mouseX } : undefined}
            containerRef={container}
          />
          <KpiControls />
        </KpiReactFlow>
      </Container>
    </Layout>
  )
}

const Container = styled(Box)({
  height: `calc(100vh - ${HEADER_HEIGHT}px - ${TOOLBAR_HEIGHT}px)`,
})
