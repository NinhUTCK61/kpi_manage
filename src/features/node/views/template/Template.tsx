import { RFStore, useRFStore } from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { Layout } from '@/libs/shared/components'
import { HEIGHT_HEADER } from '@/libs/shared/components/Layout/Header'
import { Box, styled } from '@mui/material'
import { WheelEvent } from 'react'
import { ReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
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

export const Template = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, viewportAction, onNodeClick } = useRFStore(
    storeSelector,
    shallow,
  )

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const [color, setColor] = useState<string>('#1A74EE')

  const handleChangeColor = (color: string) => {
    setColor(color)
  }

  const [stroke, setStoke] = useState<number>(1)

  const handleChangeStroke = (stroke: number) => {
    setStoke(stroke)
  }

  const [colorShape, setColorShape] = useState<string>('#3E19A3')

  const handleChangeColorShape = (color: string) => {
    setColorShape(color)
  }

  const [shape, setShape] = useState<string>('1')

  const handleChangeShape = (shape: string) => {
    setShape(shape)
  }

  return (
    <Layout disableSidebar sx={{ p: 0 }} HeaderComponent={<HeaderTemplate />}>
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
          onWheel={handleWheel}
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
