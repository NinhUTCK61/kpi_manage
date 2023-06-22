import { InputStyled } from '@/libs/react-flow/components/CommentNode/components/styled'
import { useTranslation } from 'next-i18next'

export const Language = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')

  const languages = [
    {
      id: 'en',
      title: t('english'),
    },
    {
      id: 'jp',
      title: t('japan'),
    },
  ]

  return <InputStyled value={languages.find((e) => e.id === language)?.title} readOnly />
}
