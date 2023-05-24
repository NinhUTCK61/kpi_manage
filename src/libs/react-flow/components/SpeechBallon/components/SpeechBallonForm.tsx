import { customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { CreateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { Stack, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { useSpeechBallonContext } from '../context'
import { useSpeechBallonCreateMutation } from '../hooks'
import { InputSpeechBalloon } from './InputSpeechBalloon'

type SpeechBallonFormProps = {
  text: string
}

const storeSelector = (state: RFStore) => ({
  activePosition: state.activePosition,
  container: state.container,
  setActivePosition: state.setActivePosition,
  changeViewportAction: state.changeViewportAction,
})

export const SpeechBallonForm: React.FC = () => {
  const { activePosition, container, setActivePosition } = useRFStore(storeSelector, shallow)
  const { data } = useSpeechBallonContext()

  const { control, getValues, reset } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: '',
    },
  })

  const router = useRouter()
  const { id } = router.query

  const mutate = useSpeechBallonCreateMutation()

  const { top } = container?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
  }

  const { project } = useReactFlow()
  const positionConvert = project({
    x: activePosition?.x as number,
    y: (activePosition?.y as number) - top,
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!getValues().text) {
      return
    }

    const data: CreateSpeechBallonInputType = {
      id: nanoid(),
      template_id: id as string,
      shape: 'square',
      node_style: null,
      text: getValues().text,
      node_id: null,
      stroke: '1px',
      x: positionConvert?.x - 50,
      y: positionConvert?.y - 50,
    }

    mutate.mutate(data)
    setActivePosition(null)
    reset({ text: '' })
  }

  return (
    <Stack component="form" spacing={0.5} autoFocus onSubmit={handleSubmit}>
      {!data ? (
        <InputSpeechBalloon control={control} name="text" autoComplete="off" autoFocus />
      ) : (
        <Typography
          variant="body2"
          color={customPrimary[0o0]}
          sx={{
            minWidth: 210,
            minHeight: 26,
            width: '100%',
            height: '100%',
            cursor: 'grab',
            pointerEvents: 'grabbing',
          }}
        >
          {data.text}
        </Typography>
      )}
      <input type="submit" hidden />
    </Stack>
  )
}
