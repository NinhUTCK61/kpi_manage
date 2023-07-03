import { api } from '@/libs/api'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateImageProfile = () => {
  const { t } = useTranslation('profile')
  const utils = api.useContext()

  const mutation = api.profile.update.useMutation({
    onSuccess() {
      enqueueSnackbar({
        variant: 'success',
        message: t('modal_upload.upload_success'),
      })
    },
    onError() {
      enqueueSnackbar({
        variant: 'error',
        message: t('modal_upload.upload_fail'),
      })
    },
    onSettled() {
      utils.profile.me.invalidate()
    },
  })

  return mutation
}

export { useUpdateImageProfile }
