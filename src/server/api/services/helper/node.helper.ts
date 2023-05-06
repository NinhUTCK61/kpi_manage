import { prisma } from '@/server/db'
import { Node, Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { CommonHelper } from './common.hepler'

export class NodeHelper extends CommonHelper {
  // Validation
  async validateNodeOfUser(nodeIds: string[], user_id: string) {
    const validNodeCount = await prisma.node.findMany({
      where: {
        id: { in: nodeIds },
        template: {
          users: {
            some: {
              user_id,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (validNodeCount.length !== nodeIds.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  handleFormValues(nodes: Node[]) {
    const arrayField: (keyof Node)[] = [
      'slug',
      'id',
      'input_title',
      'input_value',
      'is_formula',
      'value2number',
      'node_style',
      'x',
      'y',
      'unit',
      'template_id',
      'parent_node_id',
    ]
    const valueStrings = nodes.map((node: Node) => {
      const valueItems: unknown[] = []
      arrayField.map((field) => {
        valueItems.push(node[field])
      })
      return valueItems
    })

    return valueStrings
  }

  buildUpdateNodeQuery(nodes: Node[], nodeIds: string[]) {
    const execute = Prisma.sql`
        UPDATE "Node"
        SET
          slug = new_values.slug,
          id = new_values.id,
          input_title = new_values.input_title,
          input_value = new_values.input_value,
          is_formula = new_values.is_formula,
          value2number = new_values.value2number,
          node_style = new_values.node_style,
          x = new_values.x,
          y = new_values.y,
          unit = new_values.unit,
          template_id = new_values.template_id,
          parent_node_id = new_values.parent_node_id
          FROM (VALUES ${Prisma.join(
            this.handleFormValues(nodes).map((row) => Prisma.sql`(${Prisma.join(row)})`),
          )}
          ) AS new_values(slug, id,  input_title, input_value, is_formula, value2number, node_style, x, y, unit, template_id, parent_node_id)
          WHERE "Node".id = new_values.id AND "Node".id IN (${Prisma.sql`${Prisma.join(nodeIds)}`})
        `
    return execute
  }
}
