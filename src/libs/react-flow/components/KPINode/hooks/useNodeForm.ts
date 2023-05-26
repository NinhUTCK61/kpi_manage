import { useTranslateError } from '@/libs/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { NodeFormSchema } from '@/libs/schema/node'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

export const useNodeForm = (data: KPINodeType) => {
  const forms = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
    },
    resolver: zodResolver(NodeFormSchema),
    mode: 'onChange',
  })

  const { setFocus } = forms
  const { handleError } = useTranslateError()
  const [error, setError] = useState('')

  useEffect(() => {
    const errors = forms.formState.errors
    if (isEmpty(errors)) {
      setError('')
      return
    }
    if (errors.input_title?.message) {
      setError(handleError(errors.input_title.message as string))
    }
  }, [forms.formState.errors, handleError])

  useEffect(() => {
    setTimeout(() => {
      if (!data.input_title) {
        setFocus('input_title')
      }
    }, 0)
  }, [data.input_title, setFocus])

  //TODO: data node form not change after paste , need to reset by effect
  useEffect(() => {
    const formInputTitle = forms.getValues('input_title')
    const formInputValue = forms.getValues('input_value')
    const formUnit = forms.getValues('unit')
    if (
      data.input_title !== formInputTitle ||
      data.input_value !== formInputValue ||
      data.unit !== formUnit
    )
      forms.reset({
        input_title: data.input_title || '',
        input_value: data.input_value || '',
        unit: data.unit || '',
      })
  }, [data.input_title, data.input_value, data.unit, forms])

  return { ...forms, error }
}
