import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, styled } from '@mui/material'
import { DropDownIcon } from './ChoseShape'

type ChoseFontSizeTypes = {
  value: string
  handleChange(value: string): void
}

const ChoseFontSize: React.FC<ChoseFontSizeTypes> = ({ value, handleChange }) => {
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
      label: '16px',
      value: '16',
    },
  ]

  return (
    <Select
      value={value}
      onChange={(event: SelectChangeEvent<unknown>) => handleChange(event.target.value as string)}
      input={<CustomInput />}
      IconComponent={DropDownIcon}
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

const CustomInput = styled(InputStyled)({
  '& fieldset': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    fontSize: 15,
    lineHeight: '22px',
  },
})

export { ChoseFontSize }
