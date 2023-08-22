import { Box, Typography, styled } from '@mui/material'

const SpeechBallonContainer = styled(Box)({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
})

const TextSpeechBallon = styled(Typography)({
  whiteSpace: 'pre-line',
  wordWrap: 'break-word',
  color: 'inherit',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '22px',
})

export { SpeechBallonContainer, TextSpeechBallon }
