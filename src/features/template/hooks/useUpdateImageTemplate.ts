import { api } from '@/libs/api'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateImageTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()

  const mutation = api.template.update.useMutation({
    onSuccess() {
      enqueueSnackbar({
        variant: 'success',
        message: t('upload_success'),
      })
    },
    onError() {
      enqueueSnackbar({
        variant: 'error',
        message: t('upload_fail'),
      })
    },
    onSettled: () => {
      utils.template.list.invalidate()
      utils.template.favorite.invalidate()
    },
  })

  return mutation
}

export { useUpdateImageTemplate }
