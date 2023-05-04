import { Template } from '@/features/node/views'
import { api } from '@/libs/api'
import { HierarchyFlowNode, ReactFlowNode, TemplateProvider, stratifier } from '@/libs/react-flow'
import { ReactFlowSchema } from '@/libs/schema/node'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { z } from 'zod'

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'file', 'home'])),
    },
  }
}

const NodeCreate: FC = () => {
  const router = useRouter()
  const { id, root } = router.query
  const { data: template } = api.template.getById.useQuery({
    template_id: id as string,
  })
  const { data, isLoading } = api.node.list.useQuery(
    {
      template_id: id as string,
      root_node_id: root as string,
    },
    {
      enabled: !!id && !!root,
    },
  )

  if (isLoading) return null

  const { nodes, edges } = data as z.infer<typeof ReactFlowSchema>
  const d3Root: HierarchyFlowNode = stratifier(nodes as ReactFlowNode[])

  return (
    <ReactFlowProvider>
      <TemplateProvider nodes={nodes as ReactFlowNode[]} edges={edges} d3Root={d3Root}>
        {template && <Template template={template} />}
      </TemplateProvider>
    </ReactFlowProvider>
  )
}

export default NodeCreate
