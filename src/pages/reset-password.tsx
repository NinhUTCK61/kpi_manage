import { ResetPassword } from '@/features/auth'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'reset_password'])),
    },
  }
}

const PageResetPassword: NextPage = () => {
  return <ResetPassword />
}

export default PageResetPassword
