import {
  HierarchyFlowNode,
  ReactFlowKPINode,
  stratifier,
  TemplateProvider,
  useRFStore,
} from '@/libs/react-flow'
import { KpiControls, KpiEdge, KpiNode } from '@/libs/react-flow/components'
import { HEIGHT_HEADER } from '@/libs/shared/components/Layout/Header'
import { Box, styled } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Edge, ReactFlow, ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import { HEIGHT_TOOLBAR, LayoutTemplate, Toolbar } from './components'

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
      type: 'kpi',
    },
    position: { x: 0, y: 0 },
  },
]
const _edges: Edge[] = []
const d3Root: HierarchyFlowNode = stratifier(_nodes)
const nodeTypes = {
  kpi: KpiNode,
}
const edgeTypes = {
  kpi: KpiEdge,
}

export type ActionTypes = {
  move: boolean
  pan: boolean
  comment: boolean
  speech: boolean
}

const TemplateView: NextPage = () => {
  return (
    <ReactFlowProvider>
      <TemplateProvider nodes={_nodes} edges={_edges} d3Root={d3Root}>
        <Template />
      </TemplateProvider>
    </ReactFlowProvider>
  )
}

const Template = () => {
  const router = useRouter()
  const { id } = router.query
  const { nodes, edges, onNodesChange, onEdgesChange } = useRFStore((state) => state)
  const [action, setAction] = useState<ActionTypes>({
    move: true,
    pan: false,
    comment: false,
    speech: false,
  })

  const handleChangeOption = (key: keyof ActionTypes) => {
    setAction({
      move: key === 'move' ? true : false,
      pan: key === 'pan' ? true : false,
      comment: key === 'comment' ? true : false,
      speech: key === 'speech' ? true : false,
    })
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
    <LayoutTemplate>
      <Toolbar
        action={action}
        handleChangeOption={handleChangeOption}
        color={color}
        handleChangeColor={handleChangeColor}
        stroke={stroke}
        handleChangeStroke={handleChangeStroke}
        colorShape={colorShape}
        handleChangeColorShape={handleChangeColorShape}
        shape={shape}
        handleChangeShape={handleChangeShape}
      />

      <Container display="flex" flex={1}>
        <ReactFlow
          snapGrid={[20, 20]}
          snapToGrid
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
          panOnDrag={action.pan}
        >
          <KpiControls />
        </ReactFlow>
      </Container>
    </LayoutTemplate>
  )
}

const Container = styled(Box)({
  height: `calc(100vh - ${HEIGHT_HEADER}px - ${HEIGHT_TOOLBAR}px)`,
})

export { TemplateView }
