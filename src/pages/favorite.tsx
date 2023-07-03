import { Favorite } from '@/features'
import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'home', 'favorite'])),
    },
  }
}

const PageFavorite: NextPage = () => {
  return <Favorite />
}

export default PageFavorite
