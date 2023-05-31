import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, Typography, styled } from '@mui/material'
import { LayoutType } from '@prisma/client'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const shapes = [
  { value: '1', type: 'FILL', label: 'Fill' },
  { value: '2', type: 'STROKE', label: 'Stroke' },
]

const ChooseTypeLayout: React.FC = () => {
  const [type, setType] = useState<LayoutType>('FILL')

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocuseMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const { updateStroke } = useNodeUpdateHandler(nodeFocuseMemo)

  const handleChange = (value: LayoutType) => {
    setType(value)

    if (!nodeFocuseMemo) return

    updateStroke(value)
  }

  useEffect(() => {
    if (!nodeFocuseMemo) return
    const typeStroke = nodeFocuseMemo.data.layout
    typeStroke ? setType(typeStroke) : setType('FILL')
  }, [nodeFocuseMemo])

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={type}
        onChange={(event: SelectChangeEvent<unknown>) =>
          handleChange(event.target.value as LayoutType)
        }
        input={<CustomInput />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
        defaultValue={type}
      >
        {shapes.map((item) => (
          <MenuItem
            key={item.value}
            value={item.type}
            sx={{ padding: '8px 12px' }}
            autoFocus={item.type === 'FILL'}
          >
            <Typography variant="body2" color="base.black">
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
  height: 32,
  minWidth: 73,
  background: theme.palette.common.white,
  '& .MuiSelect-icon': {
    top: 'auto',
  },
}))

const CustomInput = styled(InputStyled)({
  '& fieldset': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    display: 'flex',
  },
})

export { ChooseTypeLayout }
