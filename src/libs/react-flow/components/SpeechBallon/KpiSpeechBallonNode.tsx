import React, { useMemo } from 'react'
import { NodeProps } from 'reactflow'
import { SpeechBallonNodeType } from '../../types'
import { OptionShape } from './components/OptionShape'
import { SpeechBallonProvider } from './context'

type KpiSpeechBallonNodeProps = NodeProps<SpeechBallonNodeType>

const KpiSpeechBallonNodeInner: React.FC<KpiSpeechBallonNodeProps> = ({ data, xPos, yPos }) => {
  const contextValue = useMemo(() => ({ data, xPos, yPos }), [data, xPos, yPos])

  return (
    <SpeechBallonProvider value={contextValue}>
      <OptionShape />
    </SpeechBallonProvider>
  )
}

export const KpiSpeechBallonNode = React.memo(KpiSpeechBallonNodeInner)
