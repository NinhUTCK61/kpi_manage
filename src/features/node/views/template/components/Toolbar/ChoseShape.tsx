import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import ShapeType1Icon from 'public/assets/svgs/shape_1.svg'
import ShapeType2Icon from 'public/assets/svgs/shape_2.svg'
import ShapeType3Icon from 'public/assets/svgs/shape_3.svg'
import ShapeType4Icon from 'public/assets/svgs/shape_4.svg'
import { shallow } from 'zustand/shallow'

const ChoseShape: React.FC = () => {
  const { t } = useTranslation('file')

  const shape = useRFStore((state) => state.shape, shallow)
  const changeShape = useRFStore((state) => state.changeShape, shallow)

  const shapes = [
    { value: '1', icon: ShapeType1Icon },
    { value: '2', icon: ShapeType2Icon },
    { value: '3', icon: ShapeType3Icon },
    { value: '4', icon: ShapeType4Icon },
  ]

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="body2">{t('shape')}</Typography>

      <Select
        value={shape}
        onChange={(event: SelectChangeEvent<unknown>) => changeShape(event.target.value as string)}
        input={<CustomInput />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
      >
        {shapes.map((item) => (
          <MenuItem key={item.value} value={item.value} sx={{ width: 72 }}>
            <Image alt="shape" src={item.icon} />
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
  width: 72,
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

export { ChoseShape }
