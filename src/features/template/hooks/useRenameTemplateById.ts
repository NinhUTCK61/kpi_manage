import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRenameTemplateById = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError, handleError } = useTranslateError()

  const mutation = api.template.update.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.byId.getData({ id: template.id })

      utils.template.byId.setData({ id: template.id }, (old) =>
        old ? { ...old, name: String(template.name) } : old,
      )

      const template_id = String(template.id)

      return { prevData, template_id }
    },
    onSuccess: () => {
      enqueueSnackbar(t('description_rename_success'), {
        variant: 'success',
      })
    },
    onError: (err, _, ctx) => {
      console.log(err)
      if (err.data?.zodError) {
        const errorMes = JSON.parse(err.message)[0].message
        enqueueSnackbar(handleError(errorMes), {
          variant: 'error',
        })

        return
      }

      showError(err, t('rename_failed'))
      ctx?.prevData && utils.template.byId.setData({ id: ctx?.template_id }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useRenameTemplateById }
