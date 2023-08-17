import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

export const useValidateImage = () => {
  const { t } = useTranslation('common')

  const handleValidateFormatImage = (_acceptedFiles: File[]) => {
    if (!_acceptedFiles.length) {
      enqueueSnackbar(t('modal_upload_image.incorrect_upload_image'), {
        variant: 'error',
      })
      return false
    }

    if (_acceptedFiles[0]?.size && Math.floor(_acceptedFiles[0]?.size / (1024 * 1024)) > 3) {
      enqueueSnackbar(t('modal_upload_image.error_size_image_upload'), {
        variant: 'error',
      })
      return false
    }
    return true
  }

  return { handleValidateFormatImage }
}
