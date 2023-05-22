import { api } from '@/libs/api'
import { customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { CreateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { Stack, Typography } from '@mui/material'
import { SpeechBallon } from '@prisma/client'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { InputSpeechBalloon } from './InputSpeechBalloon'
import { SpeechBallonProvider } from './KpiSpeechBallonNode'

type SpeechBallonFormProps = {
  text: string
}

const storeSelector = (state: RFStore) => ({
  handleCloseSpeechBallon: state.handleCloseSpeechBallon,
  position: state.position,
  containerRef: state.containerRef,
})

export const SpeechBallonForm: React.FC = () => {
  const { handleCloseSpeechBallon, position, containerRef } = useRFStore(storeSelector, shallow)

  const dataProvider = useContext(SpeechBallonProvider)

  const { control, getValues, reset } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: '',
    },
  })

  const router = useRouter()

  const { id } = router.query

  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const dataResult = api.speechBallon.create.useMutation({
    onSuccess(data: SpeechBallon) {
      addSpeechBallon(data)
    },
  })

  const { top, left } = containerRef?.current?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
  }

  const { project } = useReactFlow()
  const positionConvert = project({
    x: position?.x as number,
    y: (position?.y as number) - top,
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (getValues().text === '' || getValues().text === null) {
      return
    }
    const dataConfig: CreateSpeechBallonInputType = {
      id: nanoid(),
      template_id: id as string,
      shape: 'square',
      node_style: 'null',
      text: getValues().text,
      node_id: 'loFv7C_B2LrO2dpD2hpM5',
      stroke: 'null',
      x: positionConvert?.x,
      y: positionConvert?.y,
    }
    if (getValues().text !== '') {
      dataResult.mutate(dataConfig)
      handleCloseSpeechBallon()
      reset({ text: '' })
    }
  }
  return (
    <Stack component="form" spacing={0.5} onSubmit={handleSubmit}>
      {!dataProvider?.data ? (
        <InputSpeechBalloon control={control} name="text" />
      ) : (
        <Typography variant="body2" color={customPrimary[0o0]} minWidth="210px" minHeight="26px">
          {dataProvider?.data.text}
        </Typography>
      )}
      <input type="submit" hidden />
    </Stack>
  )
}
