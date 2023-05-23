import { api } from '@/libs/api'
import { customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { CreateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { Stack, Typography } from '@mui/material'
import { SpeechBallon } from '@prisma/client'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { InputSpeechBalloon } from './InputSpeechBalloon'
import { SpeechBallonProvider } from './KpiSpeechBallonNode'
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

  const dataProvider = useContext(SpeechBallonProvider)

  const { control, getValues, reset, setFocus } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: '',
    },
  })

  useEffect(() => {
    setFocus('text')
  }, [setFocus])

  const router = useRouter()

  const { id } = router.query

  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const mutate = api.speechBallon.create.useMutation({
    onSuccess(data: SpeechBallon) {
      addSpeechBallon(data)
    },
  })

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
    mutate.mutate(handleFormatData())
    setActivePosition(null)
    reset({ text: '' })
  }

  // tạm thời fix cứng node_id vì chưa làm chức năng này ạ ;v
  function handleFormatData(node_id = 'loFv7C_B2LrO2dpD2hpM5') {
    const dataConfig: CreateSpeechBallonInputType = {
      id: nanoid(),
      template_id: id as string,
      shape: 'square',
      node_style: 'null',
      text: getValues().text,
      node_id,
      stroke: 'null',
      x: positionConvert?.x - 50,
      y: positionConvert?.y - 50,
    }
    return dataConfig
  }

  return (
    <Stack component="form" spacing={0.5} onSubmit={handleSubmit}>
      {!dataProvider?.data ? (
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
          {dataProvider?.data?.text}
        </Typography>
      )}
      <input type="submit" hidden />
    </Stack>
  )
}
