import { ForgotPassword } from '@/features/auth'
import type { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'forgot_password', 'meta'])),
    },
  }
}

export default ForgotPassword
