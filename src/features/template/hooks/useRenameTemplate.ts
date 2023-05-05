import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useRenameTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError, handleError } = useTranslateError()

  const mutation = api.template.update.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.list.getData({ isTrash: false })

      utils.template.list.setData({ isTrash: false }, (old = []) =>
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
      if (err.data?.zodError) {
        const errorMes = JSON.parse(err.message)[0].message
        enqueueSnackbar(t('rename_failed'), {
          variant: 'error',
          description: handleError(errorMes),
        })

        return
      }

      showError(err, t('rename_failed'))
      utils.template.list.setData({ isTrash: false }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useRenameTemplate }
