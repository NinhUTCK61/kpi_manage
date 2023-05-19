import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { CreateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { ClickAwayListener, Stack } from '@mui/material'
import { SpeechBallon } from '@prisma/client'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { InputSpeechBalloon } from './InputSpeechBalloon'
import { SpeechBallonProvider } from './KpiSpeechBallon'

type SpeechBallonFormProps = {
  text: string
}

export const SpeechBallonForm: React.FC = () => {
  const { control, getValues, reset } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: '',
    },
  })

  const router = useRouter()

  const { id } = router.query

  const SpeechBallonRef = useContext(SpeechBallonProvider)

  const { project } = useReactFlow()

  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const dataResult = api.speechBallon.create.useMutation({
    onSuccess(data: SpeechBallon) {
      addSpeechBallon(data)
    },
  })
  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const { top, left } = useContext(SpeechBallonProvider)
  console.log(top, left)
  function handleSubmit(e: MouseEvent | TouchEvent) {
    const position = project({
      x: (e as MouseEvent).clientX ?? 0 - left,
      y: (e as MouseEvent).clientY ?? 0 - top,
    })
    console.log(position, left, top, '11111111111111111111111111111111')
    const dataConfig: CreateSpeechBallonInputType = {
      id: nanoid(),
      template_id: id as string,
      shape: 'square',
      node_style: 'null',
      text: getValues().text,
      node_id: 'loFv7C_B2LrO2dpD2hpM5',
      stroke: 'null',
      x: position.x,
      y: position.y - 110,
    }
    dataResult.mutate(dataConfig)
  }
  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleSubmit}>
      <Stack component="form" spacing={0.5} onSubmit={saveForm}>
        <InputSpeechBalloon control={control} name="text" required />
        <input type="submit" hidden />
      </Stack>
    </ClickAwayListener>
  )
}
