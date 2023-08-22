import { Box, Typography, styled } from '@mui/material'

const SpeechBallonContainer = styled(Box)({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
})

const TextSpeechBallon = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-line',
  wordWrap: 'break-word',
  color: 'inherit',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '22px',
  padding: theme.spacing(1, 1.5),
}))

export { SpeechBallonContainer, TextSpeechBallon }
