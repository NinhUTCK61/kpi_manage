import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, styled } from '@mui/material'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import ShapeType1Icon from 'public/assets/svgs/shape_1.svg'
import ShapeType2Icon from 'public/assets/svgs/shape_2.svg'
import ShapeType3Icon from 'public/assets/svgs/shape_3.svg'
import ShapeType4Icon from 'public/assets/svgs/shape_4.svg'

const shapes = [
  { value: '1', icon: ShapeType1Icon },
  { value: '2', icon: ShapeType2Icon },
  { value: '3', icon: ShapeType3Icon },
  { value: '4', icon: ShapeType4Icon },
]

const ChooseShape: React.FC = () => {
  const shape = useRFStore((state) => state.shape)
  const changeShape = useRFStore((state) => state.changeShapeType)

  const handleShapeChange = (event: SelectChangeEvent<unknown>) => {
    changeShape(event.target.value as string)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={shape}
        onChange={handleShapeChange}
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

export { ChooseShape }
