import { Stack, styled, Tooltip } from '@mui/material'
import Image from 'next/image'
import AddSpeechIcon from 'public/assets/svgs/viewportAction/add_speech.svg'
import AddSpeechActiveIcon from 'public/assets/svgs/viewportAction/add_speech_active.svg'
import CommentIcon from 'public/assets/svgs/viewportAction/comment_tools.svg'
import CommentActiveIcon from 'public/assets/svgs/viewportAction/comment_tools_active.svg'
import HandIcon from 'public/assets/svgs/viewportAction/hand_tools.svg'
import HandActiveIcon from 'public/assets/svgs/viewportAction/hand_tools_active.svg'
import MoveIcon from 'public/assets/svgs/viewportAction/move_tools.svg'
import MoveActiveIcon from 'public/assets/svgs/viewportAction/move_tools_active.svg'
import { shallow } from 'zustand/shallow'

import { ViewPortAction } from '@/features/node/constant'
import { RFStore, useRFStore } from '@/libs/react-flow'
import { useTranslation } from 'next-i18next'

const selector = (state: RFStore) => ({
  viewportAction: state.viewportAction,
  changeViewportAction: state.changeViewportAction,
})

const ViewportAction: React.FC = () => {
  const { t } = useTranslation('file')
  const { viewportAction, changeViewportAction } = useRFStore(selector, shallow)

  const actions = [
    {
      key: ViewPortAction.Move,
      activeIcon: MoveActiveIcon,
      inactiveIcon: MoveIcon,
      title: t('move'),
    },
    {
      key: ViewPortAction.Pan,
      activeIcon: HandActiveIcon,
      inactiveIcon: HandIcon,
      title: t('hand_tool'),
    },
    {
      key: ViewPortAction.Comment,
      activeIcon: CommentActiveIcon,
      inactiveIcon: CommentIcon,
      title: t('comment'),
    },
    {
      key: ViewPortAction.SpeechBallon,
      activeIcon: AddSpeechActiveIcon,
      inactiveIcon: AddSpeechIcon,
      title: t('speech'),
    },
  ]

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {actions.map((action) => (
        <Tooltip title={action.title} arrow key={action.key} placement="bottom-start">
          <ImageCursor
            alt={action.key}
            src={viewportAction === action.key ? action.activeIcon : action.inactiveIcon}
            onClick={() => changeViewportAction(action.key)}
          />
        </Tooltip>
      ))}
    </Stack>
  )
}

const ImageCursor = styled(Image)({ cursor: 'pointer' })

export { ViewportAction }
