import { AppRouter } from '@/server/api/root'
import { TRPCClientError } from '@trpc/client'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError
}

export const useTranslateError = () => {
  const { t } = useTranslation('common')

  const handleError = (message: string) => {
    if (message) {
      const key = message.split('|')[0] as string
      const optionKey = JSON.parse(message.split('|')[1] || '{}')

      return `${t(key, optionKey)}`
    }

    return message
  }

  function showError(err: unknown, title: string) {
    if (isTRPCClientError(err)) {
      const error = String(err.message)
      const description = t(error)
      enqueueSnackbar(title, { variant: 'error', description })
    }
  }
  return { handleError, showError }
}
