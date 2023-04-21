import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRenameTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.updateTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()
      const prevData = utils.template.getListTemplate.getData({ isTrash: false })

      utils.template.getListTemplate.setData({ isTrash: false }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, name: String(template.name) } : e)),
      )

      return { prevData }
    },
    onSuccess: () => {
      enqueueSnackbar(t('rename_success'), {
        variant: 'success',
        description: t('description_rename_success') as string,
      })
    },
    onError: (err, _, ctx) => {
      showError(err, t('rename_failed'))
      utils.template.getListTemplate.setData({ isTrash: false }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })

  return mutation
}

export { useRenameTemplate }
