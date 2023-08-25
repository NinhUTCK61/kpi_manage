import { useRFStore } from '@/libs/react-flow'
import { IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import DownIcon from 'public/assets/svgs/arrow_down_select.svg'
import UpIcon from 'public/assets/svgs/arrow_up_select.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const strokes = [
  { value: 2, label: '1px' },
  { value: 3, label: '2px' },
  { value: 4, label: '3px' },
  { value: 5, label: '4px' },
  { value: 6, label: '5px' },
]

export const DEFAULT_STROKE_SIZE = 2

const ChooseStroke: React.FC = () => {
  const { t } = useTranslation('file')

  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'speech_ballon') return

    return nodeFocused
  }, [nodeFocused])

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const [value, setValue] = useState(DEFAULT_STROKE_SIZE)

  const handleChangeValueStoke = (isUp?: boolean) => {
    if (!nodeFocusedMemo) return
    let count = value
    if (isUp && value < 6) {
      count += 1
    }

    if (!isUp && value > 2) {
      count -= 1
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    setValue(count)

    if (nodeStyle.stroke === count) return

    const newNodeStyle = JSON.stringify({ ...nodeStyle, stroke: count })

    updateReactFlowNode(
      {
        node_style: newNodeStyle,
        id: nodeFocusedMemo.data.id,
        is_saved: nodeFocusedMemo.data.is_saved,
      },
      'speech_ballon',
    )
  }

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setValue(DEFAULT_STROKE_SIZE)
      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    setValue(nodeStyle.stroke ? nodeStyle.stroke : DEFAULT_STROKE_SIZE)
  }, [nodeFocusedMemo])

  const isFillSpeechBallon = {
    ...(nodeFocusedMemo?.data.layout === 'FILL' && {
      opacity: 0.3,
      pointerEvents: 'none',
    }),
  }

  return (
    <Tooltip title={t('stroke')} arrow>
      <Stack
        spacing={1.5}
        alignItems="center"
        direction="row"
        mr={1.5}
        sx={{ ...isFillSpeechBallon }}
      >
        <StackBorder direction="row" spacing={1}>
          <Typography variant="body2" width={40}>
            {strokes.find((e) => e.value === value)?.label}
          </Typography>

          <Stack>
            <IconButton sx={{ p: 0 }} onClick={() => handleChangeValueStoke(true)}>
              <Image src={UpIcon} alt="up" style={{ cursor: 'pointer' }} />
            </IconButton>

            <IconButton sx={{ p: 0 }} onClick={() => handleChangeValueStoke()}>
              <Image src={DownIcon} alt="down" style={{ cursor: 'pointer' }} />
            </IconButton>
          </Stack>
        </StackBorder>
      </Stack>
    </Tooltip>
  )
}

const StackBorder = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  borderRadius: 4,
  height: 42,
  alignItems: 'center',
  padding: theme.spacing(0, 1.5),
  background: theme.palette.common.white,
}))

export { ChooseStroke }
