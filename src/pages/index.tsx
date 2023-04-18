import { Layout } from '@/libs/shared/components'
import { GetStaticPropsContext, type NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home: NextPage = () => {
  return (
    <Layout title="KPI Master">
      <Link href="/playground"> Playground</Link>
    </Layout>
  )
}

export default Home
