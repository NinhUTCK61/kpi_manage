import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useDeleteTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.delete.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.list.getData({ isTrash: template.is_permanently })

      utils.template.list.setData({ isTrash: template.is_permanently }, (old = []) => {
        return template.is_permanently
          ? old.filter((e) => e.template_id !== template.id)
          : old.map((e) => (e.template_id === template.id ? { ...e, deleted_at: new Date() } : e))
      })

      return { prevData, isTrash: template.is_permanently }
    },
    onSuccess: (data, _, ctx) => {
      enqueueSnackbar(
        t(ctx?.isTrash ? 'description_delete_per_success' : 'description_delete_success'),
        {
          variant: 'success',
        },
      )
    },
    onError: (err, _, ctx) => {
      showError(err, t(ctx?.isTrash ? 'permanently_delete_failed' : 'delete_failed'))
      utils.template.list.setData({ isTrash: ctx?.isTrash }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useDeleteTemplate }
