import { ViewPortAction } from '@/features/node/constant'
import { styled } from '@mui/material'
import CommentIcon from 'public/assets/svgs/cursor/comment.svg'
import HandIcon from 'public/assets/svgs/cursor/hand.svg'
import HandDragIcon from 'public/assets/svgs/cursor/hand_drag.svg'
import MoveIcon from 'public/assets/svgs/cursor/move.svg'
import AddSpeechIcon from 'public/assets/svgs/cursor/speech.svg'
import { ReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

const KpiReactFlow = styled(ReactFlow)<{ action: ViewPortAction }>(({ action }) => {
  let cursorIcon = ''
  switch (action) {
    case ViewPortAction.Move:
      cursorIcon = MoveIcon.src
      break
    case ViewPortAction.Pan:
      cursorIcon = HandIcon.src
      break
    case ViewPortAction.Comment:
      cursorIcon = CommentIcon.src
      break
    case ViewPortAction.SpeechBallon:
      cursorIcon = AddSpeechIcon.src
      break
    default:
      cursorIcon = MoveIcon.src
      break
  }

  return {
    '& .react-flow__pane': {
      cursor: `url(${cursorIcon}),auto`,
    },
    ...(action === ViewPortAction.Pan && {
      '& .react-flow__pane.dragging': {
        cursor: `url(${HandDragIcon.src}),auto`,
      },
    }),
    ...(action !== ViewPortAction.Move && {
      '& .react-flow__node': {
        cursor: 'unset',
      },
    }),
  }
})

export { KpiReactFlow }
