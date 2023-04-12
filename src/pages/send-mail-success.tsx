import { SendMailSuccess } from '@/screens/SendMailSuccess'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sendmail_success'])),
    },
  }
}

const PageSendMailSuccess: NextPage = () => {
  return <SendMailSuccess />
}

export default PageSendMailSuccess
