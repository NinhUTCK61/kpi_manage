import { useTranslation } from 'next-i18next'
import KnowledgeIcon from 'public/assets/svgs/blog.svg'
import ConsultationIcon from 'public/assets/svgs/consulation.svg'
import HomeIcon from 'public/assets/svgs/home.svg'
import FavoriteIcon from 'public/assets/svgs/star.svg'
// import FAQIcon from 'public/assets/svgs/faq.svg'
// import UseCase from 'public/assets/svgs/use_case.svg'

const useMenuList = () => {
  const { t } = useTranslation()

  const menus = [
    { title: t('sidebar.home'), icon: HomeIcon, href: '/' },
    { title: t('sidebar.favorite'), icon: FavoriteIcon, href: '/favorite' },
    {
      title: t('sidebar.consultation'),
      icon: ConsultationIcon,
      href: '/consultation',
      disable: true,
    },
    { title: t('sidebar.knowledge_blog'), icon: KnowledgeIcon, href: '/knowledge', disable: true },
    // { title: t('sidebar.faq'), icon: FAQIcon, href: '/faq' },
    // { title: t('sidebar.use_case'), icon: UseCase, href: '/use_case' },
  ]

  return { menus }
}

export { useMenuList }
