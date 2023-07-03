import { Profile } from '@/features/auth'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'profile', 'sign_up'])),
    },
  }
}

const ProfilePage: NextPage = () => {
  return <Profile />
}

export default ProfilePage
