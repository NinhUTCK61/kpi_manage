import {
  CommentType,
  KPINodeType,
  convertToReactFlowComments,
  convertToReactFlowEdges,
  convertToReactFlowNodes,
  convertToReactFlowSpeechBallon,
} from '@/libs/react-flow'
import { KpiNodeSchema } from '@/libs/schema/node'
import { prisma } from '@/server/db'
import { Node } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { stratify } from 'd3-hierarchy'
import { User } from 'next-auth'
import { z } from 'zod'
import { NodeHelper } from './helper/node.helper'

type NodeCustom = z.infer<typeof KpiNodeSchema>
export class NodeService extends NodeHelper {
  async create(node: Node) {
    const itemTemplate = await prisma.template.findFirst({
      where: {
        id: node.template_id,
      },
    })

    if (itemTemplate) {
      const newNode = await prisma.node.create({
        data: node,
      })
      return newNode as NodeCustom
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  async update(nodes: Node[]) {
    const nodeIds: string[] = nodes.map((node: Node) => {
      return node.id
    })

    await prisma.$executeRaw(this.buildUpdateNodeQuery(nodes, nodeIds))
    const resultData: Node[] = await prisma.node.findMany({
      where: {
        id: {
          in: nodeIds,
        },
      },
    })
    return resultData
  }

  async delete([...nodeIds], user: User) {
    const validNodeCount = await prisma.node.findMany({
      where: {
        id: { in: nodeIds },
        template: {
          users: {
            some: {
              user_id: user.id,
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

    await prisma.node.deleteMany({
      where: {
        id: {
          in: nodeIds,
        },
      },
    })

    return 'node.delete_success'
  }

  async list(template_id: string, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: { template_id, user_id: user.id },
      include: {
        template: true,
      },
    })

    if (!checkUserTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    const node: KPINodeType[] = await prisma.$queryRaw`WITH RECURSIVE node_tree AS (
        SELECT *
        FROM "Node"
        WHERE ID = ${checkUserTemplate.template.root_note_id}
        UNION ALL
        SELECT n.*
        FROM "Node" n
        JOIN node_tree nt ON n."parent_node_id" = nt.id
      )
      SELECT * FROM node_tree;`

    const d3Root = stratify<KPINodeType>()
      .id((n) => n.id)
      .parentId((n) => n.parent_node_id)(node)

    const speechBallon = await prisma.speechBallon.findMany({
      where: {
        template_id,
      },
    })

    const comments = await prisma.comment.findMany({
      where: {
        template_id,
      },
      include: {
        replies: {
          include: {
            author: true,
          },
        },
        author: true,
      },
    })

    const edges = convertToReactFlowEdges(d3Root)
    const kpiNodes = convertToReactFlowNodes(d3Root)
    const speechBallonNodes = convertToReactFlowSpeechBallon(speechBallon)
    const commentNodes = convertToReactFlowComments(comments as CommentType[])

    const nodes = [...kpiNodes, ...speechBallonNodes, ...commentNodes]

    return { nodes, edges }
  }

  async searchSlug(template_id: string, slug: string) {
    const nodes = await prisma.node.findMany({
      where: {
        template_id,
        slug: { contains: slug },
      },
    })

    return nodes
  }
}
