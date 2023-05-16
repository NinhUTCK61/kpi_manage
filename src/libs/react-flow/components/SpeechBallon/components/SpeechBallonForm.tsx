import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { InputSpeechBalloon } from './InputSpeechBalloon'

type SpeechBallonFormProps = {
  text: string
}

export const SpeechBallonForm: React.FC = () => {
  const { control } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: '',
    },
  })
  return (
    <Stack component="form" spacing={0.5}>
      <InputSpeechBalloon control={control} name="text" required />
      <input type="submit" hidden />
    </Stack>
  )
}
