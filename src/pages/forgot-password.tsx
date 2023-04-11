import { ForgotPassword } from '@/screens/ForgotPassword'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sign_in'])),
    },
  }
}

const PageLogin: NextPage = () => {
  return <ForgotPassword />
}

export default PageLogin
