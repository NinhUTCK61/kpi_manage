import { ViewPortAction } from '@/features/node/constant'
import { styled } from '@mui/material'
import AddSpeechIcon from 'public/assets/svgs/add_speech.svg'
import CommentIcon from 'public/assets/svgs/comment_tools.svg'
import HandDragIcon from 'public/assets/svgs/hand_drag.svg'
import HandIcon from 'public/assets/svgs/hand_tools.svg'
import MoveIcon from 'public/assets/svgs/move_tools.svg'
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
      cursor: `url(${cursorIcon}) 20 20 ,auto`,
    },
    ...(action === ViewPortAction.Pan && {
      '& .react-flow__pane.dragging': {
        cursor: `url(${HandDragIcon.src}) 12 12 ,auto`,
      },
    }),
  }
})

export { KpiReactFlow }
