import { ChangePassword } from '@/features/auth'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'change_password'])),
    },
  }
}

const PageChangePassword: NextPage = () => {
  return <ChangePassword />
}

export default PageChangePassword
