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
      const prevData = utils.template.list.getData({ isTrash: false, searchName: '' })
      const prevFavData = utils.template.favorite.getData({ searchName: '' })

      utils.template.list.setData({ isTrash: false, searchName: '' }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, name: String(template.name) } : e)),
      )

      utils.template.favorite.setData({ searchName: '' }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, name: String(template.name) } : e)),
      )

      return { prevData, prevFavData }
    },
    onSuccess: () => {
      enqueueSnackbar(t('description_rename_success'), {
        variant: 'success',
      })
    },
    onError: (err, _, ctx) => {
      if (err.data?.zodError) {
        const errorMes = JSON.parse(err.message)[0].message
        enqueueSnackbar(handleError(errorMes), {
          variant: 'error',
        })

        return
      }

      showError(err, t('rename_failed'))
      utils.template.list.setData({ isTrash: false }, ctx?.prevData)
      utils.template.favorite.setData({}, ctx?.prevFavData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
      utils.template.favorite.invalidate()
    },
  })

  const mutationTemplate = api.template.update.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.byId.getData({ id: template.id })
      const prevTemplateData = utils.template.list.getData({ isTrash: false, searchName: '' })
      const prevFavData = utils.template.favorite.getData({ searchName: '' })

      utils.template.byId.setData({ id: template.id }, (old) =>
        old ? { ...old, name: String(template.name) } : old,
      )

      utils.template.list.setData({ isTrash: false, searchName: '' }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, name: String(template.name) } : e)),
      )

      utils.template.favorite.setData({ searchName: '' }, (old = []) =>
        old.map((e) => (e.template_id === template.id ? { ...e, name: String(template.name) } : e)),
      )

      const template_id = String(template.id)

      return { prevData, template_id, prevFavData, prevTemplateData }
    },
    onSuccess: () => {
      enqueueSnackbar(t('description_rename_success'), {
        variant: 'success',
      })
    },
    onError: (err, _, ctx) => {
      ctx?.prevData && utils.template.byId.setData({ id: ctx?.template_id }, ctx?.prevData)
      utils.template.list.setData({ isTrash: false }, ctx?.prevTemplateData)
      utils.template.favorite.setData({}, ctx?.prevFavData)

      if (err.data?.zodError) {
        const errorMes = JSON.parse(err.message)[0].message
        enqueueSnackbar(handleError(errorMes), {
          variant: 'error',
        })

        return
      }

      showError(err, t('rename_failed'))
    },
    onSettled: () => {
      utils.template.list.invalidate()
      utils.template.favorite.invalidate()
    },
  })

  return { mutation, mutationTemplate }
}

export { useRenameTemplate }
