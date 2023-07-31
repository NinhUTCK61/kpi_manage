import { api } from '@/libs/api'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateImageTemplate = () => {
  const { t } = useTranslation('home')
  const { mutateAsync: mutateDeleteImage } = api.utils.deleteImage.useMutation()
  const utils = api.useContext()

  const mutation = api.template.update.useMutation({
    onMutate(template) {
      const _templates = utils.template.list.getData({ isTrash: false, searchName: '' })
      const prevData = _templates?.find((el) => el.template_id === template.id)

      return { prevData }
    },
    onSuccess(data, _, ctx) {
      enqueueSnackbar({
        variant: 'success',
        message: t('upload_success'),
      })

      mutateDeleteImage({ key: ctx?.prevData?.image_url as string })
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
      utils.template.byId.invalidate()
    },
  })

  return mutation
}

export { useUpdateImageTemplate }
