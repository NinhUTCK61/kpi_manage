import { Stack, Typography, styled } from '@mui/material'

const SpeechBallonContainer = styled(Stack)({
  overflow: 'hidden',
  height: '100%',
  minHeight: 36,
  flexDirection: 'column',
  justifyContent: 'center',
})

const TextSpeechBallon = styled(Typography)({
  whiteSpace: 'pre-line',
  wordWrap: 'break-word',
  color: 'inherit',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '22px',
  width: '100%',
})

export { SpeechBallonContainer, TextSpeechBallon }
