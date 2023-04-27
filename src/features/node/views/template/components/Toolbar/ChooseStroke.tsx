import { useRFStore } from '@/libs/react-flow'
import { IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import DownIcon from 'public/assets/svgs/arrow_down_select.svg'
import UpIcon from 'public/assets/svgs/arrow_up_select.svg'

const ChooseStroke: React.FC = () => {
  const { t } = useTranslation('file')

  const stroke = useRFStore((state) => state.stroke)
  const changeStroke = useRFStore((state) => state.changeStroke)

  const strokes = [
    { value: 1, label: '1px' },
    { value: 2, label: '2px' },
    { value: 3, label: '3px' },
    { value: 4, label: '4px' },
    { value: 5, label: '5px' },
  ]

  const handleChangeValueStoke = (isUp?: boolean) => {
    if (!stroke) return
    const _stroke = stroke
    let value = null
    if (isUp && _stroke < 5) {
      value = _stroke + 1
    }

    if (!isUp && _stroke > 1) {
      value = _stroke - 1
    }
    value && changeStroke(value)
  }

  return (
    <Tooltip title={t('stroke')} arrow>
      <Stack spacing={1.5} alignItems="center" direction="row" mr={1.5}>
        <StackBorder direction="row" spacing={1}>
          <Typography variant="body2" width={40}>
            {strokes.find((e) => e.value === stroke)?.label}
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
