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

      return { prevData }
    },
    onError: (err, _, ctx) => {
      showError(err, t('like_failed'))
      utils.template.list.setData({ isTrash: false }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useLikeTemplate }
