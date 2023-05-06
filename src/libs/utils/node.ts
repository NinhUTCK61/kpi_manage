import { Prisma } from '@prisma/client'
import { stratify } from 'd3-hierarchy'
import { nanoid } from 'nanoid'
import { getTreeLayout } from '../react-flow'

export function generateDefaultNode(
  template_id: string,
  rootId: string,
): Prisma.NodeCreateManyInput[] {
  const [nodeAId, nodeBId] = [nanoid(), nanoid()]

  const defaultAttr = {
    input_value: '',
    is_formula: false,
    template_id,
    value2number: null,
    x: 0,
    y: 0,
    unit: '',
    style: undefined,
  }

  const rootNode: Prisma.NodeCreateManyInput = {
    id: rootId,
    input_title: 'KGI',
    parent_node_id: null,
    slug: 'root',
    ...defaultAttr,
  }

  const nodeA: Prisma.NodeCreateManyInput = {
    id: nodeAId,
    input_title: 'KPI1',
    parent_node_id: rootId,
    slug: 'A',
    ...defaultAttr,
  }

  const nodeB: Prisma.NodeCreateManyInput = {
    id: nodeBId,
    input_title: 'KPI2',
    parent_node_id: rootId,
    slug: 'B',
    ...defaultAttr,
  }

  // const nodeA1: Prisma.NodeCreateManyInput = {
  //   id: nodeA1Id,
  //   input_title: '次のレベルのトピック',
  //   parent_node_id: nodeAId,
  //   slug: 'A1',
  //   ...defaultAttr,
  // }

  // const nodeB2: Prisma.NodeCreateManyInput = {
  //   id: nodeA2,
  //   input_title: '次のレベルのトピック',
  //   parent_node_id: nodeBId,
  //   slug: 'B2',
  //   ...defaultAttr,
  // }

  const nodes = [rootNode, nodeA, nodeB]
  const hierarchy = stratify<Prisma.NodeCreateManyInput>()
    .id((n) => n.id)
    .parentId((n) => n.parent_node_id)(nodes)
  const tree = getTreeLayout(hierarchy)

  const nodeLayout: Prisma.NodeCreateManyInput[] = []
  tree.each((node) => {
    node.data.x = node.y
    node.data.y = node.x

    nodeLayout.push(node.data)
  })

  return nodeLayout
}
