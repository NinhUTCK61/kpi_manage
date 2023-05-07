import { Template } from '@/features/node/views'
import { api } from '@/libs/api'
import { HierarchyFlowNode, ReactFlowNode, TemplateProvider, stratifier } from '@/libs/react-flow'
import { ReactFlowSchema } from '@/libs/schema/node'
import { appRouter } from '@/server/api/root'
import { authOptions } from '@/server/auth'
import { prisma } from '@/server/db'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ReactFlowProvider } from 'reactflow'
import SuperJSON from 'superjson'
import { z } from 'zod'

export async function getServerSideProps({ locale, req, res, query }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  const { id } = query
  if (!id) {
    return {
      notFound: true,
    }
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  })

  const templateExist = await helpers.template.exists.fetch({ id: String(id) })
  if (!templateExist) {
    return {
      notFound: true,
    }
  }

  await helpers.template.byId.prefetch({
    id: String(id),
  })

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'file', 'home'])),
      trpcState: helpers.dehydrate(),
    },
  }
}

const NodeCreate: FC = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading } = api.node.list.useQuery(
    {
      template_id: id as string,
    },
    {
      enabled: !!id,
    },
  )

  if (isLoading) return null

  const { nodes, edges } = data as z.infer<typeof ReactFlowSchema>
  const d3Root: HierarchyFlowNode = stratifier(nodes as ReactFlowNode[])

  return (
    <ReactFlowProvider>
      <TemplateProvider
        nodes={nodes as ReactFlowNode[]}
        edges={edges}
        d3Root={d3Root}
        templateId={String(id)}
      >
        <Template />
      </TemplateProvider>
    </ReactFlowProvider>
  )
}

export default NodeCreate
