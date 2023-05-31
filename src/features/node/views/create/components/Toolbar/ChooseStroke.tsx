import { useRFStore } from '@/libs/react-flow'
import { IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import DownIcon from 'public/assets/svgs/arrow_down_select.svg'
import UpIcon from 'public/assets/svgs/arrow_up_select.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const strokes = [
  { value: 1, label: '1px' },
  { value: 2, label: '2px' },
  { value: 3, label: '3px' },
  { value: 4, label: '4px' },
  { value: 5, label: '5px' },
]

const DEFAULT_STROKE_SIZE = 1

const ChooseStroke: React.FC = () => {
  const { t } = useTranslation('file')

  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'speech_ballon') return

    return nodeFocused
  }, [nodeFocused])

  const { updateStyle } = useNodeUpdateHandler(nodeFocusedMemo)

  const [value, setValue] = useState<number>(1)

  const handleChangeValueStoke = (isUp?: boolean) => {
    if (!nodeFocusedMemo) return
    let count = value
    if (isUp && value < 5) {
      count += 1
    }

    if (!isUp && value > 1) {
      count -= 1
    }

    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    setValue(count)

    if (nodeStyle.stroke === count) return

    const newNodeStyle = JSON.stringify({ ...nodeStyle, stroke: count })

    updateStyle(newNodeStyle)
  }

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setValue(DEFAULT_STROKE_SIZE)
      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    setValue(nodeStyle.stroke ? nodeStyle.stroke : DEFAULT_STROKE_SIZE)
  }, [nodeFocusedMemo])

  return (
    <Tooltip title={t('stroke')} arrow>
      <Stack spacing={1.5} alignItems="center" direction="row" mr={1.5}>
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
