import { KPINodeType } from '@/libs/react-flow/types'
import { SpeechBallon } from '@prisma/client'

type TypeDataPropContext = SpeechBallon | KPINodeType

export function isDataKPISpeechBallon(node: TypeDataPropContext): node is SpeechBallon {
  return (node as SpeechBallon)?.text !== undefined
}
