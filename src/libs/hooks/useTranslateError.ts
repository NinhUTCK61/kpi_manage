import { AppRouter } from '@/server/api/root'
import { TRPCClientError } from '@trpc/client'
import { TRPCError } from '@trpc/server'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export const useTranslateError = () => {
  const { t } = useTranslation('common')

  const handleError = (message: string) => {
    if (message) {
      const key = message.split('|')[0] as string
      const optionKey = JSON.parse(message.split('|')[1] || '{}')
      console.log(key, optionKey)

      return `${t(key, optionKey)}`
    }

    return message
  }

  function showError<T extends TRPCClientError<AppRouter>>(err: T, title: string) {
    const error = String(err.message)
    const description = t(error)
    enqueueSnackbar(title, { variant: 'error', description })
  }
  return { handleError, showError }
}
