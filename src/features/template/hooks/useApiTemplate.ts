import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'

const useApiTemplate = () => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const { mutate: create } = api.template.createTemplate.useMutation()
  const { mutate: apiDelete } = api.template.deleteTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()

      const prevData = utils.template.getListTemplate.getData()
      utils.template.getListTemplate.setData({}, (old) => {
        return template.is_permanently
          ? (old || []).filter((e) => e.template_id !== template.id)
          : (old || []).map((e) =>
              e.template_id === template.id ? { ...e, deleted_at: new Date() } : e,
            )
      })

      return { prevData }
    },
    onError: (err, variables, ctx) => {
      utils.template.getListTemplate.setData({ isTrash: false }, ctx?.prevData)
    },

    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })
  const { mutate: restore } = api.template.restoreTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()

      const prevData = utils.template.getListTemplate.getData()
      utils.template.getListTemplate.setData({ isTrash: true }, (old) =>
        (old || []).map((e) => (e.template_id === template.id ? { ...e, deleted_at: null } : e)),
      )

      return { prevData }
    },
    onError: (err, variables, ctx) => {
      utils.template.getListTemplate.setData({ isTrash: true }, ctx?.prevData)
    },

    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })
  const { mutate: rename } = api.template.updateTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()

      const prevData = utils.template.getListTemplate.getData()
      utils.template.getListTemplate.setData({ isTrash: false }, (old) =>
        (old || []).map((e) =>
          e.template_id === template.id ? { ...e, name: String(template.name) } : e,
        ),
      )

      return { prevData }
    },
    onError: (err, variables, ctx) => {
      utils.template.getListTemplate.setData({ isTrash: false }, ctx?.prevData)
    },

    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })
  const { mutate: like } = api.template.likeTemplate.useMutation({
    onMutate: async (template) => {
      await utils.template.getListTemplate.cancel()

      const prevData = utils.template.getListTemplate.getData()
      utils.template.getListTemplate.setData({ isTrash: false }, (old) =>
        (old || []).map((e) =>
          e.template_id === template.id ? { ...e, is_favorite: !template.is_favorite } : e,
        ),
      )

      return { prevData }
    },
    onError: (err, variables, ctx) => {
      utils.template.getListTemplate.setData({ isTrash: false }, ctx?.prevData)
    },

    onSettled: () => {
      utils.template.getListTemplate.invalidate()
    },
  })

  const createTemplate = () => {
    create(
      {},
      {
        onSuccess: (data) => {
          router.push(`/template/${data.id}`)
        },
        onError: (err) => {
          showError(err, t('create_failed'))
        },
      },
    )
  }

  const deleteTemplate = (nodeId: string, is_permanently?: boolean, resetAction?: () => void) => {
    apiDelete(
      {
        id: nodeId,
        is_permanently,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('', {
            variant: 'success',
            description: t(
              is_permanently ? 'description_delete_per_success' : 'description_delete_success',
            ) as string,
          })
          resetAction?.()
        },
        onError: (err) => {
          showError(err, t(is_permanently ? 'permanently_delete_failed' : 'delete_failed'))
        },
      },
    )
  }

  const restoreTemplate = (nodeId: string, resetAction: () => void) => {
    restore(
      {
        id: nodeId,
      },
      {
        onSuccess: () => {
          enqueueSnackbar(t('restore_success'), {
            variant: 'success',
            description: t('description_restore_success') as string,
          })
          resetAction()
        },
        onError: (err) => {
          showError(err, t('restore_failed'))
        },
      },
    )
  }

  const likeTemplate = (template_id: string, is_favorite: boolean) => {
    like(
      {
        id: template_id,
        is_favorite: !is_favorite,
      },
      {
        onError: (err) => {
          showError(err, t('like_failed'))
        },
      },
    )
  }

  const renameTemplate = (template_id: string, name: string, resetAction: () => void) => {
    rename(
      {
        id: template_id,
        name: name,
      },
      {
        onSuccess: () => {
          enqueueSnackbar(t('rename_success'), {
            variant: 'success',
            description: t('description_rename_success') as string,
          })
          resetAction()
        },
      },
    )
  }

  return {
    createTemplate,
    deleteTemplate,
    restoreTemplate,
    likeTemplate,
    renameTemplate,
  }
}

export { useApiTemplate }
