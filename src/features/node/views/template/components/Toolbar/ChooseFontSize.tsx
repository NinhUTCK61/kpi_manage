import { useRFStore } from '@/libs/react-flow'
import { MenuItem } from '@/libs/shared/components'
import { InputBase, Select as MuiSelect, SelectChangeEvent, styled } from '@mui/material'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down_select.svg'

const fontSizes = [
  {
    label: '12px',
    value: '12',
  },
  {
    label: '14px',
    value: '14',
  },
  {
    label: '16px',
    value: '16',
  },
  {
    label: '18px',
    value: '18',
  },
]

const ChooseFontSize: React.FC = () => {
  const value = useRFStore((state) => state.fontSize)
  const handleChange = useRFStore((state) => state.changeFontSize)

  return (
    <Select
      value={value}
      onChange={(event: SelectChangeEvent<unknown>) => handleChange(event.target.value as string)}
      input={<CustomInput />}
      IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
    >
      {fontSizes.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
  background: theme.palette.common.white,
  '& .MuiSelect-icon': {
    top: 'auto',
  },
}))

const CustomInput = styled(InputBase)(({ theme }) => ({
  '& fieldset': {
    border: 'none',
  },
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.base.black,
  paddingLeft: 12,
  border: `1px solid ${theme.palette.greyScale[400]}`,
  borderRadius: 4,
  gap: 8,
  height: 34,
}))

export { ChooseFontSize }
