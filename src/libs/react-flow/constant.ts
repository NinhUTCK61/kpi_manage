import { ShapeType, TextAlign } from '@/features/node'
import { LayoutType } from '@prisma/client'

export const NODE_WIDTH = 190
export const NODE_HEIGHT = 106

export const HORIZONTAL_SPACING_FACTOR = 0.25
export const VERTICAL_SPACING_FACTOR = 0.25

export const DEFAULT_NODE_ATTRIBUTES = {
  x: 0,
  y: 0,
  input_title: '',
  input_value: '',
  is_formula: false,
  node_style: JSON.stringify({ color: '#222222' }),
  unit: '',
  value2number: null,
  template_id: '',
  type: 'kpi' as const,
}

export const NODE_HEIGHT_TEMPLATE = 79

export const PANE_CLASS_NAME = 'react-flow__pane'

export const SUGGEST_ITEM_HEIGHT = 54

//speech ballon default data
const DEFAULT_NODE_STYLE = JSON.stringify({
  background: '#3E19A3',
  textAlign: TextAlign.Left,
  color: '#FF2EAA',
  fontSize: '15px',
})

export const DEFAULT_SPEECH_BALLON_ATTRIBUTES = {
  shape: ShapeType.ROUND_SQUARE,
  node_style: DEFAULT_NODE_STYLE,
  text: '',
  layout: LayoutType.FILL,
}
