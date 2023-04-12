import { Mail } from '@/screens/Mail'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sendmail_success'])),
    },
  }
}

const PageSend: NextPage = () => {
  return <Mail url="lll" name="Tran Thinh" />
}

export default PageSend
