import { ViewPortAction } from '@/features/node/constant'
import { styled } from '@mui/material'
import CommentIcon from 'public/assets/svgs/cursor/comment.svg'
import HandIcon from 'public/assets/svgs/cursor/hand.svg'
import HandDragIcon from 'public/assets/svgs/cursor/hand_drag.svg'
import MoveIcon from 'public/assets/svgs/cursor/move.svg'
import AddSpeechIcon from 'public/assets/svgs/cursor/speech.svg'
import { ReactFlow } from 'reactflow'
const DEFAUlT_CURSOR = '0 4'
const SPEECH_CURSOR = '0 8'
const cursorIconMap = {
  [ViewPortAction.Move]: { cursor: MoveIcon.src, custom: DEFAUlT_CURSOR },
  [ViewPortAction.Pan]: { cursor: HandIcon.src, custom: DEFAUlT_CURSOR },
  [ViewPortAction.Comment]: { cursor: CommentIcon.src, custom: DEFAUlT_CURSOR },
  [ViewPortAction.SpeechBallon]: { cursor: AddSpeechIcon.src, custom: SPEECH_CURSOR },
}
const KpiReactFlow = styled(ReactFlow)<{ action: ViewPortAction }>(({ action }) => {
  const cursorIcon = cursorIconMap[action]
  return {
    '& .react-flow__pane': {
      cursor: `url(${cursorIcon.cursor}) ${cursorIcon.custom},auto`,
    },
    ...(action === ViewPortAction.Pan && {
      '& .react-flow__pane.dragging': {
        cursor: `url(${HandDragIcon.src}) 0 8 ,auto`,
      },
    }),
    ...(action === ViewPortAction.Pan && {
      '&& .react-flow__node': {
        cursor: 'unset',
        pointerEvents: 'none !important',
      },
    }),
    ...(action !== ViewPortAction.Move && {
      '&& .react-flow__node-kpi': {
        cursor: 'unset',
        pointerEvents: 'none !important',
      },
    }),
  }
})
export { KpiReactFlow }
