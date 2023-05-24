import { Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonNodeType } from '../../types'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonProvider } from './context'

const KpiSpeechBallonNodeInner: React.FC<NodeProps<SpeechBallonNodeType>> = (data) => {
  const contextValue = useMemo(() => data, [data])

  return (
    <SpeechBallonProvider value={contextValue}>
      <Stack spacing={0.5}>
        <OptionShape />
      </Stack>
    </SpeechBallonProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(KpiSpeechBallonNodeInner)
