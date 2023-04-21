import { api } from '@/libs/api'
import { useTranslateError } from '@/libs/hooks'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const useCreateTemplate = () => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const utils = api.useContext()
  const { showError } = useTranslateError()

  const mutation = api.template.create.useMutation({
    onSuccess: (data) => {
      router.push('/file/' + data.id)
    },
    onError: (err) => {
      showError(err, t('create_failed'))
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })

  return mutation
}

export { useCreateTemplate }
