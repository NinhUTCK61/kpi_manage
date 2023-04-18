import { Prisma } from '@prisma/client'
import { nanoid } from 'nanoid'

export function generateDefaultNode(templateId: string): Prisma.NodeCreateManyInput[] {
  const [rootId, nodeAId, nodeBId, nodeA1Id, nodeA2] = [
    nanoid(),
    nanoid(),
    nanoid(),
    nanoid(),
    nanoid(),
  ]

  const defaultAttr = {
    input_value: '',
    is_formula: false,
    templateId,
    value2number: 0,
    x: 0,
    y: 0,
    unit: '',
    style: undefined,
  }

  const rootNode: Prisma.NodeCreateManyInput = {
    id: rootId,
    input_title: '新しいマインドマッフ',
    parent_node_id: null,
    slug: 'root',
    ...defaultAttr,
  }

  const nodeA: Prisma.NodeCreateManyInput = {
    id: nodeAId,
    input_title: '第1レベルのトピック',
    parent_node_id: rootId,
    slug: 'A',
    ...defaultAttr,
  }

  const nodeB: Prisma.NodeCreateManyInput = {
    id: nodeBId,
    input_title: '第1レベルのトピック',
    parent_node_id: rootId,
    slug: 'B',
    ...defaultAttr,
  }

  const nodeA1: Prisma.NodeCreateManyInput = {
    id: nodeA1Id,
    input_title: '次のレベルのトピック',
    parent_node_id: nodeAId,
    slug: 'A1',
    ...defaultAttr,
  }

  const nodeB2: Prisma.NodeCreateManyInput = {
    id: nodeA2,
    input_title: '次のレベルのトピック',
    parent_node_id: nodeBId,
    slug: 'B2',
    ...defaultAttr,
  }

  return [rootNode, nodeA, nodeB, nodeA1, nodeB2]
}
