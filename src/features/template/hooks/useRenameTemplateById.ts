import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRenameTemplateById = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.update.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.getById.getData({ template_id: template.id })

      utils.template.getById.setData({ template_id: template.id }, (old) =>
        old ? { ...old, name: String(template.name) } : old,
      )

      const template_id = String(template.id)

      return { prevData, template_id }
    },
    onSuccess: () => {
      enqueueSnackbar(t('rename_success'), {
        variant: 'success',
        description: t('description_rename_success') as string,
      })
    },
    onError: (err, _, ctx) => {
      showError(err, t('rename_failed'))
      ctx?.prevData &&
        utils.template.getById.setData({ template_id: ctx?.template_id }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useRenameTemplateById }