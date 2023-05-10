import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRestoreTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.restore.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.list.getData({ isTrash: true })

      utils.template.list.setData({ isTrash: true }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, deleted_at: null } : e)),
      )

      return { prevData }
    },
    onSuccess: () => {
      enqueueSnackbar(t('description_restore_success'), {
        variant: 'success',
      })
    },
    onError: (err, _, ctx) => {
      showError(err, t('restore_failed'))
      utils.template.list.setData({ isTrash: true }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useRestoreTemplate }
