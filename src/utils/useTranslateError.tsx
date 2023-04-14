import { useTranslation } from 'react-i18next'

type Props = {
  messageError: string
}

export const useTranslateError = () => {
  const { t } = useTranslation('common')

  const handleError = (message: string) => {
    if (message) {
      const key = message.split('|')[0] as string
      const optionKey = JSON.parse(message.split('|')[1] || '{}')
      console.log(key, optionKey)

      return `${t(key, optionKey)}`
    }
    return ''
  }
  return { handleError }
}
