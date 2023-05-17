import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { Stack } from '@mui/material'
import { NodeProps } from 'reactflow'
import { OptionShape } from './components/OptionShape'

function KpiSpeechBallon(props: NodeProps<SpeechBallonNodeType>) {
  const { data, isConnectable, selected } = props

  console.log('speech:', data.id)
  return (
    <Stack spacing={0.5}>
      <OptionShape />
    </Stack>
  )
}

export { KpiSpeechBallon }
