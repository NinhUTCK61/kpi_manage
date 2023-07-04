import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'

const useLikeTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.like.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.list.getData({ isTrash: false })

      utils.template.list.setData({ isTrash: false }, (old = []) =>
        old.map((e) =>
          e.template_id === template.id ? { ...e, is_favorite: template.is_favorite } : e,
        ),
      )

      const prevFavData = utils.template.favorite.getData()
      const templateData = prevData?.find((el) => el.template_id === template.id)

      if (templateData) {
        if (template.is_favorite) {
          utils.template.favorite.setData(undefined, (old = []) => [
            ...old,
            { ...templateData, is_favorite: true },
          ])
          return
        }
        utils.template.favorite.setData(undefined, (old = []) =>
          old.filter((el) => el.template_id !== template.id),
        )
      }

      return { prevData, prevFavData }
    },
    onError: (err, _, ctx) => {
      showError(err, t('like_failed'))
      utils.template.list.setData({ isTrash: false }, ctx?.prevData)
      utils.template.favorite.setData(undefined, ctx?.prevFavData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
      utils.template.favorite.invalidate()
    },
  })

  const mutationTemplate = api.template.like.useMutation({
    onMutate: async (template) => {
      await utils.template.list.cancel()
      const prevData = utils.template.byId.getData({ id: template.id })

      utils.template.byId.setData({ id: template.id }, (old) =>
        old ? { ...old, is_favorite: template.is_favorite } : old,
      )

      const template_id = String(template.id)

      return { prevData, template_id }
    },
    onError: (err, _, ctx) => {
      showError(err, t('like_failed'))
      ctx?.prevData && utils.template.byId.setData({ id: ctx?.template_id }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
      utils.template.favorite.invalidate()
    },
  })

  return { mutation, mutationTemplate }
}

export { useLikeTemplate }
