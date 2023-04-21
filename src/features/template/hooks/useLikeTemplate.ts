import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'

const useLikeTemplate = () => {
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.likeTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()
      const prevData = utils.template.getListTemplate.getData({ isTrash: false })

      utils.template.getListTemplate.setData({ isTrash: false }, (old = []) =>
        old.map((e) =>
          e.template_id === template.id ? { ...e, is_favorite: template.is_favorite } : e,
        ),
      )

      return { prevData }
    },
    onError: (err, _, ctx) => {
      showError(err, t('like_failed'))
      utils.template.getListTemplate.setData({ isTrash: false }, ctx?.prevData)
    },
    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })

  return mutation
}

export { useLikeTemplate }
