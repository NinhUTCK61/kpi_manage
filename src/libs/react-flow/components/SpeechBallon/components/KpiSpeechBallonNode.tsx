import { Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonNodeType } from '../../../types'
import { SpeechBallonProvider } from '../hooks/useContextSpeechBallon'
import { OptionShape } from './OptionShape'

const KpiSpeechBallonNodeInner: React.FC<NodeProps<SpeechBallonNodeType>> = (data) => {
  const dataProvider = useMemo(() => data, [data])

  return (
    <SpeechBallonProvider value={dataProvider}>
      <Stack spacing={0.5}>
        <OptionShape />
      </Stack>
    </SpeechBallonProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(
  KpiSpeechBallonNodeInner,
) as typeof KpiSpeechBallonNodeInner
