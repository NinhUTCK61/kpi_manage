import { useTranslateError } from '@/libs/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useKPINodeContext } from '../context'
import { useErrorState } from './useErrorState'

export type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

export const useNodeForm = (data: KPINodeType) => {
  const { form } = useKPINodeContext()
  const { setFocus } = form
  const { handleError } = useTranslateError()
  const [error, setError] = useState('')

  const { error: errorState, message } = useErrorState(true, form.watch('input_value') as string)

  useEffect(() => {
    if (errorState) {
      setError(message)
      return
    }

    const errors = form.formState.errors
    if (isEmpty(errors)) {
      setError('')
      return
    }
    if (errors.input_title?.message) {
      setError(handleError(errors.input_title.message as string))
    }

    if (errors.input_value?.message) {
      setError(handleError(errors.input_value.message as string))
    }
  }, [errorState, form.formState, handleError, message])

  useEffect(() => {
    if (!data.input_title && !form.getValues('input_title')) {
      setTimeout(() => {
        setFocus('input_title')
      }, 0)
    }
  })

  return { ...form, error }
}
