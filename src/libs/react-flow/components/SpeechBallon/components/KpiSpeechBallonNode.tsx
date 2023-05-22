import { Stack } from '@mui/material'
import React, { createContext, useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonNodeType } from '../../../types'
import { OptionShape } from './OptionShape'

type SpeechBallonProviderType = {
  data: SpeechBallonNodeType | null
}

export const SpeechBallonProvider = createContext<SpeechBallonProviderType | null>(null)

const KpiSpeechBallonNodeInner: React.FC<NodeProps<SpeechBallonNodeType>> = (data) => {
  const dataProvider = useMemo(() => data, [data])

  return (
    <SpeechBallonProvider.Provider value={dataProvider}>
      <Stack spacing={0.5}>
        <OptionShape />
      </Stack>
    </SpeechBallonProvider.Provider>
  )
}

export const KpiSpeechBallonNode = React.memo(
  KpiSpeechBallonNodeInner,
) as typeof KpiSpeechBallonNodeInner
