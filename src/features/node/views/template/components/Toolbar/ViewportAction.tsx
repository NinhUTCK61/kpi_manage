import { Stack, styled } from '@mui/material'
import Image from 'next/image'
import AddSpeechIcon from 'public/assets/svgs/add_speech.svg'
import AddSpeechActiveIcon from 'public/assets/svgs/add_speech_active.svg'
import CommentIcon from 'public/assets/svgs/comment_tools.svg'
import CommentActiveIcon from 'public/assets/svgs/comment_tools_active.svg'
import HandIcon from 'public/assets/svgs/hand_tools.svg'
import HandActiveIcon from 'public/assets/svgs/hand_tools_active.svg'
import MoveIcon from 'public/assets/svgs/move_tools.svg'
import MoveActiveIcon from 'public/assets/svgs/move_tools_active.svg'
import { shallow } from 'zustand/shallow'

import { ViewPortAction } from '@/features/node/constant'
import { RFStore, useRFStore } from '@/libs/react-flow'

const actions = [
  {
    key: ViewPortAction.Move,
    activeIcon: MoveActiveIcon,
    inactiveIcon: MoveIcon,
  },
  {
    key: ViewPortAction.Pan,
    activeIcon: HandActiveIcon,
    inactiveIcon: HandIcon,
  },
  {
    key: ViewPortAction.Comment,
    activeIcon: CommentActiveIcon,
    inactiveIcon: CommentIcon,
  },
  {
    key: ViewPortAction.SpeechBallon,
    activeIcon: AddSpeechActiveIcon,
    inactiveIcon: AddSpeechIcon,
  },
]

const selector = (state: RFStore) => ({
  viewportAction: state.viewportAction,
  changeViewportAction: state.changeViewportAction,
})

const ViewportAction: React.FC = () => {
  const { viewportAction, changeViewportAction } = useRFStore(selector, shallow)
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {actions.map((action) => (
        <ImageCursor
          key={action.key}
          alt={action.key}
          src={viewportAction === action.key ? action.activeIcon : action.inactiveIcon}
          onClick={() => changeViewportAction(action.key)}
        />
      ))}
    </Stack>
  )
}

const ImageCursor = styled(Image)({ cursor: 'pointer' })

export { ViewportAction }
