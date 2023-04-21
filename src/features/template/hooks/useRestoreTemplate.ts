import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRestoreTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.restoreTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()
      const prevData = utils.template.getListTemplate.getData({ isTrash: true })

      utils.template.getListTemplate.setData({ isTrash: true }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, deleted_at: null } : e)),
      )

      return { prevData }
    },
    onSuccess: () => {
      enqueueSnackbar(t('restore_success'), {
        variant: 'success',
        description: t('description_restore_success') as string,
      })
    },
    onError: (err, _, ctx) => {
      showError(err, t('restore_failed'))
      utils.template.getListTemplate.setData({ isTrash: true }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })

  return mutation
}

export { useRestoreTemplate }
